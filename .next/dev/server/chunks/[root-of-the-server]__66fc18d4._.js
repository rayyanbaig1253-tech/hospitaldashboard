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
"[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/fuzzyMatcher.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fuzzyMatchProduct",
    ()=>fuzzyMatchProduct
]);
function fuzzyMatchProduct(inputName, products) {
    if (!inputName || !products || products.length === 0) return null;
    const cleanInput = inputName.toLowerCase().replace(/[^a-z0-9]/g, '');
    let bestMatch = null;
    let highestScore = 0;
    let bestMatchedOn = "";
    let bestMatchType = "";
    const checkMatch = (str, product, matchType)=>{
        if (!str) return;
        const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
        // 1. Calculate similarity score (0-100)
        let score = calculateSimilarity(cleanInput, cleanStr);
        // 2. Substring/Prefix Boost (e.g. "Ezium" in "Ezium 20mg")
        if (cleanInput.length > 2 && cleanStr.length > 2) {
            // Case 1: Database name is inside Invoice name (e.g. "Ezium" in "Ezium 20mg")
            // Case 2: Invoice name is inside Database name (e.g. "Ezium 20mg" in "Ezium Tablet 20mg")
            if (cleanStr.includes(cleanInput) || cleanInput.includes(cleanStr)) {
                const subScore = Math.min(cleanInput.length, cleanStr.length) / Math.max(cleanInput.length, cleanStr.length) * 100;
                // Boost for significant substring overlap (at least 60% of short string)
                score = Math.max(score, subScore > 40 ? 85 : 0);
            }
        }
        if (score > highestScore) {
            highestScore = score;
            bestMatch = product;
            bestMatchedOn = str;
            bestMatchType = matchType;
        }
    };
    for (const prod of products){
        // Direct match on Name
        checkMatch(prod.name, prod, "Name");
        // Match on Aliases
        if (prod.aliases && Array.isArray(prod.aliases)) {
            for (const alias of prod.aliases){
                checkMatch(alias, prod, "Alias");
            }
        }
    }
    // Adjust threshold as necessary, e.g., > 60% confidence
    if (highestScore > 60 && bestMatch) {
        return {
            productId: bestMatch.id,
            score: highestScore,
            type: bestMatchType,
            matchedOn: bestMatchedOn
        };
    }
    return null;
}
// Simple Jaccard/Dice-like similarity coefficient using bigrams
function calculateSimilarity(str1, str2) {
    if (str1 === str2) return 100;
    if (str1.length < 2 || str2.length < 2) return 0;
    const getBigrams = (str)=>{
        const bigrams = new Set();
        for(let i = 0; i < str.length - 1; i++){
            bigrams.add(str.substring(i, i + 2));
        }
        return bigrams;
    };
    const bg1 = getBigrams(str1);
    const bg2 = getBigrams(str2);
    let intersectionSize = 0;
    for (const bg of bg1){
        if (bg2.has(bg)) {
            intersectionSize++;
        }
    }
    const diceCoefficient = 2.0 * intersectionSize / (bg1.size + bg2.size);
    return Math.round(diceCoefficient * 100);
}
}),
"[project]/Documents/Hospital Dashboard/hospital-dashboard/app/api/ocr/process-invoice/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/@prisma/client)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$fuzzyMatcher$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/fuzzyMatcher.ts [app-route] (ecmascript)");
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
                error: errorData.error || "OCR extraction failed",
                details: errorData.details,
                help: errorData.help
            }, {
                status: ocrResponse.status
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
        if (!extractedData || !extractedData.items) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
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
        const processedItems = await Promise.all(extractedData.items.map(async (item)=>{
            const match = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$fuzzyMatcher$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fuzzyMatchProduct"])(item.name, matchableProducts);
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: {
                supplierId,
                supplierName: supplier?.name,
                invoiceNo: extractedData.invoiceNo,
                total: extractedData.total,
                items: processedItems
            }
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

//# sourceMappingURL=%5Broot-of-the-server%5D__66fc18d4._.js.map