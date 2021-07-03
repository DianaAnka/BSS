import React, { useReducer, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      width: 200,
    },
    header: {
      textAlign: "center",
      background: "#212121",
      color: "#fff",
    },
    card: {
      marginTop: theme.spacing(10),
    },
    link: {
      textDecoration: "none",
    },
  })
);

//state type

type State = {
  email: string;
  password: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const initialState: State = {
  email: "",
  password: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false,
};

type Action =
  | { type: "setEmail"; payload: string }
  | { type: "setPassword"; payload: string }
  | { type: "setIsButtonDisabled"; payload: boolean }
  | { type: "loginSuccess"; payload: string }
  | { type: "loginFailed"; payload: string }
  | { type: "setIsError"; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setEmail":
      return {
        ...state,
        email: action.payload,
      };
    case "setPassword":
      return {
        ...state,
        password: action.payload,
      };
    case "setIsButtonDisabled":
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case "loginSuccess":
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case "loginFailed":
      return {
        ...state,
        helperText: action.payload,
        isError: true,
      };
    case "setIsError":
      return {
        ...state,
        isError: action.payload,
      };
  }
};

const Register = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.email.trim() && state.password.trim()) {
      dispatch({
        type: "setIsButtonDisabled",
        payload: false,
      });
    } else {
      dispatch({
        type: "setIsButtonDisabled",
        payload: true,
      });
    }
  }, [state.email, state.password]);

  //to check if email syntax is valid
  function validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  //to check password length
  function validatePassword(password: string) {
    if (password.length >= 8 && password.length <= 30) return true;
    return false;
  }

  const handleLogin = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: state.email, password: state.password }),
    };
    fetch("/api/register", requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());
        // check for error response
        if (!response.ok) {
          console.log("not ok ");
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        dispatch({
          type: "loginSuccess",
          payload: "Login Successfully",
        });
      })
      .catch((error) => {
        dispatch({
          type: "loginFailed",
          payload: "Incorrect email or password",
        });
        console.error("There was an error!", error);
      });
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleLogin();
    }
  };

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setEmail",
      payload: event.target.value,
    });
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setPassword",
      payload: event.target.value,
    });
  };
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Register" />
        <CardContent>
          <div>
            <TextField
              error={state.isError}
              fullWidth
              id="email"
              type="email"
              label="Email"
              placeholder="Email"
              margin="normal"
              onChange={handleEmailChange}
              onKeyPress={handleKeyPress}
              helperText={
                state.email && !validateEmail(state.email)
                  ? "enter valid email"
                  : ""
              }
            />
            <TextField
              error={state.isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
              helperText={
                state.password && !validatePassword(state.password)
                  ? "password must be between 8 - 30 characters"
                  : ""
              }
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={handleLogin}
            disabled={state.isButtonDisabled}
          >
            Register
          </Button>
          <Link className={classes.link} to="/login">
            <Button
              size="large"
              variant="contained"
              color="secondary"
              className={classes.loginBtn}
              // onClick={handleLogin}
              // disabled={state.isButtonDisabled}
            >
              Login
            </Button>
          </Link>
        </CardActions>
      </Card>
    </form>
  );
};

export default Register;
