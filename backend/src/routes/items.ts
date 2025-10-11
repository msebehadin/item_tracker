import {Router} from "express"
import {prisma} from "../server"
import {verifyToken} from "../middleware/authMd"
const router=Router();
router.get('/',verifyToken,async (req,res)=>{
    const userID=(req as any).user.id;
    const items=await prisma.item.findMany({where:{userID}})
res.json(items);
})
router.post('/',verifyToken,async(req,res)=>{
    const {name,stock,category}=req.body;
    const userID=(req as any).user.id;
    const newItems=await prisma.item.create({
        data:{name,stock,category,userID}
    })
    res.json(newItems)
})
router.put('/;id',verifyToken,async(req,res)=>{
    const {id}=req.params;
    const {name,stock,catagory}=req.body;
    const userID=(req as any).user.id;
const update=await prisma.item.update({
    where: { id: Number(id) },
    data:{name,stock,catagory,userID}
})
res.json(update);
})
router.delete('/:id',verifyToken,async(req,res)=>{
    const {id}=req.params;
    await prisma.item.delete({
        where:{id:Number(id)}
    })
    res.json({message:'the item deleted'})
})
export default router