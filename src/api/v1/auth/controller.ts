import {Request, Response} from 'express';
import {connectMongo} from '../../../utils/database';
import {User} from "../../../interfaces/User";
import {hash, compare} from 'bcrypt';
import {v4} from 'uuid';
import {ObjectId} from "mongodb";

export const login = async(req: Request, res: Response) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.json({
            success: false,
            message: 'bad credentials'
        });
    }

    const db = await connectMongo();
    const selectedUser = await db
        .collection('users')
        .findOne({email: email.toLowerCase()}) as User;

    if(!selectedUser || !selectedUser.password || !password){
        return res.json({
            success: false,
            message: 'bad credentials'
        });
    }

    if(await compare(password, selectedUser.password)){
        const token = await hash(v4(), 10);

        const authData = await db.collection('users')
            .findOneAndUpdate(
                {_id: new ObjectId(selectedUser._id)},
                {$set: {token: token, updatedAt: new Date()}}
            );

        authData.value.token = token;

        return res.json({
            success: true,
            data: authData.value as User
        });
    }else{
        return res.json({
            success: false,
            message: 'bad credentials (bad password)',
        })
    }




}