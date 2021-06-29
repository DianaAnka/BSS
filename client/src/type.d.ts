interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  profilePic: string;
  roles: [string];
  rates: [Map<string, number>];
  createdAt?: string;
  updatedAt?: string;
}

interface UserProps {
  user: IUser;
}

type ApiDataType = {
  message: string;
  status: string;
  users: IUser[];
  user?: IUser;
};
