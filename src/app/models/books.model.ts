export interface IBookCreation{
    title: string;
    authorId: number;
    publisherId: number;
    description: string;
    publicationDate: Date;
    imageUrl: string;
}


export interface IBook{
    id: number;
    title: string;
    authorName: string;
    publisherName: string;
    description: string;
    publicationDate: Date;
    imageUrl: string;
}