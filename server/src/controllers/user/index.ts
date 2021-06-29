import { Response, Request } from "express";
import { IUser } from "../../types/user";
import User from "../../models/user";

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    throw error;
  }
};

const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<
      IUser,
      "name" | "email" | "password" | "profilePic" | "roles" | "rates"
    >;

    const user: IUser = new User({
      name: body.name,
      email: body.email,
      password: body.password,
      profilePic: body.profilePic,
      roles: body.roles,
      rates: body.rates,
    });

    const newUser: IUser = await user.save();
    const allUsers: IUser[] = await User.find();

    res
      .status(201)
      .json({ message: "User added", user: newUser, users: allUsers });
  } catch (error) {
    throw error;
  }
};
const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateUser: IUser | null = await User.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allUsers: IUser[] = await User.find();
    res.status(200).json({
      message: "User updated",
      user: updateUser,
      users: allUsers,
    });
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser: IUser | null = await User.findByIdAndRemove(
      req.params.id
    );
    const allUsers: IUser[] = await User.find();
    res.status(200).json({
      message: "User deleted",
      user: deleteUser,
      users: allUsers,
    });
  } catch (error) {
    throw error;
  }
};

export { getUsers, addUser, updateUser, deleteUser };
