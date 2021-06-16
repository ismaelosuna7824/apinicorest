export interface User{
    _id?: string;
    email: string;
    phoneNumber: string;
    password: string;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}