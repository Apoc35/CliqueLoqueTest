const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect(); // Conecta ao banco
    console.log("Conexão com o banco de dados via Prisma foi bem-sucedida!");
  } catch (error) {
    console.error("Erro ao conectar ao banco via Prisma:", error);
  } finally {
    await prisma.$disconnect(); // Fecha a conexão
  }
}

testConnection();
