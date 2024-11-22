import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    const products = await prisma.product.findMany();
    return Response.json(products)
}

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
    return new Response(JSON.stringify(newProduct), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return new Response('Failed to create product', {
      status: 500,
    });
  }
}
