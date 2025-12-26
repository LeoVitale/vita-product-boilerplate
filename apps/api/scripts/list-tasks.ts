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
  console.log('📋 Listing all tasks...\n');

  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
  });

  if (tasks.length === 0) {
    console.log('No tasks found.');
    return;
  }

  console.log(`Found ${tasks.length} task(s):\n`);

  tasks.forEach((task, index) => {
    const status = task.completed ? '✅' : '⏳';
    console.log(`${index + 1}. ${status} ${task.title}`);
    if (task.description) {
      console.log(`   ${task.description}`);
    }
    console.log(`   ID: ${task.id}`);
    console.log(`   Created: ${task.createdAt.toLocaleString()}`);
    console.log('');
  });
}

main()
  .catch((e) => {
    console.error('❌ Error listing tasks:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
