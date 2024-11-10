import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    const products = await prisma.product.findMany();
    return NextResponse.json(products)
}

// คุณสามารถเพิ่ม POST ฟังก์ชันถ้าต้องการสร้างผลิตภัณฑ์ใหม่
export async function POST(req: Request) {
  try {
    const { name, description, price, category, image, stock } = await req.json();
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        image,
        stock,
      },
    });
    return new NextResponse(JSON.stringify(newProduct), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return new NextResponse('Failed to create product', {
      status: 500,
    });
  }
}
