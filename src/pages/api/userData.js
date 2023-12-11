import { PrismaClient } from '@prisma/client';
import { getMCUSER } from 'src/pages/main.js'
const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { username } = req.query; // Get the username from the query parameters

      if (!username) {
        return res.status(400).json({ error: 'Username is required' });
      }

      const user = await prisma.mcuser.findFirst({
        where:{
            username: username,
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
