import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.task.deleteMany({});
  await prisma.user.deleteMany({});

  const pass = await bcrypt.hash('Ewqaz1234', 10);

  const admin = await prisma.user.create({
    data: {
      login: 'admin',
      password: pass,
      firstname: 'Vasiliy',
      lastname: 'User',
      role: 'ADMIN',
    },
  });

  console.log('Admin user created:', admin);

  const subordinate1 = await prisma.user.create({
    data: {
      login: 'user1',
      password: pass,
      firstname: 'Тестовый',
      lastname: 'Первый',
      manager: { connect: { id: admin.id } },
    },
  });

  const subordinate2 = await prisma.user.create({
    data: {
      login: 'user2',
      password: pass,
      firstname: 'Тестовый',
      lastname: 'Второй',
      manager: { connect: { id: admin.id } },
    },
  });

  console.log('Subordinate users created:', subordinate1, subordinate2);

  await prisma.task.createMany({
    data: [
      {
        header: 'Задача 1 для Тестового 1',
        description: 'Не опоздать с выполнением тестового.',
        creatorId: admin.id,
        executorId: subordinate1.id,
        priority: 'Medium',
        status: 'New',
      },
      {
        header: 'Задача 2 для Тестового 1',
        description: 'Задача 1 для Тестового 2.',
        creatorId: admin.id,
        executorId: subordinate1.id,
        priority: 'High',
        status: 'InProgress',
      },
      {
        header: 'Задача 3 для Тестового 1',
        description: 'Задача 3 для Тестового 1.',
        creatorId: admin.id,
        executorId: subordinate1.id,
        priority: 'High',
        status: 'InProgress',
        expiresAt: new Date('2025-03-23').toISOString(),
      },
      {
        header: 'Задача 4 для Тестового 1',
        description: 'Задача 4 для Тестового 1.',
        creatorId: admin.id,
        executorId: subordinate1.id,
        priority: 'High',
        status: 'InProgress',
        expiresAt: new Date('2025-03-24').toISOString(),
      },
      {
        header: 'Задача 5 для Тестового 1',
        description: 'Задача 5 для Тестового 1.',
        creatorId: admin.id,
        executorId: subordinate1.id,
        priority: 'High',
        status: 'InProgress',
        expiresAt: new Date('2025-03-31').toISOString(),
      },
    ],
  });

  await prisma.task.createMany({
    data: [
      {
        header: 'Задача 2 для Тестового 2',
        description: 'Не опоздать с выполнением тестового.',
        creatorId: admin.id,
        executorId: subordinate2.id,
        priority: 'Low',
        status: 'New',
      },
      {
        header: 'Задача 1 для Тестового 2',
        description: 'Выполнить тестовое.',
        creatorId: admin.id,
        executorId: subordinate2.id,
        priority: 'Medium',
        status: 'Completed',
      },
    ],
  });

  console.log('Tasks created for subordinates.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
