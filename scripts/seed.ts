const { PrismaClient } = require("@prisma/Client");

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: "RAG" },
                { name: "Graph RAG" },
                { name: "Embedding Techniques" },
                { name: "Ethical AI" },
                { name: "Conversational AI" },
                { name: "Chatbots" },
                { name: "AI in Production" },
            ]
        })
    } catch (error) {
        console.error("Error seeding default categories", error);
    } finally {
        await db.$disconnect();
    }
}

main();