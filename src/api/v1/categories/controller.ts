import {Request, Response} from "express";
import {connectMongo} from '../../../utils/database';
import {Category} from '../../../interfaces/Category';
import {ObjectId} from "mongodb";


export const index = async (req: Request, res: Response) => {
    try {
        const db = await connectMongo();
        const data = await db.collection('categories')
            .find().toArray() as [Category];

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

}

export const showById = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {

        const db = await connectMongo();
        const data = await db.collection('categories').findOne( {_id: new ObjectId(id)}) as Category;

        if (!data){
            return res.status(404).json({
                success: false,
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

    const {/*trademark*/ name, description, /*price*/} = req.body;


    // VALIDACIONES DE NOMBRE
    if (!name) {
        return res.json({
            success: false,
            message: 'name field is required'
        });
    }
    // VALIDACION DONDE TIENE QUE SER CARACTER NUMERICO
   /* if(!price || parseFloat(price) !== price ) {
        return res.json({
            success: false,
            message: 'price field is required as numeric value'
        });
    }*/

    const document: Category = {
        name: name,
        description: description,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    try {

        const db = await connectMongo();
        const data = await db.collection('categories')
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

}

export const update = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {name, price, description} = req.body;
    try{
        const db = await connectMongo();
        const data =
            await db.collection('categories')
                .findOneAndUpdate(
                    {_id: new ObjectId(id)},
                    {$set: {name: name, price: price, description: description}}
                );
        return res.json({
            success: true,
            data: data.value as Category
        });
    }catch (error) {
        return res.status(500).json({
            success: false,
            message: error.toString(),
        })
    }
}

export const remove = async (req: Request, res: Response) => {
    const {id} = req.params;

    try{
        const db = await connectMongo();
        const data = await db.collection('categories')

            //-------- ESTA FUNCION ES PARA ELIMINAR DE MANERA REAL ALGUNA PARAMETRO DE LA BASE DE DATOS --------//
            .findOneAndDelete({_id: new ObjectId(id)});
        console.log('Que es esto?', data);



//--------- ESTA FUNCION ES PARA ELIMINAR UN DATO DE MANERA VIRTUAL ---------//
        /*  .findOneAndUpdate(
                {_id: new ObjectId(id)},
                {$set: { deletedAt: new Date(), isActive: false }});*/


        return res.json({
            success: true,
            data: data.value as Category
        });
    }catch (error) {
        return res.status(500).json({
            success: false,
            message: error.toString()
        });
    }


}
