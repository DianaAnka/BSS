import React, { useEffect, useState } from 'react'
import User from './components/profile'
import { getUsers } from './API'

const App: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = (): void => {
    getUsers()
    .then(({ data: { users } }: IUser[] | any) => setUsers(users))
    .catch((err: Error) => console.log(err))
  }
  // const handleUpdateUser = (user: IUser , formData:IUser): void => {
  //   updateUser(user,formData)
  //     .then(({ status, data }) => {
  //       if (status !== 200) {
  //         throw new Error("Error! Todo not updated")
  //       }
  //       setUsers(data.users)
  //     })
  //     .catch(err => console.log(err))
  // }
  
  // const handleDeleteUser = (_id: string): void => {
  //   deleteUser(_id)
  //     .then(({ status, data }) => {
  //       if (status !== 200) {
  //         throw new Error("Error! Todo not deleted")
  //       }
  //       setUsers(data.users)
  //     })
  //     .catch(err => console.log(err))
  // }
  return (
    <main className='App'>
      <h1>My Profile</h1>
      {users.map((user: IUser) => (
        <User
          key={user._id}
          // updateUser={handleUpdateUser}
          // deleteUser={handleDeleteUser}
          user={user}
        />
      ))}
    </main>
  )
}

export default App