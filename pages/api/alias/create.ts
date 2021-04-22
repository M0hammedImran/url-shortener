import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method.toUpperCase() !== 'POST') {
        return res.status(404).send({ error: 'Method Not Allowed', ok: false });
    }
    const prisma = new PrismaClient({ log: ['query'] });
    try {
        const { data: newSite } = req.body;
        const oldSite = await prisma.site.findUnique({
            where: {
                link: newSite.link,
            },
        });
        if (oldSite) {
            return res.status(201).send({ site: oldSite, ok: true });
        }
        const site = await prisma.site.create({
            data: { ...newSite, alias: nanoid(6) },
        });
        res.status(201).send({ site, ok: true });
    } catch (error) {
        console.log({ error, ok: false });
        res.status(500).send({ error, ok: false });
    } finally {
        await prisma.$disconnect();
    }
};
