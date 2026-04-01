module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Documents/Hospital Dashboard/hospital-dashboard/app/api/ocr/carton/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/@google/generative-ai/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/server.js [app-route] (ecmascript)");
;
;
async function POST(req) {
    try {
        const { image } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY?.replace(/['"]/g, '').trim();
        if (!apiKey) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "GEMINI_API_KEY is not configured in .env"
            }, {
                status: 500
            });
        }
        const genAI = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](apiKey);
        // Convert base64 to parts
        const base64Data = image.split(",")[1] || image;
        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: "image/png"
            }
        };
        const prompt = `
            Extract pharmaceutical batch information from this medicine product box/carton image.
            Return a strictly valid JSON object.
            
            Look for these specific fields:
            1. Batch Number (often prefixed with B, B.N, BN, Lot, etc.)
            2. Manufacturing Date (MFG, MFD, M, etc.)
            3. Expiry Date (EXP, E, ED, etc.)
            4. MRP or Retail Price in PKR (Maximum Retail Price).
            
            The JSON should follow this structure:
            {
                "batchNo": "Extract string",
                "mfgDate": "YYYY-MM-DD (convert format if needed, use 1st day if only month/year)",
                "expiryDate": "YYYY-MM-DD (convert format if needed, use 1st day if only month/year)",
                "mrp": 0.00 (number only),
                "productName": "Extract product name if visible"
            }
            
            Rules:
            - If a date is MM/YY or MM/YYYY, convert to YYYY-MM-01.
            - Extract MRP as a decimal number.
            - If any field is not found, use "" for strings and null for mrp.
            - Return ONLY the JSON object.
        `;
        const modelNames = [
            "gemini-2.0-flash",
            "gemini-flash-latest",
            "gemini-1.5-flash"
        ];
        let lastError = null;
        for (const name of modelNames){
            try {
                const model = genAI.getGenerativeModel({
                    model: name
                });
                const result = await model.generateContent([
                    prompt,
                    imagePart
                ]);
                const response = await result.response;
                const text = response.text();
                const jsonMatch = text.match(/\{[\s\S]*\}/);
                const jsonStr = jsonMatch ? jsonMatch[0] : text;
                const data = JSON.parse(jsonStr);
                return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    data
                });
            } catch (e) {
                lastError = e;
            }
        }
        throw lastError;
    } catch (error) {
        console.error("Gemini Carton OCR Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "AI Model Error",
            details: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d7c16521._.js.map