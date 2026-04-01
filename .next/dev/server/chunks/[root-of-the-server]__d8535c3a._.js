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
"[project]/Documents/Hospital Dashboard/hospital-dashboard/app/api/ocr/process-invoice/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/@prisma/client)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/server.js [app-route] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/lib/fuzzyMatcher'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
async function POST(req) {
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
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image
            })
        });
        if (!ocrResponse.ok) {
            const errorData = await ocrResponse.json();
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "OCR extraction failed",
                details: errorData
            }, {
                status: 500
            });
        }
        const ocrResult = await ocrResponse.json();
        const extractedData = ocrResult.data;
        // 2. Detect/Create Supplier
        let supplier = await prisma.supplier.findFirst({
            where: {
                name: {
                    contains: extractedData.supplierName
                }
            } // Simple match, can be fuzzy later
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
            include: {
                aliases: true
            }
        });
        const matchableProducts = allProducts.map((p)=>({
                id: p.id,
                name: p.name,
                item_code: p.item_code,
                aliases: p.aliases.map((a)=>a.alias)
            }));
        const processedItems = await Promise.all(extractedData.items.map(async (item)=>{
            const match = fuzzyMatchProduct(item.name, matchableProducts);
            let alert = null;
            let existingLink = null;
            if (match && supplierId) {
                // Check for existing product-supplier link and discount validation
                existingLink = await prisma.productSupplier.findUnique({
                    where: {
                        productId_supplierId: {
                            productId: match.productId,
                            supplierId: supplierId
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            supplierId,
            supplierName: supplier?.name,
            invoiceNo: extractedData.invoiceNo,
            total: extractedData.total,
            items: processedItems
        });
    } catch (error) {
        console.error("Process Invoice Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d8535c3a._.js.map