import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create demo staff members
  const staffMembers = [
    {
      email: 'jan.vermeersch@oostboek.be',
      firstName: 'Jan',
      lastName: 'Vermeersch',
      role: 'ACCOUNTANT',
      specializations: 'tax,bookkeeping',
    },
    {
      email: 'marie.claeys@oostboek.be',
      firstName: 'Marie',
      lastName: 'Claeys',
      role: 'ADVISOR',
      specializations: 'tax,succession',
    },
    {
      email: 'pieter.desmet@oostboek.be',
      firstName: 'Pieter',
      lastName: 'Desmet',
      role: 'JURIST',
      specializations: 'startup,legal',
    },
  ];

  for (const staff of staffMembers) {
    await prisma.staff.upsert({
      where: { email: staff.email },
      update: {},
      create: {
        ...staff,
        passwordHash: await bcrypt.hash('demo123', 12),
      },
    });
  }

  console.log('Created staff members');

  // Create a demo user
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@oostboek.be' },
    update: {},
    create: {
      email: 'demo@oostboek.be',
      passwordHash: await bcrypt.hash('demo123', 12),
      firstName: 'Demo',
      lastName: 'Gebruiker',
      gdprConsentAt: new Date(),
      gdprConsentVersion: '1.0',
    },
  });

  console.log('Created demo user:', demoUser.email);
  console.log('');
  console.log('Demo credentials:');
  console.log('  Email: demo@oostboek.be');
  console.log('  Password: demo123');
  console.log('');
  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
