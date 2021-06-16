export interface Restaurant{

    _id?: string;
    name: string;
    address: string;

    openingHour: string;
    closingHour: string;

    facebook?: string;
    instagram?: string;
    website?: string;
    phoneNumber?: string;
    whatsapp?: string;


    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deleteAt: Date;



}