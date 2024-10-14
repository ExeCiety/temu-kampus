import bcrypt from 'bcryptjs'

import { prisma } from '@/lib/prisma'
import { defaultSaltRounds } from '@/lib/helpers/bcryptjs.helper'

const userAdminSeeder = async () => {
  // Check if admin user already exists
  const email = 'admin@temukampus.com'
  const adminUser = await prisma.user.findUnique({
    where: { email }
  })

  // If admin user exist, dont create new admin user
  if (adminUser) {
    console.log('Admin user already exists')
    return
  }

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: email,
      password: bcrypt.hashSync('admin1234!', defaultSaltRounds),
      role: 'admin'
    }
  })

  console.log('Admin user created')
}

const locationSeeder = async () => {
  await prisma.location.create({
    data: {
      name: 'Universitas Widyatama',
      address: 'Jl. Cikutra No.204A, Sukapada, Kec. Cibeunying Kidul, Kota Bandung, Jawa Barat 40125'
    }
  })

  console.log('Locations created')
}

const resourceSeeder = async () => {
  await prisma.resource.create({
    data: {
      name: 'Resource 1',
      quantity: 10
    }
  })

  console.log('Resources created')
}

const main = async () => {
  await userAdminSeeder()
  await locationSeeder()
  await resourceSeeder()
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
