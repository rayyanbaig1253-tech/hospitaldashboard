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
"[project]/Downloads/Hospital Dashboard/hospital-dashboard/app/api/ocr/invoice/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Hospital Dashboard/hospital-dashboard/node_modules/next/server.js [app-route] (ecmascript)");
;
async function POST(request) {
    try {
        const { image } = await request.json();
        if (!image) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'No image provided'
            }, {
                status: 400
            });
        }
        // OCR.space API Key (Free tier: 25,000 requests/month)
        // Get your free key from: https://ocr.space/ocrapi
        const API_KEY = process.env.OCR_SPACE_API_KEY || 'K87899142388957';
        // Remove data:image/png;base64, prefix if present
        const base64Image = image.replace(/^data:image\/\w+;base64,/, '');
        // Call OCR.space API using URLSearchParams (works better with Next.js)
        const params = new URLSearchParams();
        params.append('base64Image', `data:image/png;base64,${base64Image}`);
        params.append('language', 'eng');
        params.append('isTable', 'true'); // Better table detection
        params.append('scale', 'true'); // Auto-scale for better accuracy
        params.append('OCREngine', '2'); // Engine 2 is more accurate
        params.append('detectOrientation', 'true'); // Auto-rotate images
        params.append('isOverlayRequired', 'true'); // Get word positions
        const response = await fetch('https://api.ocr.space/parse/image', {
            method: 'POST',
            headers: {
                'apikey': API_KEY,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error('OCR API Error Response:', errorText);
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `OCR API request failed: ${response.status} ${response.statusText}`
            }, {
                status: response.status
            });
        }
        const ocrResult = await response.json();
        if (ocrResult.IsErroredOnProcessing) {
            console.error('OCR Processing Error:', ocrResult.ErrorMessage, ocrResult.ErrorDetails);
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `OCR Error: ${ocrResult.ErrorMessage || 'Unknown error'}\n${ocrResult.ErrorDetails || ''}`
            }, {
                status: 500
            });
        }
        if (!ocrResult.ParsedResults || ocrResult.ParsedResults.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'No text detected in image. Please ensure the image is clear and contains readable text.'
            }, {
                status: 400
            });
        }
        const parsedText = ocrResult.ParsedResults[0].ParsedText || '';
        const textOverlay = ocrResult.ParsedResults[0].TextOverlay;
        // Convert to Tesseract-like format for compatibility
        const lines = parsedText.split('\n').map((lineText, idx)=>{
            lineText = lineText.trim();
            if (!lineText) return null;
            // Try to get actual word positions from overlay data
            let words = [];
            if (textOverlay && textOverlay.Lines && textOverlay.Lines[idx]) {
                const overlayLine = textOverlay.Lines[idx];
                words = overlayLine.Words.map((wordData)=>({
                        text: wordData.WordText,
                        bbox: {
                            x0: wordData.Left,
                            y0: wordData.Top,
                            x1: wordData.Left + wordData.Width,
                            y1: wordData.Top + wordData.Height
                        }
                    }));
            } else {
                // Fallback: Split line into words with better spacing estimation
                const lineWords = lineText.split(/\s+/);
                const avgCharWidth = 12; // pixels per character
                const lineHeight = 25;
                let currentX = 0;
                words = lineWords.map((word)=>{
                    const wordWidth = word.length * avgCharWidth;
                    const bbox = {
                        x0: currentX,
                        y0: idx * lineHeight,
                        x1: currentX + wordWidth,
                        y1: (idx + 1) * lineHeight
                    };
                    currentX += wordWidth + avgCharWidth * 2; // Add space between words
                    return {
                        text: word,
                        bbox: bbox
                    };
                });
            }
            return {
                text: lineText,
                words: words,
                bbox: {
                    x0: words.length > 0 ? words[0].bbox.x0 : 0,
                    y0: words.length > 0 ? words[0].bbox.y0 : idx * 25,
                    x1: words.length > 0 ? words[words.length - 1].bbox.x1 : 1000,
                    y1: words.length > 0 ? words[0].bbox.y1 : (idx + 1) * 25
                }
            };
        }).filter((line)=>line !== null);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            data: {
                text: parsedText,
                lines: lines
            }
        });
    } catch (error) {
        console.error('OCR Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: `OCR processing failed: ${error.message}. Please check your internet connection and try again.`
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__755b5623._.js.map