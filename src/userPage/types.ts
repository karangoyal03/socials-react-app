export interface LoginResponse {
    token: string;
    user: User;
  }
  
  export interface User {
    _id: string;
    id: string;
    username: string;
    role: string;
  }
  
  export interface Profile extends User {
    email: string;
    phone: string;
    bio: string;
    following: string[];
    followers: string[];
    bookmarks: string[];
    comments: string[];
    reviews: string[];
  }

  
  