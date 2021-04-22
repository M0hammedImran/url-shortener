import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient({ log: ['query'] });
    try {
        const { id } = req.query;
        const site = await prisma.site.findUnique({
            where: { id: Number(id) },
        });
        res.status(201).send({ site, ok: true });
    } catch (error) {
        console.log({ error, ok: false });
        res.status(500).send({ error, ok: false });
    } finally {
        await prisma.$disconnect();
    }
};
