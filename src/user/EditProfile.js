import { useState,useEffect } from 'react';
import * as React from 'react';
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
import { isAuthenticated } from '../helpers/isAuthenticated';
import { getOneUser } from '../core/ApiCore';



////////////////














function EditProfile(props) {


   
    let userId= isAuthenticated().user._id
    let token = isAuthenticated().token
   
    const [user, setUser] = useState({

    })

    const [tempUser, setTempUser] = useState({})

    useEffect(()=>{
        
        getOneUser(userId,token)
        .then(res=>{
          setTempUser(res)

        })


    },[props])

const handleChange = (e) =>{
    setUser({...user,[e.target.id]:e.target.value})
    
    }
    
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${API_URL}/user/${userId}`,{
            method:"PUT",
            headers:{
                "Accpet":"application/json",
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            },
            body:JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.error){
                
                toastr.warning(res.error, "Please check your form !",{
                    "positionClass": "toast-bottom-left",
                })
            }
    
            else{
                toastr.success("Account Updated ","successfully",{
                    "positionClass": "toast-bottom-left",
                })
                console.log(res)
                props.history.push('/profile')
            }
        })
        .catch(err=>toastr.error(err, "server error !",{
            "positionClass": "toast-bottom-left",
        }))
      }
    
    






    return (
        <div>
        <Container component="main" maxWidth="xl">

             <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              <Grid item xs={12} >
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
  

              <Grid item xs={12}>
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

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="ieeeId"
                  label="IEEE Member Id"
                  name="ieeeId"
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#026EA4' }}
            >
              Save
            </Button>
          </Box>
          </Container>
        </div>
    )
}

export default EditProfile
