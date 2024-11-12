# ใช้ Node.js image ที่เป็น Alpine Linux เพื่อความเบาและมีประสิทธิภาพ
FROM node:18-alpine


# กำหนด working directory ภายในคอนเทนเนอร์
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json (หรือ yarn.lock)
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์ทั้งหมดจากโปรเจค
COPY . .

# รอให้ PostgreSQL container พร้อมก่อนการ build
RUN sleep 10 && npm run build


# เปิดพอร์ตที่แอปจะรัน (พอร์ต 3000)
EXPOSE 3000

# คำสั่งเริ่มต้นที่จะรันแอปพลิเคชัน
CMD ["npm", "start"]

# ลบเครื่องมือคอมไพล์หลังการติดตั้งเสร็จสิ้น
RUN apk del .build-deps
