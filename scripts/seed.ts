const { PrismaClient } = require("@prisma/Client");

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: "Famous People" },
                { name: "Movies & TV" },
                { name: "Games" },
                { name: "Musicians" },
                { name: "Animals" },
                { name: "Philosophy" },
                { name: "Famous People" },
                { name: "Scientists" },
                { name: "Crazy" },
            ]
        })
    } catch (error) {
        console.error("Error seeding default categories", error);
    } finally {
        await db.$disconnect();
    }
}

main();