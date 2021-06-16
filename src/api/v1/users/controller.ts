import  expressApp from 'express';
import {Request, Response} from "express";
import {connectMongo} from "../../../utils/database";
import {User} from "../../../interfaces/User";
import {hash} from 'bcrypt';

const router = expressApp();

export const create = async (req: Request, res: Response) =>{
    const {email, phoneNumber, password, name} = req.body;



    //Validacion de campos
    if(!email || !phoneNumber || !password || !name){
        return res.json({
            success: false,
            message: "all fields are required"
        });

    }

    try {
        const db = await connectMongo();
        const isEmailAlreadyBeenTaken = await db.collection('users')
            .findOne({email: email.toLowerCase()}) as User;

        if (isEmailAlreadyBeenTaken){
            return res.json ({
                success: false,
                message: 'email is already been taken'
            });
        }

        const userData: User = {
            name: name,
            phoneNumber: phoneNumber,
            password: await hash(password, 10),
            email: email,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const user = await db.collection('users')
            .insertOne(userData);

        return res.json({
            success: true,
            data: user.ops[0] as User
            });

    }catch (error) {
        return res.status(500).json({
            success: false,
            message: error.toString()
        })
    }

}


export const index = async (req: Request, res: Response) =>{
    try {
        const db = await connectMongo();
        const data = await db.collection('users')
            .find().toArray() as [User];
        return res.json({
            success: true,
            data: data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.toString()
        });
    }
};



export const update = async (req: Request, res: Response) =>{
    return res.json( {
        success: true,
        message: 'user.put.id'
    });
};

export const remove = async (req: Request, res: Response) =>{
    return res.json( {
        success: true,
        message: 'users.delete.id'
    });
};

export default router;