import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: {
                aliases: true,
                productSuppliers: {
                    include: {
                        supplier: true
                    }
                },
                batches: {
                    orderBy: { expiryDate: 'asc' },
                    include: {
                        supplier: true
                    }
                }
            },
            orderBy: { id: 'desc' }
        });

        return NextResponse.json(products);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, brand, category, purchasePrice, salePrice, item_code } = body;

        const product = await prisma.product.create({
            data: {
                name,
                brand: brand || "Unknown Brand",
                category: category || "Others",
                purchasePrice: Number(purchasePrice) || 0,
                salePrice: Number(salePrice) || 0,
                item_code: item_code || `PRD-${Date.now().toString().slice(-5)}`,
                stock: 0,
                unitsPerPack: 1
            }
        });

        return NextResponse.json(product);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
