import {
  Alert,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import { login } from "../../http/api";
import { profileQuery } from "../../http/queries";
import { useQuery } from "@tanstack/react-query";
import Hero from "../../assets/hero.png";
import Logo from "../../assets/logo.jpg";

export const loader = queryClient => async () => {
  try {
    let query = profileQuery();
    let data =
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query));

    if (!data) {
      return [];
    }

    if (data?.status === 200) {
      return redirect("/journal");
    }
    return {
      status: 401,
      message: "Unauthorized",
    };
  } catch (e) {
    return e;
  }
};

export const action =
  () =>
  async ({ request }) => {
    const errors = {};
    try {
      const formData = await request.formData();
      const credentials = Object.fromEntries(formData);
      if (credentials.Username === "") {
        errors.username = "Username is required";
      }

      if (credentials.Password === "") {
        errors.password = "Password is required";
      }

      if (Object.keys(errors).length === 0) {
        const res = await login(credentials);
        if (res.status === 201) {
          localStorage.setItem("token", res.data.access_token);
          return redirect("/journal");
        }
      }
      return errors;
    } catch (e) {
      if (e?.response?.data?.message) {
        errors.message = e?.response?.data?.message;
      }
      return errors;
    }
  };

const Login = () => {
  let errors = useActionData();
  const theme = useTheme();
  const [openAlert, setOpenAlert] = useState(false);
  const { data } = useQuery(profileQuery());
  console.log(data);
  const closeAlert = () => {
    errors = {};
    setOpenAlert(false);
    return;
  };

  useEffect(() => {
    if (errors?.message) {
      setOpenAlert(true);
    }
  }, [errors]);

  return (
    <Grid
      container
      sx={{
        width: "80vw",
        boxShadow: "0 0 4px rgba(0,0,0, 0.2)",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        justifyContent: "center",
        margin: "auto",
        borderRadius: 1,

        "& .MuiTextField-root": {
          m: 1,
          textAlign: "center",
          marginX: "auto",
        },

        "& .MuiContainer-root": {
          width: "80%",
          mx: "auto",
          my: 2,
        },

        "& .MuiButton-root": {
          width: "70%",
          mx: "auto",
          display: "block",
          my: 2,
        },
      }}
    >
      <Grid item xs={12} md={6} sx={{ background: "black" }}>
        <img
          src={Hero}
          alt="SMK HU"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Grid>
      <Grid item xs={12} md={6} sx={{ padding: "2rem" }}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={Logo}
            alt="logo SMK HU"
            style={{
              width: 50,
              objectFit: "contain",
              marginRight: 10,
            }}
          />
          <Typography sx={{ textAlign: "center" }} variant="h6">
            SMK HU BATAM
          </Typography>
        </Container>

        <Form method="post">
          <Container>
            {errors?.username && (
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.error.light,
                  mt: 2,
                }}
              >
                {errors?.username}
              </Typography>
            )}

            <TextField
              fullWidth
              label="Username"
              id="username"
              name="Username"
              variant="outlined"
            />
            {errors?.password && (
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.error.light,
                  mt: 2,
                }}
              >
                {errors?.password}
              </Typography>
            )}

            <TextField
              fullWidth
              label="Password"
              id="password"
              name="Password"
              type="password"
              variant="outlined"
            />
          </Container>

          <Button type="submit" variant="contained">
            Login
          </Button>
        </Form>
        {openAlert && (
          <Alert
            severity="error"
            onClose={closeAlert}
            sx={{ width: "65%", mx: "auto" }}
          >
            {errors?.message}
          </Alert>
        )}
      </Grid>
    </Grid>
  );
};

export default Login;
