import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { image } = await req.json();

        const apiKey = process.env.GEMINI_API_KEY?.replace(/['"]/g, '').trim();
        if (!apiKey) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not configured in .env" },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        // Convert base64 to parts
        const base64Data = image.split(",")[1] || image;
        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: "image/png",
            },
        };

        const prompt = `
            Extract all relevant information from this invoice image and return it as a strictly valid JSON object.
            This is a pharmaceutical/medical invoice from Pakistan. Focus on 100% accuracy for financial columns.
            
            The JSON should follow this structure:
            {
                "supplierName": "Name of the supplier/company",
                "invoiceNo": "Invoice number",
                "date": "Invoice date in YYYY-MM-DD format",
                "total": 0.00,
                "items": [
                    {
                        "name": "Standardized Product Name (e.g. Panadol 500mg)",
                        "brand": "Manufacturer/Brand (e.g. GSK)",
                        "category": "Medicine Category (e.g. Pain Relief, Antibiotics, Diabetes, Cardiology, Vitamins, Others)",
                        "batch": "Batch number",
                        "qty": 0,
                        "bonus": 0,
                        "rate": 0.00,
                        "discountPercent": 0.00,
                        "taxPercent": 0.00,
                        "net": 0.00,
                        "expiry": "YYYY-MM-DD",
                        "mfgDate": "YYYY-MM-DD"
                    }
                ]
            }
            Important extraction rules:
            1. Rate/Price: Look for "Rate", "Price", ou "Trade Price". This is the price per unit.
            2. Discount: Look for "Disc%", "Discount", or "Disc". Extract as a percentage (e.g. 10.5).
            3. Tax: Look for "Sales Tax", "ST%", or "Tax". Extract as a percentage.
            4. Net: This is the final value for the line. Math check: (qty * rate) - discount + tax.
            5. Dates: Extract both Expiry (EXP) and Manufacturing (MFG/MFD) dates if present.
            6. If any field is missing, use 0 for numbers and "" for strings.
            6. Return ONLY the JSON object.
        `;

        // Expanded model list based on verified availability for this API key
        const modelNames = [
            "gemini-2.0-flash", 
            "gemini-flash-latest", 
            "gemini-2.5-flash", 
            "gemini-2.0-flash-lite",
            "gemini-3-flash-preview"
        ];
        let lastError: any = null;

        for (const name of modelNames) {
            try {
                console.log(`Attempting Gemini model: ${name}`);
                const model = genAI.getGenerativeModel({ model: name });
                const result = await model.generateContent([prompt, imagePart]);
                const response = await result.response;
                const text = response.text();

                const jsonMatch = text.match(/\{[\s\S]*\}/);
                const jsonStr = jsonMatch ? jsonMatch[0] : text;
                const data = JSON.parse(jsonStr);

                console.log(`✅ Success with model: ${name}`);
                return NextResponse.json({ success: true, data, usedModel: name });
            } catch (e: any) {
                console.warn(`Model ${name} failed:`, e.message);
                lastError = e;
                
                // If we hit a rate limit, wait a tiny bit before trying the next model
                if (e.message?.includes('429')) {
                    console.log("Rate limit hit, waiting 2s before next model fallback...");
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }
            }
        }

        const isRateLimit = lastError?.message?.includes('429');
        return NextResponse.json(
            {
                error: isRateLimit ? "AI Rate Limit Reached" : "AI Model Error",
                details: lastError?.message || "Unknown error",
                help: isRateLimit 
                    ? "Too many requests. Please wait 30 seconds and try again." 
                    : "None of the available models could process the image. Please verify your invoice image is clear."
            },
            { status: isRateLimit ? 429 : 500 }
        );

    } catch (error: any) {
        console.error("Gemini OCR Critical Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message },
            { status: 500 }
        );
    }
}
