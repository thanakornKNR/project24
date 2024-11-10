import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

// สร้าง PrismaClient สำหรับเชื่อมต่อกับฐานข้อมูล
const prisma = new PrismaClient();

// GET function ดึงข้อมูลผลิตภัณฑ์ตาม ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // ใช้ params จาก context
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) }, // ใช้ id ที่ได้จาก params และแปลงเป็น number
    });

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ message: 'Failed to fetch product' }, { status: 500 });
  }
}

// POST function สำหรับสร้างผลิตภัณฑ์ใหม่
export async function POST(request: Request) {
  try {
    const { name, description, price, category, image, stock } = await request.json();
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
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return new NextResponse('Failed to create product', {
      status: 500,
    });
  }
}
