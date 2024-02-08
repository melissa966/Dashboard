import LockIcon from "@mui/icons-material/Lock";
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
import { useForm } from "react-hook-form";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user: "",
      email:"",
      password: "",
    },
  });

  console.log(watch());

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Paper elevation={10} style={{ padding: 30, width: 350, margin: "auto" }}>
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
                  {...register("user", { required: "This is required" })}
                  id="username"
                  label="Username*"
                  variant="standard"
                  placeholder="Enter your username"
                  fullWidth
                  error={errors.user?.message}
                  helperText={errors.user?.message}
                />
              </Grid>

              <Grid item style={{ width: "100%" }}>
                <TextField
                  {...register("email", { required: "This is required" })}
                  id="email"
                  label="email*"
                  variant="standard"
                  placeholder="Enter your email"
                  fullWidth
                  error={errors.email?.message}
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
                  error={errors.password?.message}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item style={{ width: "100%", textAlign: "left" }}>
                <FormControlLabel control={<Checkbox />} label="Remember me" />
              </Grid>
              <Grid item style={{ width: "100%" }}>
                <Button variant="contained" type="submit" fullWidth>
                  Register
                </Button>
              </Grid>
              <Grid item style={{ width: "100%", textAlign: "left" }}>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
}
