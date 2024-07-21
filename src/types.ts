export interface Business {
  _id: string;
  name: string;
  description: string;
  stars: number;
}

export interface Review {
  _id: string;
  content: string;
  business: string;
  user: string;
  stars: number;
  likes: Array<{ userId: string }>;
  createdAt: Date;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
}
