import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../utils/db';

// req should have a action property, with "START" or "STOP"
// req should also have the id of the recipient and donor, in rId and dId properties
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.body.action == "START") {
    const txip = await prisma.txIP.create({
      data: {
        recipient: { connect: { id: req.body.rId } },
        donor: { connect: { id: req.body.dId } }
      }
    });
    res.status(200).json(txip);
  } else {
    const toDel = await prisma.txIP.findUnique({
      where: {
        rId_dId: {
          rId: req.body.rId,
          dId: req.body.dId
        }
      }
    });
    const tx = await prisma.tx.create({
      data: {
        start: toDel.time,
        recipient: { connect: { id: req.body.rId } },
        donor: {connect: {id: req.body.dId } },
        kWhTransferred: 10.023
      }
    });
    await prisma.txIP.delete({
      where: { id: toDel.id }
    });
    res.status(200).json({txIPDeleted: toDel.id, txCreated: tx.id});
  }
}