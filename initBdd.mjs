import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createRole(name) {
  const role = await prisma.role.create({
    data: {
      name,
    },
  });

  console.log(`Role created: ${role.name}`);
}

async function createUserBar() {
  const role = await prisma.role.findFirst({
    where: {
      name: 'Bar',
    },
  });
  const user = await prisma.user.create({
    data: {
      email: 'bar@grizly.com',
      password: 'securepassword123',
      username: 'grizlyBdx',
      id_Role: role.id,
    },
  });

  console.log(`User created: ${user.username}`);
}

async function createUserBasic() {
  const role = await prisma.role.findFirst({
    where: {
      name: 'User',
    },
  });
  const user = await prisma.user.create({
    data: {
      email: 'user@bordeaux.com',
      password: 'TestBx',
      username: 'userBdx',
      id_Role: role.id, // User role
    },
  });

  console.log(`User created: ${user.username}`);
}
async function createUserTestFront() {
  const role = await prisma.role.findFirst({
    where: {
      name: 'User',
    },
  });
  const user = await prisma.user.create({
    data: {
      email: 'test@test.com',
      password: 'test',
      username: 'test',
      id_Role: role.id, // User role
    },
  });

  console.log(`User created: ${user.username}`);
}

async function createBar() {
  const user = await prisma.user.findFirst({
    where: {
      username: 'grizlyBdx',
    },
  });

  const bar = await prisma.bar.create({
    data: {
      name: 'Grizly Bar',
      description: 'A very cool bar',
      happyHoure: '18:00 - 20:00',
      localisationX: 48.8566,
      localisationY: 2.3522,
      id_User: user.id,
    },
  });

  console.log('Bar created:', bar);
}

async function createEvent() {
  const bar = await prisma.bar.findFirst({
    where: {
      name: 'Grizly Bar',
    },
  });
  const event = await prisma.event.create({
    data: {
      dateHour: new Date('2025-01-20T18:00:00Z'),
      title: 'Live Music Night',
      description: 'Enjoy live music and good vibes',
      category: 'Music',
      id_Bar: bar.id,
    },
  });

  console.log('Event created:', event);
}

async function createFavorite() {
  const user = await prisma.user.findFirst({
    where: {
      username: 'userBdx',
    },
  });
  const bar = await prisma.bar.findFirst({
    where: {
      name: 'Grizly Bar',
    },
  });
  const favorite = await prisma.favorite.create({
    data: {
      id_User: user.id,
      id_Bar: bar.id,
    },
  });

  console.log('Favorite created:', favorite);
}

async function createAssessment() {
  const user = await prisma.user.findFirst({
    where: {
      username: 'userBdx',
    },
  });
  const bar = await prisma.bar.findFirst({
    where: {
      name: 'Grizly Bar',
    },
  });
  const assessment = await prisma.assessment.create({
    data: {
      note: 5,
      comment: 'Amazing place!',
      id_User: user.id,
      id_Bar: bar.id,
    },
  });

  console.log('Assessment created:', assessment);
}

async function main() {
  try {
    await createRole('Admin');
    await createRole('Bar');
    await createRole('User');
    await createUserBar();
    await createUserBasic();
    await createBar();
    await createEvent();
    await createFavorite();
    await createAssessment();
    await createUserTestFront();
  } catch (error) {
    console.error('Error creating roles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
