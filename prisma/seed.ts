import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main(){
    const user_test = await prisma.mcuser.upsert({
        where: {UUID: '1234'},
        update: {},
        create: {
            UUID: '1234',
            username: 'CoopDaScoop32',
            worlds:{
              create:{
                world_name: 'New_World',
                date_created: '10/17/12',
                stats: {
                  create: {
                    UUID: '1234',
                    stat_name: 'test_stat',
                    stat_val: '5'

                  },
                },
              },
            },
        },
    })
    console.log({user_test})

    const user_test2 = await prisma.mcuser.upsert({
      where: {UUID: '4321'},
      update: {},
      create: {
          UUID: '4321',
          username: 'ScoopTheCoop23',
          worlds:{
            create:[{
              world_name: 'My_World',
              date_created: '3/28/20',
              stats: {
                create: [{
                  UUID: '4321',
                  stat_name: 'chickens_killed',
                  stat_val: '3'
                },
                {
                  UUID: '4321',
                  stat_name: 'deaths',
                  stat_val: '204'
                }],
                
              },
            },
            {
              world_name: 'World2',
              date_created: '10/31/09',
              stats:{
                create:[{
                  UUID: '4321',
                  stat_name:'chickens_killed',
                  stat_val:'20'
                },
                {
                  UUID: '4321',
                  stat_name:'deaths',
                  stat_val:'64'
                }],
                
              }
            }
          ],
          },
      },
  })
  console.log({user_test2})
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
