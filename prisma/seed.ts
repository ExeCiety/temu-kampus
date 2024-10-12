import { prisma } from '@/lib/prisma'

const main = async () => {
  await userAdminSeeder()
}

const userAdminSeeder = async () => {
  // Check if admin user already exists
  const email = 'admin@temukampus.com'
  const adminUser = await prisma.user.findUnique({
    where: { email }
  })

  // If admin user does not exist, create it
  if (adminUser) {
    console.log('Admin user already exists')
    return
  }

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: email,
      password: 'admin1234',
      role: 'admin'
    }
  })

  console.log('Admin user created')
}

main()
  .then(() => {
    console.log('Seeding completed')
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
