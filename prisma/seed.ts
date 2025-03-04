import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient()

async function main() {
    // DBクリーンアップ
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
    
    const hashedPassword = await bcrypt.hash("testuser", 12);
    const dummyImage = [
        'https://picsum.photos/seed/post1/600/400',
        'https://picsum.photos/seed/post1/600/400'
        ];

        // ユーザー作成
        const user = await prisma.user.create({
            data: {
                email: "test@exapmle.com",
                name: "test",
                password: hashedPassword,
                posts: {
                    create: [
                        {
                            title: "first post",
                            content: "this is a first blog",
                            topImage: dummyImage[0],
                            published: true
                        },
                        {
                            title: "second post",
                            content: "this is a second blog",
                            topImage: dummyImage[1],
                            published: true
                        }
                    ]
                }
            }
        });

        console.log({ user });
};

main()
    .catch((e) => { 
        console.error(e); 
        process.exit(1)
    }).finally (
        async () => { 
            await prisma.$disconnect() 
    });