import React, {useState, useEffect,useRef} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { API_URL } from '../config';
import toastr from 'toastr'
import "toastr/build/toastr.css"
import { Link } from 'react-router-dom';
import "../user/sign.css"

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link style={{color:"#888"}} to="/about">
      IEEE ENSAF SB
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp(props) {

    const [user, setUser] = useState({
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        phone:"",
        city:"",
        branch:"",
        committee:"",
        ieeeId:""
})



  const handleChange = (e) =>{
    setUser({...user, [e.target.id]:e.target.value})

  }
    
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/signup`,{
        method:"POST",
        headers:{
            "Accpet":"application/json",
            "Content-Type":"application/json",
        },
        body:JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(res=>{
        if(res.error){
            
            toastr.warning(res.error, "Please check your form !",{
                "positionClass": "toast-bottom-left",
                "progressBar": true,
            })
        }

        else{
            toastr.success("user is created successfully","New Account",{
                "positionClass": "toast-bottom-left",
                "progressBar": true,
            })
            console.log(res)
            props.history.push('/signin')
        }
    })
    .catch(err=>toastr.error(err, "server error !",{
        "positionClass": "toast-bottom-left",
        "progressBar": true,
    }))
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, backgroundColor: '#F3A520' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Create an Account
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>
  

              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  type="number"
                  id="phone"
                  label="Phone"
                  name="pho,e"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="branch"
                  label="Branch"
                  name="branch"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="committee"
                  label="Committee"
                  name="committee"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>

              


              <Grid   item xs={12}>
                <TextField
                  sx={{ borderColor: '#d01257 !important' }} 
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="ieeeId"
                  label="Ieee Id"
                  type="number"
                  id="ieeeId"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#026EA4' }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link style={{color:"#888"}} to='/signin' variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}