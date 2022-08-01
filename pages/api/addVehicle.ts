// we probs want to add authentication to this api later on, so ppl can't just randomly visit this endpoint and add vehicles??

import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../utils/db';

// req's body should contain the license plate number of the vehicle to add
// also the user's email, and name (i think we could get this here using getSession but idk how)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const v = await prisma.vehicle.create({
    data: {
      license: req.body.license,
      owner: {
        connectOrCreate: {
          where: {
            email: req.body.user.email
          }, 
          create: {
            email: req.body.user.email,
            name: req.body.user.name
          }
        }
      }
    },
    include: { owner: true }
  });
  res.status(200).json(v);
}