import axios, { AxiosResponse } from "axios";

const baseUrl: string = "http://localhost:5000";

export const getUsers = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const users: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + "/users"
    );
    return users;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const addUser = async (
  formData: IUser
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const user: Omit<IUser, "_id"> = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      profilePic: formData.profilePic,
      roles: formData.roles,
      rates: formData.rates,
    };
    const saveUser: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + "/add-user",
      user
    );
    return saveUser;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const updateUser = async (
  user: IUser,
  userUpdate: IUser
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const updatedUser: AxiosResponse<ApiDataType> = await axios.put(
      `${baseUrl}/edit-user/${user._id}`,
      userUpdate
    );
    return updatedUser;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const deleteUser = async (
  _id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedUser: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseUrl}/delete-user/${_id}`
    );
    return deletedUser;
  } catch (error: any) {
    throw new Error(error);
  }
};
