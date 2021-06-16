import expressApp from 'express';
import {Request, Response} from "express";
import {connectMongo} from "../../../utils/database";
import {Items} from "../../../interfaces/Items";
import {ObjectId} from 'mongodb';



const router = expressApp();
export default router;


export const index = async (req: Request, res: Response) => {
    try {

        const db = await connectMongo();
        const data = await db.collection('items').find().toArray() as [Items];

        return res.json({
            success: true,
            data: data,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.toString()
        });
    }
    return res.json( {
        success: true,
        message: 'items.get'
    });
};

export const showById = async (req: Request, res: Response) =>{
    const {id} = req.params;

    try {

        const db = await connectMongo();
        const data = await db.collection('items').findOne( {_id: new ObjectId(id)}) as Items;

        if (!data){
            return res.status(404).json({
                sucess: false,
                message: 'resource not found'
            });
        }

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

export const create = async (req: Request, res: Response) => {
    const {categoryId, name, description, price} = req.body;


    // VALIDACIONES DE NOMBRE
    if (!name) {
        return res.json({
            success: false,
            message: 'name field is required'
        });
    }
    // VALIDACION DONDE TIENE QUE SER CARACTER NUMERICO
    if(!price || parseFloat(price) !== price ) {
        return res.json({
            success: false,
            message: 'price field is required as numeric value'
        });
    }
    // validacion de ID
    if(!categoryId){
        return res.json({
            success: false,
            message: 'category id field is required'
        })
    }

    const document: Items = {
        categoryId: new ObjectId(categoryId),
        name: name,
        price: price,
        description: description,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),

    }



    try {

        const db = await connectMongo();
        const data = await db.collection('items')
            .insertOne(document);

        return res.status(201).json({
            success: true,
            data: data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.toString()
        });
    }

};

export const update = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {name, price, description, categoryId} = req.body;

    // Validacion de cadena
    if(!name){
        return res.json({
            success: false,
            message: 'name field is required'
        });
    }
    // Validacion de carecter numerico
    if(!price || price !== parseFloat(price)){
        return res.json({
            success: false,
            message: 'price field is required and must be a number'
        });
    }

    // Validacion de cadena
    if(!description){
        return res.json({
            success: false,
            message: 'description field is required'
        });
    }

    if(!categoryId){
        return res.json({
            success: false,
            message: 'category id field is required'
        })
    }

    try{
        const db = await connectMongo();
        const data =
            await db.collection('items')
                .findOneAndUpdate(
                    {_id: new ObjectId(id)},
                    {$set: {name: name, price: price, description: description, categoryId: categoryId}}
                );

        if(!data.value){
            return res.status(404).json({
                success: false,
                message: 'resource not found'
            });
        }

        return res.json({
            success: true,
            data: data.value as Items
        });
    }catch (error) {
        return res.status(500).json({
            success: false,
            message: error.toString(),
        })
    }


}

export const remove = async (req: Request, res: Response) =>{
    const {id} = req.params;

    try{
        const db = await connectMongo();
        const data = await db.collection('items')

//-------- ESTA FUNCION ES PARA ELIMINAR DE MANERA REAL ALGUNA PARAMETRO DE LA BASE DE DATOS --------//
            .findOneAndDelete({_id: new ObjectId(id)});
        console.log('Que es esto?', data);



//--------- ESTA FUNCION ES PARA ELIMINAR UN DATO DE MANERA VIRTUAL ---------//
        /*  .findOneAndUpdate(
                {_id: new ObjectId(id)},
                {$set: { deletedAt: new Date(), isActive: false }});*/


        return res.json({
            success: true,
            data: data.value as Items
        });
    }catch (error) {
        return res.status(500).json({
            success: false,
            message: error.toString()
        });
    }


}

