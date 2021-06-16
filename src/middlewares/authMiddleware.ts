import {NextFunction, Request, Response} from 'express';
import {connectMongo} from "../utils/database";

export const authMiddleware = async(req: Request, res: Response, next: NextFunction) => {

    const headerToken = req.headers.authorization;

    if(!headerToken){
        return res.status(401).json({
            message: 'No token provided'
        });
    }

    if(headerToken && headerToken.split(' ')[0] !== 'Bearer'){
        return res.status(401).json({
            message: 'Invalid token'
        });
    }

    const token = headerToken.split(' ')[1];

    try{
        const db = await connectMongo();
        const data = await db.collection('users').findOne({
            token: token
        });

        if(!data){
            res.status(401).json({
                message: 'Invalid or expired token'
            });
            return;
        }

        next();

    }catch (error) {
        return res.status(401).send({
            error: 'Please authenticate'
        });
    }

    return;

}