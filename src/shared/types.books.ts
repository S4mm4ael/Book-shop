export interface Book {
  issueYear: string;
  rating: number | null;
  title: string;
  authors: string[];
  image: ImageBook | null;
  categories: string[];
  id: number;
  booking: null | Booking;
  delivery: null | Delievery;
  histories: null | Histories[];
}

export type ImageBook = {
  url: string;
};

type Booking = {
  id: number;
  order: boolean;
  dateOrder: string;
  customerId: number;
  customerFirstName: string;
  customerLastName: string;
};

type Histories = {
  id: number;
  userId: number;
};

type Delievery = {
  id: number;
  handed: boolean;
  dateHandedFrom: string;
  dateHandedTo: string;
  recipientId: number;
  recipientFirstName: string;
  recipientLastName: string;
};

export type BookCard = {
  key: string;
  bookItem: Book;
  isListView: boolean;
};

export interface Category {
  name: string;
  path: string;
  id: string | number;
}

export interface ExactBook extends Book {
  description: string;
  publish: string;
  pages: number;
  cover: string;
  weight: string;
  format: string;
  ISBN: string;
  producer: string;
  comments: Comment[];
  user: User;
  images: ImageBook[];
}

interface Comment {
  id: number;
  rating: number;
  text: string;
  createdAt: string;
  user: User;
}

type User = {
  commentUserId: number;
  firstName: string;
  lastName: string;
  avatarUrl: string;
};

export interface CommentBook extends Comment {
  user: User;
}
