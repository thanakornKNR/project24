import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// กำหนด interface สำหรับ context เพื่อกำหนดประเภทของ params
interface Context {
  params: {
    id: string;
  };
}

// GET function
export async function GET(req: Request, context: Context) {
  try {
    const productId = Number(context.params.id);

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

// PUT function
export async function PUT(req: Request, context: Context) {
  try {
    const productId = Number(context.params.id);

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

// DELETE function
export async function DELETE(req: Request, context: Context) {
  try {
    const productId = Number(context.params.id);

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
