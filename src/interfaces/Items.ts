import {ObjectId} from 'mongodb';

export interface Items {
    _id?: string;
    categoryId: ObjectId;

    name: string;
    description?: string;
    price: number;

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deleteAt?: Date;

}