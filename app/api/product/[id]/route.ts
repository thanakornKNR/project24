import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET function สำหรับดึงข้อมูลผลิตภัณฑ์ตาม ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;  // ใช้ params จาก context
        const productId = Number(id);

        if (isNaN(productId)) throw new Error("Invalid product ID");

        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
        });

        if (!product) {
            return new Response("Product not found", { status: 404 });
        }

        return new Response(JSON.stringify(product), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        return new Response("Failed to fetch product", { status: 500 });
    }
}

// PUT function สำหรับอัพเดตผลิตภัณฑ์ตาม ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;  // ใช้ params จาก context
        const productId = Number(id);

        if (isNaN(productId)) throw new Error("Invalid product ID");

        const { name, description, price, category, image, stock } = await req.json();

        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: {
                name,
                description,
                price,
                category,
                image,
                stock,
            },
        });

        return new Response(JSON.stringify(updatedProduct), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error updating product:", error);
        return new Response("Failed to update product", { status: 500 });
    }
}

// DELETE function สำหรับลบผลิตภัณฑ์ตาม ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;  // ใช้ params จาก context
        const productId = Number(id);

        if (isNaN(productId)) throw new Error("Invalid product ID");

        const deletedProduct = await prisma.product.delete({
            where: { id: productId },
        });

        return new Response(JSON.stringify(deletedProduct), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        return new Response("Failed to delete product", { status: 500 });
    }
}
