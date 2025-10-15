import { Router } from "express";
import { prisma } from "../server";
import { verifyToken } from "../middleware/authMd";

const router = Router();

router.get('/', verifyToken, async (req, res) => {
    const userId = (req as any).user.id;
    const items = await prisma.item.findMany({ where: { userId } });
    res.json(items);
});

router.post('/item', verifyToken, async (req, res) => {
    const { name, stock, category } = req.body;
    const userId = (req as any).user.id;
    const newItem = await prisma.item.create({
        data: { name, stock, category, userId }
    });
    res.json(newItem);
});

router.put('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { name, stock, category } = req.body;
    const userId = (req as any).user.id;
    const updatedItem = await prisma.item.update({
        where: { id: Number(id) },
        data: { name, stock, category, userId }
    });
    res.json(updatedItem);
});

router.delete('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    await prisma.item.delete({
        where: { id: Number(id) }
    });
    res.json({ message: 'The item was deleted' });
});

export default router;
