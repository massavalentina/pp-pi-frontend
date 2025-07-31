

export interface CreatePublisher{
    name: string;
    country: string;
    websiteUrl: string;
    foundedDate: string; 
    isActive: boolean;
    createdAt: Date; 
}


export interface Publisher {
    id: number;
    name: string;
}