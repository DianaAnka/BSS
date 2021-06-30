import React, { useState } from "react";

const Login: React.FC = () => {
  //   const checkUser: string = user.status ? `line-through` : ""
  const [password, setPassword] = useState<String>("");
  const [email, setEmail] = useState<String>("");

 

  const onSubmit = (event: any) => {
    event.preventDefault();
    alert("Authentication coming soon!");
  };
  return (
    <form onSubmit={onSubmit}>
      <h1>Login Below!</h1>
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        // value={email}
        // onChange={this.handleInputChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        // value={password}
        // onChange={this.handleInputChange}
        required
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Login;
