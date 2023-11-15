import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const user = await prisma.mCUser.findFirst({
        where:{
            UUID: '4321'
        },
        include:{
            worlds:{
                include:{
                    stats:true,
                },
            },
        },
      });
      
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
