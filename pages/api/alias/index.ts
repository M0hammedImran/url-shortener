import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method.toUpperCase() !== 'GET') {
        return res.status(404).send({ error: 'Method Not Allowed', ok: false });
    }
    const prisma = new PrismaClient({ log: ['query'] });
    try {
        const sites = await prisma.site.findMany();
        res.status(201).send({ sites, ok: true });
    } catch (error) {
        console.log({ error, ok: false });
        res.status(500).send({ error, ok: false });
    } finally {
        await prisma.$disconnect();
    }
};
