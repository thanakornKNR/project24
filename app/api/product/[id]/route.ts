/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET function
export async function GET(request: Request, context: any) {
  try {
    const productId = parseInt(context.params.id, 10);

    if (isNaN(productId)) {
      return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
    }

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
export async function PUT(request: Request, context: any) {
  try {
    const productId = parseInt(context.params.id, 10);

    if (isNaN(productId)) {
      return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
    }

    const { name, description, price, category, image, stock } = await request.json();

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
export async function DELETE(request: Request, context: any) {
  try {
    const productId = parseInt(context.params.id, 10);

    if (isNaN(productId)) {
      return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
    }

    const deletedProduct = await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ message: "Failed to delete product" }, { status: 500 });
  }
}
