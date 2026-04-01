(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/imageUtils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Image compression utility for OCR and database storage
 * Target size: 250KB - 350KB
 */ __turbopack_context__.s([
    "compressImage",
    ()=>compressImage
]);
async function compressImage(imageSrc, maxWidth = 1920, maxHeight = 1920, quality = 0.7) {
    return new Promise((resolve, reject)=>{
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = ()=>{
            const canvas = document.createElement("canvas");
            let width = img.width;
            let height = img.height;
            // Calculate new dimensions (if needed)
            if (width > maxWidth || height > maxHeight) {
                if (width > height) {
                    height *= maxWidth / width;
                    width = maxWidth;
                } else {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
                return reject(new Error("Could not get canvas context"));
            }
            // Draw and compress
            ctx.drawImage(img, 0, 0, width, height);
            // Use image/jpeg for better compression of photos/invoices
            const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
            console.log(`[ImageCompression] Original dimensions: ${img.width}x${img.height}`);
            console.log(`[ImageCompression] New dimensions: ${width}x${height}`);
            console.log(`[ImageCompression] Final size: ${(compressedDataUrl.length / 1024).toFixed(2)} KB`);
            resolve(compressedDataUrl);
        };
        img.onerror = (err)=>reject(err);
        img.src = imageSrc;
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ExpiryScanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanLine$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/scan-line.js [app-client] (ecmascript) <export default as ScanLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clipboard$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/clipboard.js [app-client] (ecmascript) <export default as Clipboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/pill.js [app-client] (ecmascript) <export default as Pill>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/script.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$imageUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/imageUtils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const MEDICINE_KNOWLEDGE_BASE = [
    {
        name: "Ibuflam 600mg",
        manufacturer: "Lichtenstein",
        batchPrefix: "DV",
        mfgDelay: 36,
        expDelay: 24
    },
    {
        name: "Panadol CF",
        manufacturer: "GSK",
        batchPrefix: "BN",
        mfgDelay: 24,
        expDelay: 36
    },
    {
        name: "Arinac Forte",
        manufacturer: "Abbott",
        batchPrefix: "AR",
        mfgDelay: 12,
        expDelay: 24
    },
    {
        name: "Augmentin 625mg",
        manufacturer: "GSK",
        batchPrefix: "AG",
        mfgDelay: 18,
        expDelay: 24
    },
    {
        name: "Nexum 40mg",
        manufacturer: "Getz",
        batchPrefix: "NX",
        mfgDelay: 24,
        expDelay: 24
    },
    {
        name: "Softin 10mg",
        manufacturer: "Hilton",
        batchPrefix: "SF",
        mfgDelay: 12,
        expDelay: 36
    },
    {
        name: "Disprin",
        manufacturer: "Reckitt",
        batchPrefix: "DS",
        mfgDelay: 48,
        expDelay: 12
    },
    {
        name: "Brufen 400mg",
        manufacturer: "Abbott",
        batchPrefix: "BR",
        mfgDelay: 24,
        expDelay: 24
    },
    {
        name: "Flagyl 400mg",
        manufacturer: "Sanofi",
        batchPrefix: "FL",
        mfgDelay: 18,
        expDelay: 36
    },
    {
        name: "Trevia Met 50/500",
        manufacturer: "Getz",
        batchPrefix: "TM",
        mfgDelay: 12,
        expDelay: 24
    },
    {
        name: "Trevia Met 50/1000",
        manufacturer: "Getz",
        batchPrefix: "TM",
        mfgDelay: 12,
        expDelay: 24
    },
    {
        name: "Caldib-C",
        manufacturer: "GSK",
        batchPrefix: "CD",
        mfgDelay: 12,
        expDelay: 12
    }
];
function formatDateToISO(date) {
    return date.toISOString().split('T')[0];
}
function ExpiryScanner({ onScanComplete, onClose, productName }) {
    _s();
    const [scanning, setScanning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scannedItems, setScannedItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showConfirmation, setShowConfirmation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [manualMode, setManualMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Clipboard Paste Support
    const handlePaste = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ExpiryScanner.useCallback[handlePaste]": async (e)=>{
            const item = e.clipboardData?.items[0];
            if (item?.type.startsWith('image/')) {
                const file = item.getAsFile();
                if (file) {
                    const reader = new FileReader();
                    reader.onload = ({
                        "ExpiryScanner.useCallback[handlePaste]": async (event)=>{
                            const originalBase64 = event.target?.result;
                            try {
                                const compressedBase64 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$imageUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compressImage"])(originalBase64);
                                simulateScan(compressedBase64, "pasted_image_context");
                            } catch (err) {
                                console.error("Compression failed, using original:", err);
                                simulateScan(originalBase64, "pasted_image_context");
                            }
                        }
                    })["ExpiryScanner.useCallback[handlePaste]"];
                    reader.readAsDataURL(file);
                }
            }
        }
    }["ExpiryScanner.useCallback[handlePaste]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ExpiryScanner.useEffect": ()=>{
            window.addEventListener('paste', handlePaste);
            return ({
                "ExpiryScanner.useEffect": ()=>window.removeEventListener('paste', handlePaste)
            })["ExpiryScanner.useEffect"];
        }
    }["ExpiryScanner.useEffect"], [
        handlePaste
    ]);
    // IMAGE PREPROCESSING ENGINE
    const preprocessImage = async (imageSrc)=>{
        return new Promise((resolve)=>{
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = ()=>{
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) return resolve(imageSrc);
                // Target size for OCR optimization
                const scale = Math.min(1.5, 2000 / Math.max(img.width, img.height));
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                // Apply High Contrast Grayscale
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                for(let i = 0; i < data.length; i += 4){
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    const avg = 0.299 * r + 0.587 * g + 0.114 * b;
                    // Dynamic thresholding for sharper text
                    const val = avg > 140 ? 255 : 0;
                    data[i] = data[i + 1] = data[i + 2] = val;
                }
                ctx.putImageData(imageData, 0, 0);
                resolve(canvas.toDataURL('image/png', 1.0));
            };
            img.onerror = ()=>resolve(imageSrc);
            img.src = imageSrc;
        });
    };
    // Enhanced Fuzzy Neural Text Parser
    const parseDetectedText = (text)=>{
        // 0. Normalize: Clean noisy OCR output
        const cleanText = text.replace(/[\n\t\r]/g, ' ').replace(/\s+/g, ' ');
        const upperText = cleanText.toUpperCase();
        let name = "Unknown Medicine";
        let batch = "NOT DETECTED";
        let mfg = ""; // Empty instead of today's date
        let exp = ""; // Empty instead of today's date
        // 1. SMART NAME DETECTION (Fuzzy)
        for (const item of MEDICINE_KNOWLEDGE_BASE){
            const brand = item.name.split(' ')[0].toLowerCase();
            if (cleanText.toLowerCase().includes(brand)) {
                name = item.name;
                break;
            }
        }
        // 2. ADVANCED BATCH DETECTION (Pattern matching)
        // Hierarchy: 1. Strict Prefixes, 2. Loose Prefixes, 3. Alphanumeric Strings near dates
        const strictBatchRegex = /(?:[Bb][Aa][Tt][Cc][Hh]|[Ll][Oo][Tt]|[Cc][Hh][.-]?[Bb]|[Bb][.-][Nn][Oo])[.\s]*[:\-]?[\s]*([A-Z0-9-]{3,15})/i;
        const looseBatchRegex = /\b(?:BN|CN|LOT|B\/N|C\.No)[:\s]*([A-Z0-9-]{3,15})/i;
        const sbMatch = cleanText.match(strictBatchRegex);
        const lbMatch = cleanText.match(looseBatchRegex);
        if (sbMatch && sbMatch[1]) {
            batch = sbMatch[1].trim();
        } else if (lbMatch && lbMatch[1]) {
            batch = lbMatch[1].trim();
        } else {
            // Context-Aware Fallback: Find ALL potential codes (3-15 chars) but filter them
            const potentialCodes = Array.from(cleanText.matchAll(/\b([A-Z0-9-]{3,15})\b/g));
            const medicineNameWords = MEDICINE_KNOWLEDGE_BASE.map((m)=>m.name.split(' ')[0].toLowerCase());
            const garbageWords = [
                'TABLETS',
                'TABLET',
                'CAPSULES',
                'DOSAGE',
                'KEEP',
                'PLACE',
                'REACH',
                'CHILDREN',
                'STRIPS',
                'STRIP',
                'PRICE',
                'PKR',
                'EXP',
                'MFG',
                'DATE'
            ];
            for (const match of potentialCodes){
                const code = match[1].trim();
                const lowerCode = code.toLowerCase();
                // Skip if it's a known medicine name word
                if (medicineNameWords.includes(lowerCode)) continue;
                // Skip if it's common box text
                if (garbageWords.some((w)=>lowerCode.includes(w.toLowerCase()))) continue;
                // Skip if it's just a year or month (already handled by dates)
                if (/^\d{2}$/.test(code) || /^\d{4}$/.test(code)) continue;
                // If it contains at least one digit and passes filters, it's likely the batch
                if (/[0-9]/.test(code)) {
                    batch = code;
                    break;
                }
            }
        }
        // 3. ADVANCED DATE PARSING (Temporal Logic & Pharma Prefixes)
        const allDates = [];
        // Pharma specific keywords to help context
        const mfgPrefixes = [
            'MFG',
            'MANF',
            'M:',
            'M/G'
        ];
        const expPrefixes = [
            'EXP',
            'ED:',
            'E:',
            'EXPD'
        ];
        const batchPrefixes = [
            'B:',
            'BN:',
            'L:',
            'BATCH',
            'LOT'
        ];
        // Pattern 1: DD/MM/YYYY or DD-MM-YY (Full Dates)
        const fullDateRegex = /\b(\d{1,2})[\s\/\.\-]+(\d{1,2})[\s\/\.\-]+(\d{2,4})\b/g;
        let fdMatch;
        while((fdMatch = fullDateRegex.exec(cleanText)) !== null){
            let day = parseInt(fdMatch[1]);
            let month = parseInt(fdMatch[2]);
            let year = parseInt(fdMatch[3]);
            if (month > 12 && day <= 12) {
                [day, month] = [
                    month,
                    day
                ];
            }
            if (year < 100) year += 2000;
            if (month >= 1 && month <= 12 && year > 2020 && year < 2045) {
                // Check immediate context (20 chars before) for prefixes
                const context = cleanText.substring(Math.max(0, fdMatch.index - 20), fdMatch.index).toUpperCase();
                let prefix = "";
                if (mfgPrefixes.some((p)=>context.includes(p))) prefix = "mfg";
                if (expPrefixes.some((p)=>context.includes(p))) prefix = "exp";
                allDates.push({
                    year,
                    month,
                    day,
                    index: fdMatch.index,
                    prefix
                });
            }
        }
        // Pattern 2: MM/YYYY or MM.YYYY (Month/Year fallback)
        const partialDateRegex = /\b(\d{1,2})[\s\/\.\-]+(\d{2,4})\b/g;
        let pdMatch;
        while((pdMatch = partialDateRegex.exec(cleanText)) !== null){
            let month = parseInt(pdMatch[1]);
            let year = parseInt(pdMatch[2]);
            if (month > 1000) {
                [month, year] = [
                    year,
                    month
                ];
            }
            if (year < 100) year += 2000;
            const currentIndex = pdMatch.index;
            const isPart = allDates.some((ad)=>Math.abs(ad.index - currentIndex) < 10);
            if (!isPart && month >= 1 && month <= 12 && year > 2020 && year < 2045) {
                const context = cleanText.substring(Math.max(0, currentIndex - 15), currentIndex).toUpperCase();
                let prefix = "";
                if (mfgPrefixes.some((p)=>context.includes(p))) prefix = "mfg";
                if (expPrefixes.some((p)=>context.includes(p))) prefix = "exp";
                allDates.push({
                    year,
                    month,
                    day: 28,
                    index: currentIndex,
                    prefix
                });
            }
        }
        if (allDates.length > 0) {
            // Priority 1: Use Prefixes
            const mfgMatch = allDates.find((d)=>d.prefix === "mfg");
            const expMatch = allDates.find((d)=>d.prefix === "exp");
            if (expMatch) {
                exp = `${expMatch.year}-${String(expMatch.month).padStart(2, '0')}-${String(expMatch.day).padStart(2, '0')}`;
            }
            if (mfgMatch) {
                mfg = `${mfgMatch.year}-${String(mfgMatch.month).padStart(2, '0')}-${String(mfgMatch.day).padStart(2, '0')}`;
            }
            // Priority 2: Fallback to temporal order if prefixes missing
            if (!exp || !mfg) {
                allDates.sort((a, b)=>a.year * 400 + a.month * 32 + a.day - (b.year * 400 + b.month * 32 + b.day));
                if (!exp) {
                    const latest = allDates[allDates.length - 1];
                    exp = `${latest.year}-${String(latest.month).padStart(2, '0')}-${String(latest.day).padStart(2, '0')}`;
                }
                if (!mfg && allDates.length >= 2) {
                    const earliest = allDates[0];
                    if (earliest !== allDates[allDates.length - 1]) {
                        mfg = `${earliest.year}-${String(earliest.month).padStart(2, '0')}-${String(earliest.day).padStart(2, '0')}`;
                    }
                }
            }
        }
        return {
            name,
            batch,
            mfg,
            exp,
            mrp: null
        }; // Add mrp: null as fallback
    };
    // Real OCR Scanning using Tesseract.js
    const simulateScan = async (imageData, fileName)=>{
        setScanning(true);
        try {
            const source = imageData || "https://tesseract.projectnaptha.com/img/eng_bw.png";
            // Try specialized Carton OCR API
            const response = await fetch('/api/ocr/carton', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image: source
                })
            });
            let filteredText = "";
            let result = null;
            if (response.ok) {
                result = await response.json();
                // Special case: Carton API returns structured data directly
                if (result.data && !result.data.text) {
                    filteredText = `Batch: ${result.data.batchNo} Exp: ${result.data.expiryDate}`;
                } else {
                    filteredText = result.data.text || "";
                }
            } else {
                // Fallback to Tesseract.js
                console.warn('Professional OCR API failed, falling back to local Tesseract');
                if (!window.Tesseract) throw new Error("Tesseract not ready");
                const processedImage = await preprocessImage(source);
                const result = await window.Tesseract.recognize(processedImage, 'eng');
                filteredText = result.data.text;
            }
            console.log("OCR Result Text:", filteredText);
            const parsed = parseDetectedText(filteredText);
            const detected = [
                {
                    id: Math.random().toString(36).substr(2, 9),
                    productName: result.data.productName || (parsed.name === "Unknown Medicine" && fileName ? fileName.split('.')[0] : parsed.name),
                    batchNo: result.data.batchNo || parsed.batch,
                    mfgDate: result.data.mfgDate || parsed.mfg || formatDateToISO(new Date(new Date().setFullYear(new Date().getFullYear() - 1))),
                    expiryDate: result.data.expiryDate || parsed.exp || formatDateToISO(new Date(new Date().setFullYear(new Date().getFullYear() + 2))),
                    mrp: result.data.mrp || null
                }
            ];
            setScannedItems(detected);
            setShowConfirmation(true);
        } catch (error) {
            console.error("Scanning Error:", error);
            const detected = [
                {
                    id: Math.random().toString(36).substr(2, 9),
                    productName: productName || (fileName ? fileName.split('.')[0] : "Medicine Box"),
                    batchNo: "BATCH-SCAN-PENDING",
                    mfgDate: "2024-01-01",
                    expiryDate: "2026-12-31",
                    mrp: null
                }
            ];
            setScannedItems(detected);
            setShowConfirmation(true);
        } finally{
            setScanning(false);
        }
    };
    const handleFileUpload = (e)=>{
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (event)=>{
                const originalBase64 = event.target?.result;
                try {
                    const compressedBase64 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$imageUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compressImage"])(originalBase64);
                    simulateScan(compressedBase64, file.name);
                } catch (err) {
                    console.error("Compression failed, using original:", err);
                    simulateScan(originalBase64, file.name);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const handleConfirm = ()=>{
        onScanComplete(scannedItems);
        onClose();
    };
    const removeItem = (id)=>{
        setScannedItems(scannedItems.filter((item)=>item.id !== id));
    };
    const updateItem = (id, field, value)=>{
        setScannedItems(scannedItems.map((item)=>item.id === id ? {
                ...item,
                [field]: field === 'mrp' ? parseFloat(value) || null : value
            } : item));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/70 backdrop-blur-md z-[200] flex items-center justify-center p-4 overflow-y-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js",
                strategy: "lazyOnload",
                onLoad: ()=>console.log("Tesseract Script Loaded")
            }, void 0, false, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                lineNumber: 376,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-[2.5rem] p-8 max-w-2xl w-full shadow-2xl animate-fade-in-up relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-black text-gray-900 uppercase tracking-tight",
                                        children: "AI Multi-Vision Scanner"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 384,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500 font-medium",
                                        children: "Auto-detecting medicines, batches, and expiries."
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 385,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                lineNumber: 383,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "p-3 hover:bg-gray-100 rounded-2xl transition-all",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "h-6 w-6 text-gray-400"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                    lineNumber: 388,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                lineNumber: 387,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                        lineNumber: 382,
                        columnNumber: 17
                    }, this),
                    !scanning && !showConfirmation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-purple-50 border border-purple-100 rounded-3xl p-6 flex items-start gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 bg-white rounded-2xl shadow-sm",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clipboard$3e$__["Clipboard"], {
                                            className: "h-6 w-6 text-purple-600"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                            lineNumber: 396,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 395,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-black text-xs text-purple-600 uppercase tracking-widest mb-1",
                                                children: "Clipboard Ready"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                lineNumber: 399,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-purple-800/70 font-medium leading-relaxed",
                                                children: "You can now **simply paste (Ctrl+V)** any image you have copied directly into this window."
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                lineNumber: 400,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 398,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                lineNumber: 394,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>fileInputRef.current?.click(),
                                        className: "group flex flex-col items-center justify-center p-10 border-4 border-dashed border-gray-100 rounded-[2.5rem] hover:border-purple-400 hover:bg-purple-50 transition-all",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-5 bg-white rounded-3xl shadow-sm mb-4 group-hover:scale-110 transition-transform",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                    className: "h-8 w-8 text-purple-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                    lineNumber: 410,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                lineNumber: 409,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-black text-gray-900 uppercase text-xs tracking-widest",
                                                children: "Select Image"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                lineNumber: 412,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 405,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>simulateScan(),
                                        className: "group flex flex-col items-center justify-center p-10 border-4 border-dashed border-gray-100 rounded-[2.5rem] hover:border-blue-400 hover:bg-blue-50 transition-all",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-5 bg-white rounded-3xl shadow-sm mb-4 group-hover:scale-110 transition-transform",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                    className: "h-8 w-8 text-blue-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                    lineNumber: 420,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                lineNumber: 419,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-black text-gray-900 uppercase text-xs tracking-widest",
                                                children: "Life Camera"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                lineNumber: 422,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 415,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                lineNumber: 404,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: fileInputRef,
                                type: "file",
                                accept: "image/*",
                                onChange: handleFileUpload,
                                className: "hidden"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                lineNumber: 426,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                        lineNumber: 393,
                        columnNumber: 21
                    }, this),
                    scanning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center justify-center py-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-purple-500/20 blur-3xl rounded-full animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 439,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "h-20 w-20 text-purple-600 animate-spin relative z-10"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 440,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanLine$3e$__["ScanLine"], {
                                        className: "h-10 w-10 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 441,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                lineNumber: 438,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-xl font-black text-gray-900 uppercase tracking-tight",
                                children: "De-constructing Image..."
                            }, void 0, false, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                lineNumber: 443,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500 mt-2 font-medium",
                                children: "Scanning for medicine names and data stamps"
                            }, void 0, false, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                lineNumber: 444,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                        lineNumber: 437,
                        columnNumber: 21
                    }, this),
                    showConfirmation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6 animate-fade-in",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-black text-gray-900 uppercase text-sm tracking-widest",
                                        children: [
                                            "Detected (",
                                            scannedItems.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 451,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            const knowledgeItem = MEDICINE_KNOWLEDGE_BASE[0];
                                            setScannedItems([
                                                ...scannedItems,
                                                {
                                                    id: Math.random().toString(36).substr(2, 9),
                                                    productName: knowledgeItem.name,
                                                    batchNo: "B" + Math.floor(1000 + Math.random() * 9000),
                                                    mfgDate: formatDateToISO(new Date()),
                                                    expiryDate: formatDateToISO(new Date()),
                                                    mrp: null
                                                }
                                            ]);
                                        },
                                        className: "text-xs font-black text-purple-600 uppercase flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                lineNumber: 463,
                                                columnNumber: 33
                                            }, this),
                                            " Add Item"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 452,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                lineNumber: 450,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar",
                                children: scannedItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-5 bg-gray-50/50 rounded-3xl border border-gray-100 group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-4 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-2 bg-white rounded-xl shadow-sm",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pill$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pill$3e$__["Pill"], {
                                                            className: "h-4 w-4 text-purple-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                            lineNumber: 472,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: item.productName,
                                                        onChange: (e)=>updateItem(item.id, 'productName', e.target.value),
                                                        placeholder: "Medicine Name",
                                                        className: "flex-1 bg-transparent border-0 font-black text-gray-900 uppercase text-sm focus:ring-0 outline-none"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                        lineNumber: 474,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>removeItem(item.id),
                                                        className: "p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                            lineNumber: 481,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                        lineNumber: 480,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                lineNumber: 470,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-3 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block",
                                                                children: "Batch No"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                                lineNumber: 486,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: item.batchNo,
                                                                onChange: (e)=>updateItem(item.id, 'batchNo', e.target.value),
                                                                className: "w-full bg-white border-0 rounded-xl px-4 py-2 text-xs font-bold text-gray-700 shadow-sm focus:ring-2 focus:ring-purple-500/10"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                                lineNumber: 487,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                        lineNumber: 485,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block",
                                                                children: "MFG Date"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                                lineNumber: 494,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "date",
                                                                value: item.mfgDate,
                                                                onChange: (e)=>updateItem(item.id, 'mfgDate', e.target.value),
                                                                className: "w-full bg-white border-0 rounded-xl px-4 py-2 text-xs font-bold text-gray-700 shadow-sm focus:ring-2 focus:ring-purple-500/10"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                                lineNumber: 495,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                        lineNumber: 493,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block",
                                                                children: "Expiry Date"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                                lineNumber: 503,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "date",
                                                                value: item.expiryDate,
                                                                onChange: (e)=>updateItem(item.id, 'expiryDate', e.target.value),
                                                                className: "w-full bg-white border-0 rounded-xl px-4 py-2 text-xs font-bold text-gray-700 shadow-sm focus:ring-2 focus:ring-purple-500/10"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                                lineNumber: 504,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                        lineNumber: 502,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                lineNumber: 484,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1 block",
                                                        children: "Retail Price (MRP)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                        lineNumber: 513,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-bold text-gray-400",
                                                                children: "PKR"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                                lineNumber: 515,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                value: item.mrp || "",
                                                                onChange: (e)=>updateItem(item.id, 'mrp', e.target.value),
                                                                placeholder: "0.00",
                                                                className: "flex-1 bg-white border-0 rounded-xl px-4 py-2 text-xs font-black text-blue-600 shadow-sm focus:ring-2 focus:ring-blue-500/10"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                                lineNumber: 516,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                        lineNumber: 514,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                                lineNumber: 512,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 469,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                lineNumber: 467,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4 pt-4 sticky bottom-0 bg-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowConfirmation(false),
                                        className: "flex-1 py-4 text-gray-400 font-black uppercase text-xs tracking-widest",
                                        children: "Rescan"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 530,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleConfirm,
                                        className: "flex-2 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-purple-200",
                                        children: "Import Detected Stock"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                        lineNumber: 531,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                                lineNumber: 529,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                        lineNumber: 449,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
                lineNumber: 381,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx",
        lineNumber: 375,
        columnNumber: 9
    }, this);
}
_s(ExpiryScanner, "fySqdMgd0QxUoIiYfkpGt+bP4kE=");
_c = ExpiryScanner;
var _c;
__turbopack_context__.k.register(_c, "ExpiryScanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/services/purchase.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "purchaseService",
    ()=>purchaseService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/storage.ts [app-client] (ecmascript)");
;
const purchaseService = {
    /**
     * Calculates the average discount percentage for a product from a specific supplier.
     * 
     * SQL Equivalent:
     * SELECT AVG(discount_percent) 
     * FROM purchases p
     * JOIN purchase_items pi ON p.id = pi.purchase_id
     * WHERE pi.product_id = :productId AND p.supplier_id = :supplierId
     */ getAverageDiscount: (productId, supplierId)=>{
        const purchases = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('purchases', []);
        let totalDiscount = 0;
        let count = 0;
        purchases.forEach((purchase)=>{
            // Check if this purchase belongs to the supplier
            // Supporting both nested object and direct ID for flexibility
            const pSupplierId = purchase.supplier?.id || purchase.supplierId;
            if (pSupplierId == supplierId) {
                purchase.items.forEach((item)=>{
                    if (item.productId == productId) {
                        // Ensure we have a valid numeric discount
                        const discount = parseFloat(item.discountPercent);
                        if (!isNaN(discount)) {
                            totalDiscount += discount;
                            count++;
                        }
                    }
                });
            }
        });
        return count > 0 ? parseFloat((totalDiscount / count).toFixed(2)) : 0;
    },
    /**
     * Checks if a current discount triggers a smart warning.
     * Rules:
     * 1. If average discount > 0 AND current discount == 0 -> Warning
     * 2. If average discount >= 5 AND current discount < 2 -> Warning
     */ checkDiscountWarning: (productId, supplierId, currentDiscount)=>{
        const avgDiscount = purchaseService.getAverageDiscount(productId, supplierId);
        if (avgDiscount > 0 && currentDiscount === 0) {
            return {
                isWarning: true,
                avg: avgDiscount,
                message: "Warning: This product usually has a discount from this supplier, but no discount was detected in this invoice."
            };
        }
        if (avgDiscount >= 5 && currentDiscount < 2) {
            return {
                isWarning: true,
                avg: avgDiscount,
                message: `Warning: This product usually has a higher discount (Avg: ${avgDiscount}%) from this supplier.`
            };
        }
        return {
            isWarning: false,
            avg: avgDiscount
        };
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PurchasesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanLine$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/scan-line.js [app-client] (ecmascript) <export default as ScanLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/hooks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$components$2f$expiry$2f$ExpiryScanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/components/expiry/ExpiryScanner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/node_modules/next/script.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$imageUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/imageUtils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$services$2f$purchase$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Hospital Dashboard/hospital-dashboard/lib/services/purchase.service.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
const getSimilarity = (s1, s2)=>{
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    if (longer.length === 0) return 1.0;
    const bigrams = (str)=>{
        const result = [];
        for(let i = 0; i < str.length - 1; i++)result.push(str.slice(i, i + 2));
        return result;
    };
    const s1Bigrams = bigrams(s1.toLowerCase());
    const s2Bigrams = bigrams(s2.toLowerCase());
    let intersection = 0;
    s1Bigrams.forEach((bg1)=>{
        if (s2Bigrams.includes(bg1)) intersection++;
    });
    return 2.0 * intersection / (s1Bigrams.length + s2Bigrams.length);
};
function PurchasesPage() {
    _s();
    const [showForm, setShowForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isScanning, setIsScanning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showScanner, setShowScanner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentScanIdx, setCurrentScanIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [aiLoading, setAiLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAiSupplierMatched, setIsAiSupplierMatched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAiInvMatched, setIsAiInvMatched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAiDateMatched, setIsAiDateMatched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loadingText, setLoadingText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Analyzing Invoice...");
    const [loadingSubText, setLoadingSubText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Extracting medicines, quantities, and prices");
    const [isScanningCarton, setIsScanningCarton] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [detectedSupplierName, setDetectedSupplierName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [detectedInvoiceNo, setDetectedInvoiceNo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [detectedDate, setDetectedDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isResolveModalOpen, setIsResolveModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [resolvingIndex, setResolvingIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [resolveSearch, setResolveSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const { data: suppliers, refetch: refetchSuppliers } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useData"])("/api/suppliers");
    const { data: products, refetch: refetchProducts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useData"])("/api/products");
    const { data: aliases, refetch: refetchAliases } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useData"])("/api/products/aliases");
    const { data: purchaseHistory, refetch: refetchHistory } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useData"])("/api/purchases");
    const handleDeletePurchase = (id)=>{
        if (confirm("Are you sure you want to delete this purchase record?")) {
            const currentPurchases = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('purchases', []);
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set('purchases', currentPurchases.filter((p)=>p.id !== id));
            refetchHistory();
            alert("Purchase record deleted.");
        }
    };
    const [formItems, setFormItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [invoiceNo, setInvoiceNo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedSupplierId, setSelectedSupplierId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [shipmentDate, setShipmentDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date().toISOString().split('T')[0]);
    const [discountWarnings, setDiscountWarnings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PurchasesPage.useEffect": ()=>{
        // Form items monitoring (Debug removed for production)
        }
    }["PurchasesPage.useEffect"], [
        formItems
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PurchasesPage.useEffect": ()=>{
            if (selectedSupplierId && formItems.length > 0) {
                const newWarnings = {};
                formItems.forEach({
                    "PurchasesPage.useEffect": (item, idx)=>{
                        if (item.productId) {
                            const check = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$services$2f$purchase$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["purchaseService"].checkDiscountWarning(item.productId, selectedSupplierId, parseFloat(item.discountPercent) || 0);
                            if (check.isWarning) {
                                newWarnings[idx] = check;
                            }
                        }
                    }
                }["PurchasesPage.useEffect"]);
                setDiscountWarnings(newWarnings);
            } else {
                setDiscountWarnings({});
            }
        }
    }["PurchasesPage.useEffect"], [
        formItems,
        selectedSupplierId
    ]);
    const preprocessImage = async (imageSrc)=>{
        return new Promise((resolve)=>{
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = ()=>{
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) return resolve(imageSrc);
                const scale = Math.min(1.5, 2000 / Math.max(img.width, img.height));
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/png', 1.0));
                if (isScanningCarton) {
                    setLoadingText("Scanning Carton...");
                    setLoadingSubText("Detecting Expiry, MFG, and Batch Details");
                } else {
                    setLoadingText("Analyzing Invoice...");
                    setLoadingSubText("Extracting medicines, quantities, and prices");
                }
                setAiLoading(true);
            };
            img.onerror = ()=>{
                console.error("Image load failed");
                resolve(imageSrc);
            };
            img.src = imageSrc;
        });
    };
    const processAIInvoice = async (imageData)=>{
        setAiLoading(true);
        try {
            setLoadingText("🚀 Professional OCR Processing...");
            setLoadingSubText("Using advanced Gemini AI for maximum accuracy");
            const response = await fetch('/api/ocr/process-invoice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image: imageData
                })
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'OCR failed');
            }
            const result = await response.json();
            const data = result.data;
            if (data && data.items && data.items.length > 0) {
                const formatted = data.items.map((item)=>{
                    const qtyVal = parseFloat(item.qty) || 0;
                    const bonusVal = parseFloat(item.bonus) || 0;
                    const rateVal = parseFloat(item.rate) || 0;
                    const discPctVal = parseFloat(item.discountPercent) || 0;
                    const taxPctVal = parseFloat(item.taxPercent) || 0;
                    const totalQtyVal = qtyVal + bonusVal;
                    const netVal = item.netAmount || qtyVal * rateVal * (1 - discPctVal / 100) * (1 + taxPctVal / 100);
                    return {
                        id: Math.random().toString(36).substr(2, 9),
                        productId: item.matchedProductId ? String(item.matchedProductId) : "",
                        name: item.matchName || item.name,
                        matchingStatus: item.matchedProductId ? "matched" : "unmatched",
                        tempScannedName: item.name,
                        batchNo: item.batch || "B-NEW",
                        mfgDate: item.mfgDate || "",
                        expiryDate: item.expiry || "2026-12-01",
                        quantity: qtyVal,
                        bonusQty: bonusVal,
                        totalQty: totalQtyVal,
                        purchasePrice: rateVal,
                        discountPercent: discPctVal,
                        taxPercent: taxPctVal,
                        netAmount: netVal,
                        effectiveCost: totalQtyVal > 0 ? netVal / totalQtyVal : rateVal,
                        alert: item.alert,
                        isAiSuggested: true,
                        brand: item.brand,
                        category: item.category
                    };
                });
                if (data.supplierId) setSelectedSupplierId(String(data.supplierId));
                setFormItems(formatted);
                if (data.invoiceNo) setInvoiceNo(data.invoiceNo);
                if (data.date) setShipmentDate(data.date);
                if (data.supplierName) setDetectedSupplierName(data.supplierName);
                alert(`✅ SUCCESS: AI processed ${formatted.length} items and matched supplier.`);
            } else {
                throw new Error("Gemini could not find any items in the invoice.");
            }
        } catch (error) {
            console.error('OCR Grid Error:', error);
            alert(`Vision Error: ${error.message}`);
        } finally{
            setAiLoading(false);
        }
    };
    const handleResolveMatch = async (productId, isNew = false)=>{
        if (resolvingIndex === null) return;
        const item = formItems[resolvingIndex];
        try {
            if (isNew) {
                // Create new product first
                const response = await fetch('/api/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: item.name,
                        brand: item.brand,
                        category: item.category,
                        purchasePrice: item.purchasePrice,
                        salePrice: parseFloat((item.purchasePrice * 1.2).toFixed(2)),
                        item_code: `AUTO-${Math.random().toString(36).substr(2, 5).toUpperCase()}`
                    })
                });
                const newProduct = await response.json();
                productId = newProduct.id;
                // Sync to Legacy localStorage
                const currentProducts = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('products', []);
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set('products', [
                    ...currentProducts,
                    {
                        ...newProduct,
                        stock: 0,
                        batches: []
                    }
                ]);
            } else {
                // Create Alias for existing product
                await fetch('/api/products/aliases', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        alias: item.tempScannedName,
                        productId: productId
                    })
                });
                await refetchAliases();
            }
            const newItems = [
                ...formItems
            ];
            newItems[resolvingIndex] = {
                ...newItems[resolvingIndex],
                productId: String(productId),
                matchingStatus: "matched",
                // Update product info if linking to existing
                name: !isNew ? products?.find((p)=>String(p.id) === String(productId))?.name || item.name : item.name
            };
            setFormItems(newItems);
            setIsResolveModalOpen(false);
            setResolvingIndex(null);
            setResolveSearch("");
        } catch (error) {
            alert(`Error resolving product: ${error.message}`);
        }
    };
    const handleSavePurchase = async (e)=>{
        e.preventDefault();
        // STEP 1: AUTO-RESOLVE UNMATCHED PRODUCTS 🚀
        const unmatchedItems = formItems.filter((item)=>item.matchingStatus === "unmatched");
        let finalFormItems = formItems;
        if (unmatchedItems.length > 0) {
            setAiLoading(true);
            setLoadingText("Auto-Creating Products...");
            setLoadingSubText(`Generating ${unmatchedItems.length} new product records`);
            try {
                const resolvedItems = await Promise.all(formItems.map(async (item)=>{
                    if (item.matchingStatus === "unmatched") {
                        // Create New Product
                        const response = await fetch('/api/products', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                name: item.name,
                                brand: item.brand,
                                category: item.category,
                                purchasePrice: item.purchasePrice,
                                salePrice: parseFloat((item.purchasePrice * 1.25).toFixed(2)),
                                item_code: `AUTO-${Math.random().toString(36).substr(2, 5).toUpperCase()}`
                            })
                        });
                        const newProduct = await response.json();
                        // Sync to Legacy localStorage
                        const currentProducts = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('products', []);
                        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set('products', [
                            ...currentProducts,
                            {
                                ...newProduct,
                                stock: 0,
                                batches: []
                            }
                        ]);
                        return {
                            ...item,
                            productId: String(newProduct.id),
                            matchingStatus: "matched"
                        };
                    }
                    return item;
                }));
                setFormItems(resolvedItems);
                finalFormItems = resolvedItems;
                setAiLoading(false);
            } catch (error) {
                alert(`Auto-Resolve failed: ${error.message}`);
                setAiLoading(false);
                setIsSubmitting(false);
                return;
            }
        }
        setIsSubmitting(true);
        // STEP 2: HARD BACKEND VALIDATION & PROTECTION 🛡️
        try {
            finalFormItems.forEach((item, idx)=>{
                let qty = parseFloat(item.quantity) || 0;
                let bonus = parseFloat(item.bonusQty) || 0;
                // Rule: If Purch Qty is 0/Null, check if there's a rescue (Already done in UI but double check)
                // If the user manually cleared it to 0, we must warn.
                const totalQty = qty + bonus;
                if (totalQty <= 0) {
                    throw new Error(`Row ${idx + 1} (${item.name}) has VALIDATION ERROR: Total Quantity is 0.\n\nPlease enter a valid Purchase Qty or Bonus.`);
                }
            });
        } catch (error) {
            alert(`⚠️ VALIDATION FAILED\n\n${error.message}`);
            setIsSubmitting(false);
            return;
        }
        let currentSupplierId = selectedSupplierId;
        let selectedSupplier = suppliers?.find((s)=>s.id === selectedSupplierId);
        // AUTO-CREATE NEW SUPPLIER IF DETECTED
        if (!currentSupplierId && detectedSupplierName) {
            const newSupplier = {
                id: Date.now().toString(),
                name: detectedSupplierName,
                phone: "OCR-EXTRACTED",
                email: "auto@supplier.com",
                address: "Extracted from Image",
                totalOrders: 1,
                lastOrder: new Date().toISOString(),
                status: 'Active'
            };
            const currentSuppliers = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('suppliers', []);
            __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set('suppliers', [
                ...currentSuppliers,
                newSupplier
            ]);
            currentSupplierId = newSupplier.id;
            selectedSupplier = newSupplier;
            console.log('🚀 Automatically created and assigned new supplier:', detectedSupplierName);
        }
        if (!currentSupplierId) {
            alert("Please select a supplier or ensure one is detected from the invoice.");
            setIsSubmitting(false);
            return;
        }
        const newPurchase = {
            id: Date.now().toString(),
            invoiceNo: invoiceNo,
            date: shipmentDate,
            supplier: {
                id: currentSupplierId,
                name: selectedSupplier?.name || "Unknown Supplier"
            },
            items: finalFormItems.map((item)=>{
                const qty = parseFloat(item.quantity) || 0;
                const bonus = parseFloat(item.bonusQty) || 0;
                const price = parseFloat(item.purchasePrice) || 0;
                const totalQty = qty + bonus;
                // Discount & Tax Logic
                const discountPercent = parseFloat(item.discountPercent) || 0;
                const taxPercent = parseFloat(item.taxPercent) || 0;
                const grossAmount = qty * price;
                const discountAmount = parseFloat((grossAmount * discountPercent / 100).toFixed(2));
                const taxableAmount = parseFloat((grossAmount - discountAmount).toFixed(2));
                const taxAmount = parseFloat((taxableAmount * taxPercent / 100).toFixed(2));
                const netAmount = parseFloat((taxableAmount + taxAmount).toFixed(2));
                const effectiveCost = totalQty > 0 ? parseFloat((netAmount / totalQty).toFixed(2)) : 0;
                return {
                    ...item,
                    product: products?.find((p)=>p.id === item.productId),
                    purchQty: qty,
                    bonusQty: bonus,
                    totalQty: totalQty,
                    discountPercent: discountPercent,
                    discountAmount: discountAmount,
                    taxPercent: taxPercent,
                    taxAmount: taxAmount,
                    netAmount: netAmount,
                    effectiveCost: effectiveCost
                };
            }),
            total: 0 // Will be recalculated below
        };
        // Recalculate Total
        newPurchase.total = newPurchase.items.reduce((sum, item)=>sum + item.netAmount, 0);
        // STEP 3: RECORD PRODUCT-SUPPLIER LINKS & SAVE
        try {
            await Promise.all(finalFormItems.map((item)=>fetch('/api/products/suppliers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        productId: item.productId,
                        supplierId: currentSupplierId,
                        purchasePrice: item.purchasePrice,
                        discount: item.discountPercent
                    })
                })));
            // Wait a bit for DB to sync
            setTimeout(()=>{
                // 1. Save to Purchase History
                const currentPurchases = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('purchases', []);
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set('purchases', [
                    newPurchase,
                    ...currentPurchases
                ]);
                // 2. Update Batch Ledger (The primary source of truth)
                const currentBatches = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('batches', []);
                const newBatches = [
                    ...currentBatches
                ];
                newPurchase.items.forEach((item)=>{
                    // Add new batch record
                    newBatches.push({
                        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                        productId: item.productId,
                        batchNo: item.batchNo,
                        mfgDate: item.mfgDate,
                        expiryDate: item.expiryDate,
                        // Supplier Info (so product detail page can show it)
                        supplierId: currentSupplierId,
                        supplier: {
                            id: currentSupplierId,
                            name: selectedSupplier?.name || newPurchase.supplier?.name || "Unknown Supplier"
                        },
                        // Detailed Financials
                        purchQty: item.purchQty,
                        bonusQty: item.bonusQty,
                        quantity: item.totalQty,
                        rate: parseFloat(item.purchasePrice) || 0,
                        purchasePrice: parseFloat(item.purchasePrice) || 0,
                        discountPercent: item.discountPercent,
                        discountAmount: item.discountAmount,
                        taxPercent: item.taxPercent,
                        taxAmount: item.taxAmount,
                        netAmount: item.netAmount,
                        effectiveUnitCost: item.effectiveCost,
                        purchaseId: newPurchase.id,
                        createdAt: new Date().toISOString()
                    });
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set('batches', newBatches);
                // 3. Update Product Stock & Batches (For high-level viewing)
                const updatedProductsWithStock = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('products', []).map((p)=>{
                    const purchasedItems = finalFormItems.filter((item)=>item.productId === p.id);
                    if (purchasedItems.length > 0) {
                        const addedTotal = purchasedItems.reduce((sum, item)=>sum + (parseFloat(item.quantity) || 0) + (parseFloat(item.bonusQty) || 0), 0);
                        // Add new batches to the product's own batches array for display in the Products grid
                        const newProductBatches = purchasedItems.map((item)=>({
                                id: Math.random().toString(36).substr(2, 9),
                                batchNo: item.batchNo,
                                mfgDate: item.mfgDate,
                                expiryDate: item.expiryDate,
                                quantity: (parseFloat(item.quantity) || 0) + (parseFloat(item.bonusQty) || 0),
                                purchasePrice: parseFloat(item.purchasePrice) || 0,
                                discountPercent: parseFloat(item.discountPercent) || 0,
                                supplierId: currentSupplierId,
                                supplier: {
                                    id: currentSupplierId,
                                    name: selectedSupplier?.name || newPurchase.supplier?.name || "Unknown Supplier"
                                },
                                createdAt: new Date().toISOString()
                            }));
                        return {
                            ...p,
                            stock: (p.stock || 0) + addedTotal,
                            batches: [
                                ...newProductBatches,
                                ...p.batches || []
                            ] // Push to front so newest shows first
                        };
                    }
                    return p;
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set('products', updatedProductsWithStock);
                // 4. Update Supplier Stats
                const currentSuppliers = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('suppliers', []);
                const updatedSuppliers = currentSuppliers.map((s)=>{
                    if (s.id === currentSupplierId) {
                        return {
                            ...s,
                            totalOrders: (Number(s.totalOrders) || 0) + 1,
                            lastOrder: new Date().toISOString()
                        };
                    }
                    return s;
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set('suppliers', updatedSuppliers);
                // 5. Refresh Data from DB
                refetchHistory?.();
                refetchProducts?.();
                refetchSuppliers?.();
                setShowForm(false);
                setFormItems([]);
                setIsSubmitting(false);
                alert("Batch Ledger Updated: Stock has been recorded per batch for full auditability.");
            }, 800);
        } catch (error) {
            console.error('Save Error:', error);
            alert(`Error saving purchase: ${error.message}`);
            setIsSubmitting(false);
        }
    };
    const addItem = ()=>{
        setFormItems([
            ...formItems,
            {
                productId: "",
                itemCode: "",
                batchNo: "",
                mfgDate: "",
                expiryDate: "",
                quantity: 0,
                bonusQty: 0,
                purchasePrice: 0,
                discountPercent: 0,
                taxPercent: 0,
                remarks: ""
            }
        ]);
    };
    const removeItem = (idx)=>{
        setFormItems(formItems.filter((_, i)=>i !== idx));
    };
    const handleScanComplete = (data)=>{
        if (!data || currentScanIdx === null) return;
        // If data is array (from ExpiryScanner), use it directly
        if (Array.isArray(data) && data.length > 0) {
            const scanned = data[0]; // Take first item (since we scan one row at a time)
            const n = [
                ...formItems
            ];
            if (scanned.batchNo && scanned.batchNo !== "BATCH-SCAN-PENDING") n[currentScanIdx].batchNo = scanned.batchNo;
            if (scanned.expiryDate) n[currentScanIdx].expiryDate = scanned.expiryDate;
            if (scanned.mfgDate) n[currentScanIdx].mfgDate = scanned.mfgDate;
            if (scanned.mrp) n[currentScanIdx].purchasePrice = scanned.mrp; // Map MRP to purchase price as a starting point
            setFormItems(n);
            setShowScanner(false);
            if (scanned.expiryDate) alert(`✨ AI Detected Expiry: ${scanned.expiryDate}`);
            setCurrentScanIdx(null);
            return;
        }
        // Fallback for legacy raw image data (if ever used)
        setIsScanningCarton(true);
        setAiLoading(true);
        // ... (Legacy logic preserved just in case, or removed if redundant)
        // Since ExpiryScanner now returns objects, we can likely skip the OCR here 
        // OR warn that legacy mode is deprecated.
        console.warn("Received raw data in handleScanComplete, expected ScannedItem[]");
        setAiLoading(false);
        setShowScanner(false);
    };
    const formatDetectedDate = (raw)=>{
        const parts = raw.split(/[\/\-\.]/);
        // Ensure parts are 2-digits or 4-digits
        const cleanParts = parts.map((p)=>p.trim().padStart(2, '0'));
        if (cleanParts.length === 2) {
            // MM/YY or MM/YYYY
            const month = cleanParts[0];
            const year = cleanParts[1].length === 2 ? `20${cleanParts[1]}` : cleanParts[1];
            return `${year}-${month}-01`;
        } else if (cleanParts.length === 3) {
            // DD/MM/YY or DD/MM/YYYY or MM/DD/YYYY
            let day = cleanParts[0];
            let month = cleanParts[1];
            let year = cleanParts[2].length === 2 ? `20${cleanParts[2]}` : cleanParts[2];
            // Heuristic for PKR/International: Try to identify if part[1] is definitely a month
            const p0 = parseInt(day);
            const p1 = parseInt(month);
            if (p0 > 12 && p1 <= 12) {
            // Definitely DD-MM-YYYY
            } else if (p1 > 12 && p0 <= 12) {
                // Likely MM-DD-YYYY
                const tmp = day;
                day = month;
                month = tmp;
            }
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
        return "";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-8 animate-fade-in-up",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-3xl font-black text-gray-900 uppercase tracking-tight",
                                        children: "MediStock Procurement"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                        lineNumber: 662,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500 mt-1 font-medium",
                                        children: "Record new inventory shipments and track purchase history."
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                        lineNumber: 663,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                lineNumber: 661,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setShowForm(true);
                                    if (formItems.length === 0) addItem();
                                },
                                className: "btn-primary flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                        lineNumber: 672,
                                        columnNumber: 25
                                    }, this),
                                    "New Purchase Record"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                lineNumber: 665,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                        lineNumber: 660,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-premium rounded-3xl overflow-hidden border-0 shadow-2xl shadow-purple-100/50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 text-white",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                lineNumber: 681,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-bold uppercase tracking-tight",
                                                children: "Recent Purchases"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                lineNumber: 682,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                        lineNumber: 680,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative w-64",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                lineNumber: 685,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Search invoices...",
                                                className: "w-full bg-white/10 border border-white/20 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/50 focus:bg-white/20 transition-all outline-none"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                lineNumber: 686,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                        lineNumber: 684,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                lineNumber: 679,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "bg-gray-50/50 border-b border-gray-100",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                        children: "Invoice #"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                        lineNumber: 697,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                        children: "Supplier"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                        lineNumber: 698,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                        children: "Date"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                        lineNumber: 699,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                        children: "Items"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                        lineNumber: 700,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                        children: "Total Value"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                        lineNumber: 701,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right",
                                                        children: "Actions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                        lineNumber: 702,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                lineNumber: 696,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                            lineNumber: 695,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            className: "divide-y divide-gray-50",
                                            children: [
                                                purchaseHistory?.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "hover:bg-purple-50/30 transition-colors group",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-4 px-6 font-black text-gray-900",
                                                                children: p.invoiceNo
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                lineNumber: 708,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-4 px-6",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-xs uppercase",
                                                                            children: p.supplier.name.charAt(0)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                            lineNumber: 711,
                                                                            columnNumber: 49
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-semibold text-gray-700",
                                                                            children: p.supplier.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                            lineNumber: 714,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 710,
                                                                    columnNumber: 45
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                lineNumber: 709,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-4 px-6 text-sm text-gray-500 font-medium",
                                                                children: new Date(p.date).toLocaleDateString()
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                lineNumber: 717,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-4 px-6",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg text-xs font-black",
                                                                    children: [
                                                                        p.items.length,
                                                                        " MEDICINES"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 719,
                                                                    columnNumber: 45
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                lineNumber: 718,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-4 px-6 font-black text-purple-600",
                                                                children: [
                                                                    "PKR ",
                                                                    p.total.toLocaleString()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                lineNumber: 723,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-4 px-6 text-right",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center justify-end gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            className: "p-2 hover:bg-white rounded-xl shadow-sm border border-gray-100 text-gray-400 hover:text-purple-600 transition-all",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                                                className: "h-4 w-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 727,
                                                                                columnNumber: 53
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                            lineNumber: 726,
                                                                            columnNumber: 49
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>handleDeletePurchase(p.id),
                                                                            className: "p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-all border border-transparent hover:border-red-100",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                                className: "h-4 w-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 733,
                                                                                columnNumber: 53
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                            lineNumber: 729,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 725,
                                                                    columnNumber: 45
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                lineNumber: 724,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, p.id, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                        lineNumber: 707,
                                                        columnNumber: 37
                                                    }, this)),
                                                (!purchaseHistory || purchaseHistory.length === 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        colSpan: 6,
                                                        className: "py-20 text-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col items-center gap-3 opacity-20",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                                    className: "h-16 w-16"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 743,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-black uppercase tracking-widest",
                                                                    children: "No Procurement Records"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 744,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 742,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                        lineNumber: 741,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                    lineNumber: 740,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                            lineNumber: 705,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                    lineNumber: 694,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                lineNumber: 693,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                        lineNumber: 678,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                lineNumber: 659,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PurchaseModal, {
                showForm: showForm,
                setShowForm: setShowForm,
                handleSavePurchase: handleSavePurchase,
                suppliers: suppliers,
                products: products,
                formItems: formItems,
                setFormItems: setFormItems,
                addItem: addItem,
                removeItem: removeItem,
                isSubmitting: isSubmitting,
                onScanItem: (idx)=>{
                    setCurrentScanIdx(idx);
                    setShowScanner(true);
                },
                aiLoading: aiLoading,
                processAIInvoice: processAIInvoice,
                invoiceNo: invoiceNo,
                setInvoiceNo: setInvoiceNo,
                shipmentDate: shipmentDate,
                setShipmentDate: setShipmentDate,
                selectedSupplierId: selectedSupplierId,
                setSelectedSupplierId: setSelectedSupplierId,
                isAiSupplierMatched: isAiSupplierMatched,
                isAiInvMatched: isAiInvMatched,
                loadingText: loadingText,
                loadingSubText: loadingSubText,
                detectedInvoiceNo: detectedInvoiceNo,
                discountWarnings: discountWarnings,
                isResolveModalOpen: isResolveModalOpen,
                setIsResolveModalOpen: setIsResolveModalOpen,
                resolvingIndex: resolvingIndex,
                setResolvingIndex: setResolvingIndex,
                resolveSearch: resolveSearch,
                setResolveSearch: setResolveSearch,
                handleResolveMatch: handleResolveMatch
            }, void 0, false, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                lineNumber: 755,
                columnNumber: 13
            }, this),
            showScanner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$components$2f$expiry$2f$ExpiryScanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onClose: ()=>setShowScanner(false),
                onScanComplete: handleScanComplete
            }, void 0, false, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                lineNumber: 795,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true);
}
_s(PurchasesPage, "S2S8Xbi2AkW675vdDVVG05rD3KY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useData"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useData"]
    ];
});
_c = PurchasesPage;
function PurchaseModal({ showForm, setShowForm, handleSavePurchase, suppliers, products, formItems, setFormItems, addItem, removeItem, isSubmitting, onScanItem, aiLoading, processAIInvoice, invoiceNo, setInvoiceNo, shipmentDate, setShipmentDate, selectedSupplierId, setSelectedSupplierId, isAiSupplierMatched, isAiInvMatched, isAiDateMatched, loadingText, loadingSubText, detectedSupplierName, detectedInvoiceNo, detectedDate, discountWarnings, isResolveModalOpen, setIsResolveModalOpen, resolvingIndex, setResolvingIndex, resolveSearch, setResolveSearch, handleResolveMatch }) {
    _s1();
    const fileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handlePaste = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PurchaseModal.useCallback[handlePaste]": async (e)=>{
            const item = e.clipboardData?.items[0];
            if (item?.type.startsWith('image/') && showForm) {
                const file = item.getAsFile();
                if (file) {
                    const reader = new FileReader();
                    reader.onload = ({
                        "PurchaseModal.useCallback[handlePaste]": async (event)=>{
                            const originalBase64 = event.target?.result;
                            try {
                                const compressedBase64 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$imageUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compressImage"])(originalBase64);
                                processAIInvoice(compressedBase64);
                            } catch (err) {
                                console.error("Compression failed, using original:", err);
                                processAIInvoice(originalBase64);
                            }
                        }
                    })["PurchaseModal.useCallback[handlePaste]"];
                    reader.readAsDataURL(file);
                }
            }
        }
    }["PurchaseModal.useCallback[handlePaste]"], [
        showForm,
        processAIInvoice
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PurchaseModal.useEffect": ()=>{
            window.addEventListener('paste', handlePaste);
            return ({
                "PurchaseModal.useEffect": ()=>window.removeEventListener('paste', handlePaste)
            })["PurchaseModal.useEffect"];
        }
    }["PurchaseModal.useEffect"], [
        handlePaste
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js",
                strategy: "lazyOnload"
            }, void 0, false, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                lineNumber: 872,
                columnNumber: 13
            }, this),
            showForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-[2rem] w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-fade-in-up shadow-2xl relative border border-white/20",
                    children: [
                        aiLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "h-12 w-12 text-purple-600 animate-spin mb-4"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                    lineNumber: 881,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg font-black text-gray-800 uppercase animate-pulse",
                                    children: loadingText
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                    lineNumber: 882,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-bold text-gray-400 mt-2",
                                    children: loadingSubText
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                    lineNumber: 883,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                            lineNumber: 880,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-8 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-xl z-10 transition-all",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl font-black text-gray-900 uppercase tracking-tight",
                                            children: "New Stock Receipt"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                            lineNumber: 888,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500 font-medium text-sm",
                                            children: "Enter shipment details from invoice."
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                            lineNumber: 889,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                    lineNumber: 887,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowForm(false),
                                    className: "p-3 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "h-6 w-6"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                        lineNumber: 892,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                    lineNumber: 891,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                            lineNumber: 886,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSavePurchase,
                            className: "p-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onDragOver: (e)=>{
                                                e.preventDefault();
                                                e.currentTarget.classList.add('border-purple-500', 'bg-purple-50');
                                            },
                                            onDragLeave: (e)=>{
                                                e.preventDefault();
                                                e.currentTarget.classList.remove('border-purple-500', 'bg-purple-50');
                                            },
                                            onDrop: (e)=>{
                                                e.preventDefault();
                                                e.currentTarget.classList.remove('border-purple-500', 'bg-purple-50');
                                                const file = e.dataTransfer.files[0];
                                                if (file && file.type.startsWith('image/')) {
                                                    const reader = new FileReader();
                                                    reader.onload = async (event)=>{
                                                        const originalBase64 = event.target?.result;
                                                        try {
                                                            const compressedBase64 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$imageUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compressImage"])(originalBase64);
                                                            processAIInvoice(compressedBase64);
                                                        } catch (err) {
                                                            processAIInvoice(originalBase64);
                                                        }
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            },
                                            onClick: ()=>fileRef.current?.click(),
                                            className: "group cursor-pointer border-4 border-dashed border-gray-100 rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-4 hover:border-blue-400 hover:bg-blue-50 transition-all",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "file",
                                                    ref: fileRef,
                                                    className: "hidden",
                                                    accept: "image/*",
                                                    onChange: (e)=>{
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onload = async (event)=>{
                                                                const originalBase64 = event.target?.result;
                                                                try {
                                                                    const compressedBase64 = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$imageUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compressImage"])(originalBase64);
                                                                    processAIInvoice(compressedBase64);
                                                                } catch (err) {
                                                                    processAIInvoice(originalBase64);
                                                                }
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                    lineNumber: 923,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-5 bg-white rounded-3xl shadow-sm group-hover:scale-110 transition-transform",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                        className: "h-8 w-8 text-blue-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                        lineNumber: 940,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                    lineNumber: 939,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-black text-gray-900 uppercase text-xs tracking-widest",
                                                            children: "Drop Invoice Image or Paste (Ctrl+V)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 943,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-400 text-[10px] font-bold mt-1 uppercase",
                                                            children: "AI will automatically fill the form below"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 944,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                    lineNumber: 942,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                            lineNumber: 899,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid md:grid-cols-3 gap-6 mb-10 mt-10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "text-[10px] font-black text-purple-600 uppercase tracking-widest flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                            lineNumber: 953,
                                                                            columnNumber: 49
                                                                        }, this),
                                                                        " Supplier Entity"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 952,
                                                                    columnNumber: 45
                                                                }, this),
                                                                isAiSupplierMatched ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[8px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full animate-pulse uppercase",
                                                                    children: "✨ AI Matched"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 956,
                                                                    columnNumber: 49
                                                                }, this) : detectedSupplierName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[8px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full animate-pulse uppercase",
                                                                    children: [
                                                                        "✨ New Supplier: ",
                                                                        detectedSupplierName
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 958,
                                                                    columnNumber: 49
                                                                }, this) : null
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 951,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: selectedSupplierId,
                                                            onChange: (e)=>setSelectedSupplierId(e.target.value),
                                                            className: "w-full h-14 bg-gray-50/50 border border-gray-100 rounded-[1.25rem] px-6 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-purple-500/10 transition-all outline-none",
                                                            required: true,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: "Choose Supplier"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 967,
                                                                    columnNumber: 45
                                                                }, this),
                                                                suppliers?.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: s.id,
                                                                        children: s.name || s.id
                                                                    }, s.id, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 968,
                                                                        columnNumber: 73
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 961,
                                                            columnNumber: 41
                                                        }, this),
                                                        detectedSupplierName && !selectedSupplierId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-2 p-3 bg-purple-50 border border-purple-100 rounded-xl flex items-center gap-2 animate-bounce-subtle",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-black text-purple-600 uppercase",
                                                                    children: "Detected:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 973,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm font-bold text-gray-900",
                                                                    children: detectedSupplierName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 974,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 972,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                    lineNumber: 950,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "text-[10px] font-black text-purple-600 uppercase tracking-widest flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                            lineNumber: 981,
                                                                            columnNumber: 49
                                                                        }, this),
                                                                        " Invoice Reference"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 980,
                                                                    columnNumber: 45
                                                                }, this),
                                                                isAiInvMatched && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[8px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full animate-pulse uppercase",
                                                                    children: "✨ AI Read"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 984,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 979,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            value: invoiceNo,
                                                            onChange: (e)=>setInvoiceNo(e.target.value),
                                                            placeholder: "e.g. INV-2024-001",
                                                            className: "w-full h-14 bg-gray-50/50 border border-gray-100 rounded-[1.25rem] px-6 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-purple-500/10 transition-all outline-none",
                                                            required: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 987,
                                                            columnNumber: 41
                                                        }, this),
                                                        detectedInvoiceNo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-2 p-2 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[8px] font-black text-blue-600 uppercase",
                                                                    children: "Detected:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 996,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-bold text-gray-700",
                                                                    children: detectedInvoiceNo
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 997,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 995,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                    lineNumber: 978,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    className: "text-[10px] font-black text-purple-600 uppercase tracking-widest flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                            className: "h-3 w-3"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                            lineNumber: 1004,
                                                                            columnNumber: 49
                                                                        }, this),
                                                                        " Shipment Date"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 1003,
                                                                    columnNumber: 45
                                                                }, this),
                                                                isAiDateMatched && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[8px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full animate-pulse uppercase",
                                                                    children: "✨ AI Read"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 1007,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 1002,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "date",
                                                            value: shipmentDate,
                                                            onChange: (e)=>setShipmentDate(e.target.value),
                                                            className: "w-full h-14 bg-gray-50/50 border border-gray-100 rounded-[1.25rem] px-6 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-purple-500/10 transition-all outline-none",
                                                            required: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 1010,
                                                            columnNumber: 41
                                                        }, this),
                                                        detectedDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-2 p-2 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[8px] font-black text-blue-600 uppercase",
                                                                    children: "Detected:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 1019,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-bold text-gray-700",
                                                                    children: detectedDate
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                    lineNumber: 1020,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 1018,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                    lineNumber: 1001,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                            lineNumber: 949,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                    lineNumber: 898,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4 mb-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between px-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                    children: "Inventory Line Items"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                    lineNumber: 1028,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                    children: [
                                                        "Total Items: ",
                                                        formItems.length
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                    lineNumber: 1029,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                            lineNumber: 1027,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: [
                                                formItems.map((item, idx)=>{
                                                    const qty = parseFloat(item.quantity) || 0;
                                                    const bonus = parseFloat(item.bonusQty) || 0;
                                                    const price = parseFloat(item.purchasePrice) || 0;
                                                    const totalQty = qty + bonus;
                                                    // Discount & Tax Logic (Explicitly from state)
                                                    const discountPercent = parseFloat(item.discountPercent) || 0;
                                                    const taxPercent = parseFloat(item.taxPercent) || 0;
                                                    const grossAmount = qty * price;
                                                    const discountAmount = grossAmount * discountPercent / 100;
                                                    const taxableAmount = grossAmount - discountAmount;
                                                    const taxAmount = taxableAmount * taxPercent / 100;
                                                    const netAmount = taxableAmount + taxAmount;
                                                    const effectiveCost = totalQty > 0 ? (netAmount / totalQty).toFixed(2) : "0.00";
                                                    // Discount Warning Logic
                                                    const discountWarning = discountWarnings[idx];
                                                    // Confidence-based styling
                                                    const confidence = item.confidence || 100;
                                                    const needsReview = item.needsReview || confidence < 70;
                                                    let confidenceBorderColor = 'border-green-200';
                                                    let confidenceBgColor = 'bg-green-50/30';
                                                    let confidenceTextColor = 'text-green-600';
                                                    let confidenceIcon = '✅';
                                                    if (confidence < 50) {
                                                        confidenceBorderColor = 'border-red-300';
                                                        confidenceBgColor = 'bg-red-50/50';
                                                        confidenceTextColor = 'text-red-600';
                                                        confidenceIcon = '⚠️';
                                                    } else if (confidence < 70) {
                                                        confidenceBorderColor = 'border-yellow-300';
                                                        confidenceBgColor = 'bg-yellow-50/50';
                                                        confidenceTextColor = 'text-yellow-600';
                                                        confidenceIcon = '⚡';
                                                    }
                                                    const cardBaseClass = `bg-gray-50/50 p-6 rounded-[2.5rem] border-2 animate-fade-in group hover:shadow-xl hover:shadow-purple-500/5 transition-all`;
                                                    const warningClass = discountWarning && !item.isWarningDismissed ? 'border-orange-400 bg-orange-50/30 ring-4 ring-orange-500/5' : item.isAiSuggested ? confidenceBorderColor : 'border-gray-100';
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `${cardBaseClass} ${warningClass} ${item.isAiSuggested && needsReview ? confidenceBgColor : ''}`,
                                                        children: [
                                                            item.alert && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-pulse",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                                        className: "h-5 w-5 text-red-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1084,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs font-bold text-red-700",
                                                                        children: item.alert
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1085,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                lineNumber: 1083,
                                                                columnNumber: 53
                                                            }, this),
                                                            item.isAiSuggested && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between mb-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[8px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full animate-pulse uppercase",
                                                                                children: "✨ AI Suggested"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1093,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: `text-[8px] font-black ${confidenceTextColor} ${confidenceBgColor} px-2 py-0.5 rounded-full uppercase`,
                                                                                children: [
                                                                                    confidenceIcon,
                                                                                    " ",
                                                                                    confidence,
                                                                                    "% Confidence"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1094,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            item.extractionMethod && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[8px] font-black text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full uppercase",
                                                                                children: item.extractionMethod
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1098,
                                                                                columnNumber: 65
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1092,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    needsReview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[8px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full uppercase animate-pulse",
                                                                        children: "👁️ Please Review"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1104,
                                                                        columnNumber: 61
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                lineNumber: 1091,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid md:grid-cols-12 gap-4 items-end mb-6",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-2 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                                                children: "Item Code"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1114,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                value: item.itemCode || "",
                                                                                onChange: (e)=>{
                                                                                    const newItems = [
                                                                                        ...formItems
                                                                                    ];
                                                                                    newItems[idx].itemCode = e.target.value;
                                                                                    // Auto-select product if item code matches
                                                                                    const matchedProd = products?.find((p)=>p.item_code === e.target.value);
                                                                                    if (matchedProd) {
                                                                                        newItems[idx].productId = matchedProd.id;
                                                                                        newItems[idx].name = matchedProd.name;
                                                                                    }
                                                                                    setFormItems(newItems);
                                                                                },
                                                                                placeholder: "e.g. ITEM001",
                                                                                className: "w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-xs font-bold focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1115,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1113,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-3 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center justify-between",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                                                    children: "Medicine Name"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                    lineNumber: 1136,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1135,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "relative",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                        value: item.name || "",
                                                                                        list: `products-list-${idx}`,
                                                                                        onChange: (e)=>{
                                                                                            const newItems = [
                                                                                                ...formItems
                                                                                            ];
                                                                                            const val = e.target.value;
                                                                                            newItems[idx].name = val;
                                                                                            // Try to match product by name exactly
                                                                                            const matchedProd = products?.find((p)=>p.name === val);
                                                                                            if (matchedProd) {
                                                                                                newItems[idx].productId = matchedProd.id;
                                                                                                newItems[idx].itemCode = matchedProd.item_code;
                                                                                                newItems[idx].matchingStatus = "matched";
                                                                                            } else {
                                                                                                newItems[idx].productId = ""; // New product
                                                                                                newItems[idx].matchingStatus = "unmatched";
                                                                                                newItems[idx].tempScannedName = val; // Store for resolution modal
                                                                                            }
                                                                                            setFormItems(newItems);
                                                                                        },
                                                                                        placeholder: "Type or Select Medicine",
                                                                                        className: `w-full h-12 border-2 ${item.matchingStatus === "unmatched" ? 'border-blue-200 bg-blue-50/30' : !item.productId && !item.name ? 'border-red-300 bg-red-50 animate-pulse' : needsReview ? confidenceBorderColor + ' ' + confidenceBgColor : 'border-gray-200 bg-white'} rounded-xl px-4 text-xs font-bold focus:ring-4 focus:ring-purple-500/10 transition-all outline-none`
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1139,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    item.matchingStatus === "matched" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                                                                className: "h-3.5 w-3.5 text-purple-600 animate-pulse"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                                lineNumber: 1166,
                                                                                                columnNumber: 69
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-[8px] font-black text-purple-600 uppercase tracking-tighter",
                                                                                                children: "Matched"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                                lineNumber: 1167,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1165,
                                                                                        columnNumber: 65
                                                                                    }, this),
                                                                                    item.matchingStatus === "unmatched" && item.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "h-2 w-2 bg-blue-500 rounded-full animate-ping"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                                lineNumber: 1172,
                                                                                                columnNumber: 69
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-[8px] font-black text-blue-600 uppercase tracking-tighter",
                                                                                                children: "Auto-Creating"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                                lineNumber: 1173,
                                                                                                columnNumber: 69
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1171,
                                                                                        columnNumber: 65
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("datalist", {
                                                                                        id: `products-list-${idx}`,
                                                                                        children: [
                                                                                            !item.productId && item.tempScannedName && products?.map((p)=>({
                                                                                                    ...p,
                                                                                                    score: getSimilarity(p.name, item.tempScannedName)
                                                                                                })).filter((p)=>p.score > 0.3).sort((a, b)=>b.score - a.score).slice(0, 3).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                                    value: p.name,
                                                                                                    children: [
                                                                                                        "⚡ Suggestion: ",
                                                                                                        p.name
                                                                                                    ]
                                                                                                }, `ai-${p.id}`, true, {
                                                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                                    lineNumber: 1185,
                                                                                                    columnNumber: 77
                                                                                                }, this)),
                                                                                            products?.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                                    value: p.name,
                                                                                                    children: [
                                                                                                        p.name,
                                                                                                        " (",
                                                                                                        p.item_code,
                                                                                                        ")"
                                                                                                    ]
                                                                                                }, p.id, true, {
                                                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                                    lineNumber: 1190,
                                                                                                    columnNumber: 69
                                                                                                }, this))
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1177,
                                                                                        columnNumber: 61
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1138,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            item.detected?.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-1 px-2 py-1 bg-purple-50 rounded-lg flex items-center gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-[7px] font-black text-purple-600 uppercase",
                                                                                        children: "Detected:"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1198,
                                                                                        columnNumber: 65
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-[10px] font-bold text-gray-600 truncate",
                                                                                        children: item.detected.name
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1199,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1197,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1134,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-3 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                                                children: "Batch Number"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1204,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "relative",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                        value: item.batchNo || "",
                                                                                        onChange: (e)=>{
                                                                                            const n = [
                                                                                                ...formItems
                                                                                            ];
                                                                                            n[idx].batchNo = e.target.value;
                                                                                            setFormItems(n);
                                                                                        },
                                                                                        onBlur: (e)=>{
                                                                                            const batchNo = e.target.value.trim();
                                                                                            if (!batchNo) return;
                                                                                            const allBatches = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('batches', []);
                                                                                            const existingBatch = allBatches.find((b)=>b.batchNo === batchNo);
                                                                                            if (existingBatch) {
                                                                                                const n = [
                                                                                                    ...formItems
                                                                                                ];
                                                                                                n[idx].mfgDate = existingBatch.mfgDate || "";
                                                                                                n[idx].expiryDate = existingBatch.expiryDate || "";
                                                                                                setFormItems(n);
                                                                                            }
                                                                                        },
                                                                                        placeholder: "Batch",
                                                                                        className: `w-full h-12 bg-white border ${item.batchNo && !item.expiryDate ? 'border-orange-300 ring-4 ring-orange-500/5' : 'border-gray-200'} rounded-xl px-4 text-xs font-bold pr-10 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none`
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1206,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        type: "button",
                                                                                        onClick: ()=>onScanItem(idx),
                                                                                        className: `absolute right-2 top-1/2 -translate-y-1/2 p-1.5 ${item.batchNo && !item.expiryDate ? 'bg-orange-50 text-orange-600 animate-pulse' : 'hover:bg-purple-50 text-purple-600'} rounded-lg transition-all`,
                                                                                        title: item.batchNo && !item.expiryDate ? "Expiry Missing: Click to Scan Carton" : "Scan Batch/Expiry",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scan$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ScanLine$3e$__["ScanLine"], {
                                                                                            className: "h-4 w-4"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                            lineNumber: 1230,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1224,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    item.batchNo && !item.expiryDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "absolute -top-7 left-0 flex items-center gap-1 text-[8px] font-black text-orange-600 uppercase animate-bounce",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                                                                className: "h-2.5 w-2.5"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                                lineNumber: 1234,
                                                                                                columnNumber: 69
                                                                                            }, this),
                                                                                            " Expiry Missing - Scan Carton"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1233,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1205,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            item.detected?.batchNo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-1 px-2 py-1 bg-gray-50 rounded-lg flex items-center gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-[7px] font-black text-gray-400 uppercase",
                                                                                        children: "Detected:"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1240,
                                                                                        columnNumber: 65
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-[10px] font-bold text-gray-600",
                                                                                        children: item.detected.batchNo
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1241,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1239,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1203,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-2 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                                                children: "MFG Date"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1246,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "date",
                                                                                value: item.mfgDate || "",
                                                                                onChange: (e)=>{
                                                                                    const n = [
                                                                                        ...formItems
                                                                                    ];
                                                                                    n[idx].mfgDate = e.target.value;
                                                                                    setFormItems(n);
                                                                                },
                                                                                className: "w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-xs font-bold focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1247,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1245,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-2 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[10px] font-black text-gray-400 uppercase tracking-widest",
                                                                                children: "Expiry Date"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1250,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "date",
                                                                                value: item.expiryDate || "",
                                                                                onChange: (e)=>{
                                                                                    const n = [
                                                                                        ...formItems
                                                                                    ];
                                                                                    n[idx].expiryDate = e.target.value;
                                                                                    setFormItems(n);
                                                                                },
                                                                                className: "w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-xs font-bold focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1251,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1249,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-2 space-y-2 text-right",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block",
                                                                                children: "Action"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1254,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                onClick: ()=>removeItem(idx),
                                                                                className: "h-12 px-6 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all font-black text-xs uppercase",
                                                                                children: "Remove"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1255,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1253,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                lineNumber: 1112,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid md:grid-cols-12 gap-4 items-center pt-6 border-t border-gray-100",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-1 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center justify-between",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                        className: "text-[10px] font-black text-blue-500 uppercase",
                                                                                        children: "Purch Qty"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1269,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    item.isAiSuggested && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-[8px] text-purple-600 font-bold",
                                                                                        children: "✨"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1270,
                                                                                        columnNumber: 84
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1268,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "number",
                                                                                value: item.quantity ?? 0,
                                                                                onChange: (e)=>{
                                                                                    const n = [
                                                                                        ...formItems
                                                                                    ];
                                                                                    n[idx].quantity = e.target.value;
                                                                                    setFormItems(n);
                                                                                },
                                                                                className: `w-full h-11 bg-blue-50/50 border ${!item.quantity || item.quantity == 0 ? 'border-red-400 ring-2 ring-red-200 animate-pulse' : 'border-blue-100'} rounded-xl px-4 text-xs font-black text-blue-700 focus:bg-white transition-all outline-none`
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1272,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            (!item.quantity || item.quantity == 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-[8px] font-black text-red-500 uppercase tracking-tighter",
                                                                                children: "⚠️ Req"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1278,
                                                                                columnNumber: 100
                                                                            }, this),
                                                                            item.detected?.qty !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-1 text-[8px] font-black text-blue-500 text-center uppercase tracking-tighter",
                                                                                children: [
                                                                                    "AI: ",
                                                                                    item.detected.qty
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1280,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1267,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-1 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[10px] font-black text-green-500 uppercase",
                                                                                children: "Bonus"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1284,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "number",
                                                                                value: item.bonusQty ?? 0,
                                                                                onChange: (e)=>{
                                                                                    const n = [
                                                                                        ...formItems
                                                                                    ];
                                                                                    n[idx].bonusQty = e.target.value;
                                                                                    setFormItems(n);
                                                                                },
                                                                                className: "w-full h-11 bg-green-50/50 border border-green-100 rounded-xl px-4 text-xs font-black text-green-700 focus:bg-white transition-all outline-none"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1285,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            item.detected?.bonus !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-1 text-[8px] font-black text-green-500 text-center uppercase tracking-tighter",
                                                                                children: [
                                                                                    "AI: ",
                                                                                    item.detected.bonus
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1287,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1283,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-1 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[10px] font-black text-gray-400 uppercase",
                                                                                children: "Total Qty"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1291,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "h-11 flex items-center px-4 bg-gray-100 rounded-xl text-xs font-black text-gray-600",
                                                                                children: totalQty
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1292,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            item.detected?.qty !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-1 text-[8px] font-black text-gray-400 text-center uppercase tracking-tighter",
                                                                                children: [
                                                                                    "AI: ",
                                                                                    item.detected.qty + (item.detected.bonus || 0)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1294,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1290,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-2 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center justify-between",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                        className: "text-[10px] font-black text-purple-500 uppercase",
                                                                                        children: "Unit Price (Rate)"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1299,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    item.isAiSuggested && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-[8px] text-purple-600 font-bold",
                                                                                        children: "✨"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1300,
                                                                                        columnNumber: 84
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1298,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "number",
                                                                                value: item.purchasePrice ?? 0,
                                                                                onChange: (e)=>{
                                                                                    const n = [
                                                                                        ...formItems
                                                                                    ];
                                                                                    n[idx].purchasePrice = e.target.value;
                                                                                    setFormItems(n);
                                                                                },
                                                                                className: "w-full h-11 bg-purple-50/50 border border-purple-100 rounded-xl px-4 text-xs font-black text-purple-700 focus:bg-white transition-all outline-none"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1302,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            item.detected?.rate !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-1 text-[8px] font-black text-purple-500 text-center uppercase tracking-tighter",
                                                                                children: [
                                                                                    "AI: ",
                                                                                    item.detected.rate
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1304,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1297,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-1 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center justify-between",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: `text-[10px] font-black ${discountWarning && !item.isWarningDismissed ? 'text-orange-600 animate-pulse' : 'text-orange-500'} uppercase flex items-center gap-1`,
                                                                                    children: [
                                                                                        "Disc % ",
                                                                                        discountWarning && !item.isWarningDismissed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                                                            className: "h-3 w-3"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                            lineNumber: 1311,
                                                                                            columnNumber: 122
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                    lineNumber: 1310,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1309,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "relative",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                        type: "number",
                                                                                        value: item.discountPercent ?? 0,
                                                                                        onChange: (e)=>{
                                                                                            const n = [
                                                                                                ...formItems
                                                                                            ];
                                                                                            n[idx].discountPercent = e.target.value;
                                                                                            setFormItems(n);
                                                                                        },
                                                                                        className: `w-full h-11 ${discountWarning && !item.isWarningDismissed ? 'bg-orange-50 border-orange-300 text-orange-700' : 'bg-orange-50/50 border-orange-100 text-orange-700'} border rounded-xl px-4 text-xs font-black focus:bg-white transition-all outline-none`
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1315,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    discountWarning && !item.isWarningDismissed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "absolute -top-12 left-0 w-56 p-3 bg-orange-600 text-white text-[9px] font-bold rounded-xl shadow-2xl z-20 animate-fade-in pointer-events-auto flex flex-col gap-2 border border-orange-400",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "flex items-start justify-between gap-2",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    children: [
                                                                                                        discountWarning.message,
                                                                                                        " (Avg: ",
                                                                                                        discountWarning.avg,
                                                                                                        "%)"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                                    lineNumber: 1328,
                                                                                                    columnNumber: 73
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                                    type: "button",
                                                                                                    onClick: ()=>{
                                                                                                        const n = [
                                                                                                            ...formItems
                                                                                                        ];
                                                                                                        n[idx].isWarningDismissed = true;
                                                                                                        setFormItems(n);
                                                                                                    },
                                                                                                    className: "px-2 py-1 bg-white/20 hover:bg-white/40 rounded-lg text-[8px] uppercase tracking-tighter transition-colors",
                                                                                                    children: "Dismiss Alert"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                                    lineNumber: 1329,
                                                                                                    columnNumber: 73
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                            lineNumber: 1327,
                                                                                            columnNumber: 69
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                        lineNumber: 1326,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1314,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            item.detected?.discountPercent !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-1 text-[8px] font-black text-orange-500 text-center uppercase tracking-tighter",
                                                                                children: [
                                                                                    "AI: ",
                                                                                    item.detected.discountPercent,
                                                                                    "%"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1345,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1308,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-1 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[10px] font-black text-red-500 uppercase",
                                                                                children: "Tax %"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1350,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "number",
                                                                                value: item.taxPercent ?? 0,
                                                                                onChange: (e)=>{
                                                                                    const n = [
                                                                                        ...formItems
                                                                                    ];
                                                                                    n[idx].taxPercent = e.target.value;
                                                                                    setFormItems(n);
                                                                                },
                                                                                className: "w-full h-11 bg-red-50/50 border border-red-100 rounded-xl px-2 text-xs font-black text-red-700 focus:bg-white transition-all outline-none text-center"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1351,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            (item.detected?.taxPercent !== undefined || item.detected?.tax !== undefined) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-1 text-[8px] font-black text-red-500 text-center uppercase tracking-tighter",
                                                                                children: [
                                                                                    "AI: ",
                                                                                    item.detected?.taxPercent || item.detected?.tax,
                                                                                    "%"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1362,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1349,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-2 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[10px] font-black text-gray-400 uppercase",
                                                                                children: "Net Amount"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1367,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "h-11 flex items-center px-4 bg-gray-50 rounded-xl text-xs font-black text-gray-700",
                                                                                children: netAmount.toFixed(2)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1368,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            item.detected?.net !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-1 text-[8px] font-black text-gray-400 text-center uppercase tracking-tighter",
                                                                                children: [
                                                                                    "AI Net: ",
                                                                                    item.detected.net.toFixed(2)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1372,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1366,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-2 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[10px] font-black text-gray-400 uppercase",
                                                                                children: "Eff. Cost / Unit"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1377,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "h-11 flex items-center px-4 bg-yellow-50 text-yellow-700 border border-yellow-100 rounded-xl text-xs font-black",
                                                                                children: effectiveCost
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1378,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1376,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "md:col-span-2 space-y-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                className: "text-[10px] font-black text-gray-400 uppercase",
                                                                                children: "Remarks / Scheme"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1384,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "text",
                                                                                value: item.remarks || "",
                                                                                onChange: (e)=>{
                                                                                    const n = [
                                                                                        ...formItems
                                                                                    ];
                                                                                    n[idx].remarks = e.target.value;
                                                                                    setFormItems(n);
                                                                                },
                                                                                placeholder: "e.g. 10% Off",
                                                                                className: "w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-xs font-bold focus:bg-white transition-all outline-none"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1385,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            item.detected?.discount !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "mt-1 text-[8px] font-black text-orange-500 text-center uppercase tracking-tighter",
                                                                                children: [
                                                                                    "AI Disc: ",
                                                                                    item.detected.discount,
                                                                                    "%"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                                lineNumber: 1387,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                        lineNumber: 1383,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                                lineNumber: 1266,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, idx, true, {
                                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                        lineNumber: 1080,
                                                        columnNumber: 45
                                                    }, this);
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: addItem,
                                                    className: "w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                            lineNumber: 1400,
                                                            columnNumber: 41
                                                        }, this),
                                                        " Add Manual Item"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                    lineNumber: 1395,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                            lineNumber: 1032,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                    lineNumber: 1026,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "sticky bottom-0 bg-white/80 backdrop-blur-xl p-8 border-t border-gray-100 -mx-8 -mb-8 rounded-b-[2rem]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: isSubmitting,
                                        className: "w-full h-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-purple-200 hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed",
                                        children: [
                                            isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "h-5 w-5 animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                lineNumber: 1412,
                                                columnNumber: 41
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Hospital__Dashboard$2f$hospital$2d$dashboard$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                                lineNumber: 1414,
                                                columnNumber: 41
                                            }, this),
                                            isSubmitting ? 'Recording Shipment...' : 'Confirm & Save Stock Record'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                        lineNumber: 1406,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                                    lineNumber: 1405,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                            lineNumber: 896,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                    lineNumber: 878,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/Hospital Dashboard/hospital-dashboard/app/purchases/page.tsx",
                lineNumber: 877,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true);
}
_s1(PurchaseModal, "8va3vhib6d8slqkF4XCYjRQXIUQ=");
_c1 = PurchaseModal;
var _c, _c1;
__turbopack_context__.k.register(_c, "PurchasesPage");
__turbopack_context__.k.register(_c1, "PurchaseModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_Hospital%20Dashboard_hospital-dashboard_b1290d88._.js.map