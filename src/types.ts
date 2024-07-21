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
  likes: Array<{ userId: string }>;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
}
