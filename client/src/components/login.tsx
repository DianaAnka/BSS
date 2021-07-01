import React, { useState } from "react";

const Login: React.FC = () => {
  //   const checkUser: string = user.status ? `line-through` : ""
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const onSubmit = (event: any) => {
    event.preventDefault();
    fetch("/api/authenticate", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("logged");
          // this.props.history.push('/');
        } else {
          // const error = new Error(res.error);
          // throw error;
          console.log(res);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error logging in please try again");
      });
  };

  const handleInputChange = (event: any) => {
    const { value, name } = event.target;
    // console.log("name " + name + "value " + value);
    if (name == "email") setEmail(value);
    else setPassword(value);
    // this.setState({
    //   [name]: value
    // });
  };
  return (
    <form onSubmit={onSubmit}>
      <h1>Login Below!</h1>
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={email}
        onChange={handleInputChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={password}
        onChange={handleInputChange}
        required
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Login;
