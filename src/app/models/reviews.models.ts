export interface CreationReview {
  comment: string;
  rating: number;
  bookId?: number;
}

export interface Review {
  id: number;
  bookId: number;
  Title: string;
  comment: string;
  rating: number;
}


export interface BookForSelect { //Equiovalente a BookWithDetailsDTO
  id: number;
  title: string;
  authorName: string;
  publisherName: string;
}