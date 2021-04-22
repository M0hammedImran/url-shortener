import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method.toUpperCase() !== 'DELETE') {
        return res.status(404).send({ error: 'Method Not Allowed', ok: false });
    }
    const prisma = new PrismaClient({ log: ['query'] });
    try {
        const oldSite = await prisma.site.deleteMany({ where: {} });
        res.status(201).send({ oldSite, ok: true });
    } catch (error) {
        console.log({ error, ok: false });
        res.status(500).send({ error, ok: false });
    } finally {
        await prisma.$disconnect();
    }
};
