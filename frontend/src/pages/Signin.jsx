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

import CircularProgress from "@mui/material/CircularProgress";
import LockIcon from "@mui/icons-material/Lock";
import Alert from "@mui/material/Alert";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../store/slices/userSlice";

export default function Signin() {
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData) => {
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
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
                <Typography variant="h5">Sign in</Typography>
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
                  {loading ? <CircularProgress /> : "login"}
                </Button>
              </Grid>
              {errorMessage && (
                <Alert
                  variant="soft"
                  color="danger"
                  size="md"
                  sx={{
                    marginTop: "16px",
                    backgroundColor: "rgba(255, 0, 0, 0.1)",
                    color: "red",
                  }}
                >
                  {errorMessage}
                </Alert>
              )}
              <Grid item style={{ width: "100%", textAlign: "left" }}></Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
}
