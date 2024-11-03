import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

export async function POST(req: Request)     {
    try {
        const { email, password, name }: { email: string; password: string; name: string } = await req.json();
        const hashedPassword = bcrypt.hashSync(password, 10)

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
              
            }
        })

        return Response.json({ message: "User Created",
            data : {
                user
            }
        } )
    } catch (error) {
        console.error(error);
        return Response.json({ error: "User could not be created" }, {
            status: 500
        })
    }
}