export class User {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  job?:string;
}

export class UserList {
  data: User[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export class UserData {
  data: User
}

export class UserUpdate {
  id: number;
  job: string;
  name: string; 
  updatedAt: string;
}

export class UserTaken {
  token: string;
  id?: number;
}

export class UserCreate {
  id: number;
  job: string;
  name: string; 
  createdAt: string;
}

