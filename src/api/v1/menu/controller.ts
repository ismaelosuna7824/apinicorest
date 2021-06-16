import {Request, Response} from 'express';
import {connectMongo} from "../../../utils/database";
import {Category} from "../../../interfaces/Category";

export const menu = async (req: Request, res: Response) => {
    try {
        const db = await connectMongo();
        const data = await db.collection('categories')
            .aggregate([{
                $lookup: {
                    from: 'items',
                    localField: '_id',
                    foreignField: 'categoryId',
                    as: 'items'
                }
            }])
            .toArray() as [Category];

        return res.json({
            success: true,
            data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.toString()
        })
    }
}