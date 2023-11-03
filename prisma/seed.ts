import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main(){
    const user_test = await prisma.mCUser.upsert({
        where: {UUID: '1234'},
        update: {},
        create: {
            UUID: '1234',
            worlds:{
              create:{
                world_name: 'New_World',
                date_created: '10/17/12',
                stats: {
                  create: {
                    stat_name: 'test_stat',
                    stat_val: '5'

                  },
                },
              },
            },
        },
    })
    console.log({user_test})
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
