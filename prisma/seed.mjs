import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  
  
  const products = await prisma.product.createMany({
    data: [
        {
            "id":1,
            "name": "Sour Diesel",
            "description": "สายพันธุ์ที่มีความเข้มข้นสูง มีความหอมและกลิ่นที่เป็นเอกลักษณ์",
            "price": 250.00,
            "category": "Flower",
            "image": "https://example.com/images/sour-diesel.jpg",
            "stock": 100,
            "soldCount": 0
          },
          {
            "id":2,
            "name": "OG Kush",
            "description": "กัญชาสายพันธุ์ยอดนิยมที่มีรสชาติอันโดดเด่นและคุณสมบัติช่วยให้ผ่อนคลาย",
            "price": 300.00,
            "category": "Flower",
            "image": "https://example.com/images/og-kush.jpg",
            "stock": 75,
            "soldCount": 0
          },
          {
            "id":3,
            "name": "Gelato",
            "description": "สายพันธุ์ที่มีรสหวานและกลิ่นหอมเหมือนไอศกรีม เป็นที่ชื่นชอบในหมู่นักสูบ",
            "price": 350.00,
            "category": "Flower",
            "image": "https://example.com/images/gelato.jpg",
            "stock": 50,
            "soldCount": 0
          }
    ],
  });
  


  console.log('Created products:', products);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
