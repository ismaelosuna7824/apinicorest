export interface Category {
    _id?: string;
    name: string;
    description?: string;

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deleteAt?: Date;

}