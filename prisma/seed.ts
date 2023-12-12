import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main(){
    return;
    const user_test = await prisma.mcuser.upsert({
        where: {uuid: '1234'},
        update: {},
        create: {
            uuid: '1234',
            username: 'CoopDaScoop32',
            world:{
              create:{
                world_name: 'New_World',
                stats: {
                  create: {
                    uuid: '1234',
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
      where: {uuid: '4321'},
      update: {},
      create: {
          uuid: '4321',
          username: 'ScoopTheCoop23',
          world:{
            create:[{
              world_name: 'My_World',
              stats: {
                create: [{
                  uuid: '4321',
                  stat_name: 'chickens_killed',
                  stat_val: '3'
                },
                {
                  uuid: '4321',
                  stat_name: 'deaths',
                  stat_val: '204'
                }],
                
              },
            },
            {
              world_name: 'World2',
              stats:{
                create:[{
                  uuid: '4321',
                  stat_name:'chickens_killed',
                  stat_val:'20'
                },
                {
                  uuid: '4321',
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
