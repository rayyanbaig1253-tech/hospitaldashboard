import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { fuzzyMatchProduct, MatchableProduct } from "@/lib/fuzzyMatcher";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { image } = await req.json();

        // 1. Call the OCR Extraction API (Internal fetch or use common logic)
        // For simplicity, we'll fetch our own endpoint or abstract the logic
        // But since we are backend, let's just use the Gemini logic here or call the other route
        // Actually, calling the other route is safer for code reuse
        const host = req.headers.get('host');
        const protocol = host?.includes('localhost') ? 'http' : 'https';
        const ocrResponse = await fetch(`${protocol}://${host}/api/ocr/invoice`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image })
        });

        if (!ocrResponse.ok) {
            const errorData = await ocrResponse.json();
            return NextResponse.json({ 
                error: errorData.error || "OCR extraction failed", 
                details: errorData.details,
                help: errorData.help
            }, { status: ocrResponse.status });
        }

        const ocrResult = await ocrResponse.json();
        const extractedData = ocrResult.data;

        // 2. Detect/Create Supplier
        let supplier = await prisma.supplier.findFirst({
            where: { name: { contains: extractedData.supplierName } } // Simple match, can be fuzzy later
        });

        if (!supplier && extractedData.supplierName) {
            supplier = await prisma.supplier.create({
                data: {
                    name: extractedData.supplierName,
                    phone: "",
                    email: "",
                    address: ""
                }
            });
        }

        const supplierId = supplier?.id;

        // 3. Match Products
        const allProducts = await prisma.product.findMany({
            include: { aliases: true }
        });

        const matchableProducts: MatchableProduct[] = allProducts.map(p => ({
            id: p.id,
            name: p.name,
            item_code: p.item_code,
            aliases: p.aliases.map(a => a.alias)
        }));

        if (!extractedData || !extractedData.items) {
            return NextResponse.json({
                success: true,
                data: {
                    supplierId,
                    supplierName: supplier?.name,
                    invoiceNo: extractedData?.invoiceNo || "",
                    total: extractedData?.total || 0,
                    items: []
                }
            });
        }

        const processedItems = await Promise.all(extractedData.items.map(async (item: any) => {
            const match = fuzzyMatchProduct(item.name, matchableProducts);
            let alert = null;
            let existingLink = null;

            if (match && supplierId) {
                // Check for existing product-supplier link and discount validation
                existingLink = await prisma.productSupplier.findUnique({
                    where: {
                        productId_supplierId: {
                        productId: Number(match.productId),
                        supplierId: Number(supplierId)
                        }
                    }
                });

                if (existingLink) {
                    if (item.discountPercent !== undefined && existingLink.discount !== item.discountPercent) {
                        alert = `Expected discount for this supplier is ${existingLink.discount}%, but received ${item.discountPercent}%`;
                    }
                }
            }

            return {
                ...item,
                matchedProductId: match?.productId || null,
                matchScore: match?.score || null,
                matchType: match?.type || null,
                matchName: match?.matchedOn || null,
                alert,
                supplierId: supplierId,
                existingLink: !!existingLink
            };
        }));

        return NextResponse.json({
            success: true,
            data: {
                supplierId,
                supplierName: supplier?.name,
                invoiceNo: extractedData.invoiceNo,
                total: extractedData.total,
                items: processedItems
            }
        });

    } catch (error: any) {
        console.error("Process Invoice Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
