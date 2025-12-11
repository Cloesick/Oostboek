import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Real Oostboek staff members from personnel.txt
  const staffMembers = [
    {
      email: 'dina.tamsin@oostboek.be',
      firstName: 'Dina',
      lastName: 'Tamsin',
      role: 'ACCOUNTANT',
      specializations: 'boekhouding,btw,lonen',
    },
    {
      email: 'mattijs.wittevrongel@oostboek.be',
      firstName: 'Mattijs',
      lastName: 'Wittevrongel',
      role: 'ADVISOR',
      specializations: 'fiscaliteit,successie,overname',
    },
    {
      email: 'angelique.haeke@oostboek.be',
      firstName: 'Angelique',
      lastName: 'Haeke',
      role: 'ADMIN',
      specializations: '',
    },
    {
      email: 'kristel.vandewalle@oostboek.be',
      firstName: 'Kristel',
      lastName: 'Vande Walle',
      role: 'ACCOUNTANT',
      specializations: 'boekhouding,btw',
    },
    {
      email: 'xenia.lateste@oostboek.be',
      firstName: 'Xenia',
      lastName: 'Lateste',
      role: 'ACCOUNTANT',
      specializations: 'boekhouding,starter',
    },
    {
      email: 'jessy.moeyaert@oostboek.be',
      firstName: 'Jessy',
      lastName: 'Moeyaert',
      role: 'ACCOUNTANT',
      specializations: 'boekhouding,lonen',
    },
    {
      email: 'bram.keukeleire@oostboek.be',
      firstName: 'Bram',
      lastName: 'Keukeleire',
      role: 'ADVISOR',
      specializations: 'fiscaliteit,starter,overname',
    },
    {
      email: 'dieter.hoste@oostboek.be',
      firstName: 'Dieter',
      lastName: 'Hoste',
      role: 'ADVISOR',
      specializations: 'fiscaliteit,successie,internationaal',
    },
    {
      email: 'geert.hutsebaut@oostboek.be',
      firstName: 'Geert',
      lastName: 'Hutsebaut',
      role: 'ACCOUNTANT',
      specializations: 'boekhouding,fiscaliteit,btw',
    },
    {
      email: 'sophie.ysenbrandt@oostboek.be',
      firstName: 'Sophie',
      lastName: 'Ysenbrandt',
      role: 'ACCOUNTANT',
      specializations: 'boekhouding,btw,internationaal',
    },
    {
      email: 'dylan.denys@oostboek.be',
      firstName: 'Dylan',
      lastName: 'Denys',
      role: 'ACCOUNTANT',
      specializations: 'boekhouding,btw',
    },
    {
      email: 'ann.degryse@oostboek.be',
      firstName: 'Ann',
      lastName: 'Degryse',
      role: 'ADMIN',
      specializations: '',
    },
    {
      email: 'mathias.lievens@oostboek.be',
      firstName: 'Mathias',
      lastName: 'Lievens',
      role: 'ADVISOR',
      specializations: 'starter,overname',
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
