import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Clear existing data
    await prisma.alert.deleteMany()
    await prisma.purchaseItem.deleteMany()
    await prisma.purchase.deleteMany()
    await prisma.saleItem.deleteMany()
    await prisma.sale.deleteMany()
    await prisma.batch.deleteMany()
    await prisma.product.deleteMany()
    await prisma.supplier.deleteMany()
    await prisma.transfer.deleteMany()
    await prisma.user.deleteMany()
    await prisma.branch.deleteMany()
    await prisma.settings.deleteMany()

    // Seed Branches
    const b1 = await prisma.branch.create({
        data: { name: "Bahadurabad", location: "Main Shop", type: "Main" }
    })
    const b2 = await prisma.branch.create({
        data: { name: "Gulshan", location: "Pharmacy Area", type: "Pharmacy" }
    })
    const b3 = await prisma.branch.create({
        data: { name: "Nazimabad", location: "West Block", type: "Pharmacy" }
    })

    // Seed Suppliers
    const s1 = await prisma.supplier.create({
        data: { name: "PharmaCo Ltd", phone: "+92 300 1234567", email: "order@pharmaco.pk", address: "Karachi, Pakistan", totalOrders: 45 }
    })
    const s2 = await prisma.supplier.create({
        data: { name: "MediSupply Inc", phone: "+92 301 2345678", email: "sales@medisupply.com", address: "Lahore, Pakistan", totalOrders: 32 }
    })

    // Seed Products & Batches
    const p1 = await prisma.product.create({
        data: {
            name: "Panadol Extra",
            brand: "GSK",
            category: "Pain Relief",
            purchasePrice: 40,
            salePrice: 50,
            stock: 120,
            unitsPerPack: 20,
            batches: {
                create: [
                    { batchNo: "BATCH-001", expiryDate: new Date("2024-12-01"), quantity: 70, branchId: b1.id },
                    { batchNo: "BATCH-002", expiryDate: new Date("2025-03-15"), quantity: 50, branchId: b1.id },
                ]
            }
        }
    })

    const p2 = await prisma.product.create({
        data: {
            name: "Augmentin 625mg",
            brand: "GSK",
            category: "Antibiotics",
            purchasePrice: 280,
            salePrice: 340,
            stock: 45,
            unitsPerPack: 6,
            batches: {
                create: [
                    { batchNo: "BATCH-003", expiryDate: new Date("2024-10-15"), quantity: 45, branchId: b1.id },
                ]
            }
        }
    })

    const p3 = await prisma.product.create({
        data: {
            name: "Brufen Syrup",
            brand: "Abbott",
            category: "Pain Relief",
            purchasePrice: 95,
            salePrice: 120,
            stock: 80,
            unitsPerPack: 1,
            batches: {
                create: [
                    { batchNo: "BATCH-004", expiryDate: new Date("2025-01-20"), quantity: 80, branchId: b1.id },
                ]
            }
        }
    })

    // Seed some initial Sales for variety
    await prisma.sale.create({
        data: {
            invoiceNo: "INV-665544",
            date: new Date().toISOString(),
            total: 500,
            discount: 0,
            paidAmount: 500,
            changeAmount: 0,
            branchId: b2.id, // Gulshan
            soldBy: "Gulshan Staff",
            items: {
                create: [
                    { productId: p1.id, name: p1.name, quantity: 10, pricePerUnit: 50, batch: "BATCH-001" }
                ]
            }
        }
    })

    // Seed Settings
    await prisma.settings.create({
        data: {
            pharmacyName: "HealthPlus Pharmacy",
            ownerName: "Admin User",
            phone: "+92 300 1234567",
            email: "admin@healthplus.pk",
            address: "Main Market, Block 5, Karachi"
        }
    })

    // Seed some Alerts
    await prisma.alert.createMany({
        data: [
            { type: "expiry", title: "Panadol Extra - Batch BATCH-001", message: "Batch expiring in 30 days", severity: "critical", branchId: b1.id },
            { type: "stock", title: "Augmentin 625mg", message: "Low stock alert", severity: "warning", branchId: b1.id },
        ]
    })

    // Seed Users
    await prisma.user.create({
        data: { name: "Owner Admin", email: "owner@hospital.com", role: "Admin", branchId: b1.id }
    })
    await prisma.user.create({
        data: { name: "Gulshan Staff", email: "staff@gulshan.com", role: "Staff", branchId: b2.id }
    })

    console.log("Seed data planted successfully! 🌱")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
