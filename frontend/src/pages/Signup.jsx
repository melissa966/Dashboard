import {
  Avatar,
  Grid,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
} from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress"; // Assurez-vous d'utiliser le chemin correct

import LockIcon from "@mui/icons-material/Lock";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Signup() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit: handleFormSubmit, // Renommer la fonction handleSubmit
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
const navigate=useNavigate();
  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if(res.ok){
        navigate('/signin')
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit(onSubmit)}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Paper
            elevation={10}
            style={{ padding: 30, width: 350, margin: "auto" }}
          >
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item>
                <Avatar style={{ backgroundColor: "#3739d7" }}>
                  <LockIcon />
                </Avatar>
              </Grid>
              <Grid item>
                <Typography variant="h5">Signup</Typography>
              </Grid>
              <Grid item style={{ width: "100%" }}>
                <TextField
                  {...register("username", { required: "This is required" })}
                  id="username"
                  label="Username*"
                  variant="standard"
                  placeholder="Enter your username"
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              </Grid>

              <Grid item style={{ width: "100%" }}>
                <TextField
                  {...register("email", { required: "This is required" })}
                  id="email"
                  label="Email*"
                  variant="standard"
                  placeholder="Enter your email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item style={{ width: "100%" }}>
                <TextField
                  {...register("password", { required: "This is required" })}
                  id="password"
                  label="Password*"
                  variant="standard"
                  placeholder="Enter your password"
                  type="password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item style={{ width: "100%", textAlign: "left" }}>
                <FormControlLabel control={<Checkbox />} label="Remember me" />
              </Grid>
              <Grid item style={{ width: "100%" }}>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? <CircularProgress /> : "Register"}
                </Button>
              </Grid>
              <Grid item style={{ width: "100%", textAlign: "left" }}></Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
}
