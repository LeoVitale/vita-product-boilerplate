import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const DATABASE_URL =
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/vita_db';

const adapter = new PrismaPg({
  connectionString: DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding tasks...');

  const tasks = [
    {
      title: 'Configurar ambiente de desenvolvimento',
      description: 'Configurar variáveis de ambiente e dependências do projeto',
      completed: true,
    },
    {
      title: 'Implementar autenticação',
      description: 'Adicionar sistema de autenticação JWT',
      completed: false,
    },
    {
      title: 'Criar testes unitários',
      description: 'Escrever testes para os use cases principais',
      completed: false,
    },
    {
      title: 'Documentar API',
      description: 'Criar documentação da API GraphQL',
      completed: false,
    },
    {
      title: 'Configurar CI/CD',
      description: 'Configurar pipeline de deploy automático',
      completed: false,
    },
  ];

  for (const task of tasks) {
    const created = await prisma.task.create({
      data: task,
    });
    console.log(`✅ Created task: ${created.title}`);
  }

  console.log(`\n✨ Seeded ${tasks.length} tasks successfully!`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding tasks:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
