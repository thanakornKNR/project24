import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// สร้าง PrismaClient สำหรับเชื่อมต่อกับฐานข้อมูล
const prisma = new PrismaClient();

// GET function ดึงข้อมูลผลิตภัณฑ์ตาม ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const productId = Number(params.id);

    if (isNaN(productId)) throw new Error("Invalid product ID");

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ message: "Failed to fetch product" }, { status: 500 });
  }
}

// PUT function สำหรับอัปเดตผลิตภัณฑ์ตาม ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const productId = Number(params.id);

    if (isNaN(productId)) throw new Error("Invalid product ID");

    const { name, description, price, category, image, stock } = await req.json();

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { name, description, price, category, image, stock },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ message: "Failed to update product" }, { status: 500 });
  }
}

// DELETE function สำหรับลบผลิตภัณฑ์ตาม ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const productId = Number(params.id);

    if (isNaN(productId)) throw new Error("Invalid product ID");

    const deletedProduct = await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ message: "Failed to delete product" }, { status: 500 });
  }
}
