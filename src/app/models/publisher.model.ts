

export interface CreatePublisher{
    name: string;
    country: string;
    websiteUrl: string;
    foundedAt: string; 
    isActive: boolean;
    createdAt: Date; 
}


export interface Publisher {
    id: number;
    name: string;
    country: string;
    websiteUrl: string;
    foundedAt: string; 
    isActive: boolean;
    createdAt: Date; 
}