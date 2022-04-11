import React, { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MarkdownEditor from './MarkdownEditor';
import { TextField, Grid,FormControl,InputLabel,MenuItem,Select } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router';
// import formData from 'formdata';
import { API_URL } from "../config"
import { isAuthenticated } from '../helpers/isAuthenticated';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css';
import Spin from "react-cssfx-loading/lib/Spin";




import { httpCreatePost,
         httpAllPosts,
         httpUpdatePost,
         httpDeletePost} from "../core/ApiCore"



const NewPost = (props) => {
    const {user,token} = isAuthenticated();



const history = useHistory();

//post state
const [post, setPost] = useState({
    title:'',
    description:'',
})
const [formData, setFormData] = useState(new FormData()); 

//content
const [content, setContent] = useState("**Your Content!!!**");

//image state
const [image, setImage] = useState([]);

//Loading state

const [loadingSpin, setLoadingSpin] = useState(false);


//handle input
const handleChange =(e)=>{
  
      setPost({...post,[e.target.name]:e.target.value})

  }


  //handle image
  
const handleImage =(e)=>{  
     setImage({image:e.target.files[0]})

}

  


//submit post

  const submitPost=(e)=>{
        setLoadingSpin(true)
        e.preventDefault()
        // console.log(formData)
        formData.append('title', post.title)
        formData.append('description', post.description)
        formData.append('content', content)
        formData.append('photo', image.image)

        

    return fetch(`${API_URL}/post/create/${user._id}`, {
                  method: "POST",
                  headers: {
                      "Accept": "application/json",
                      Authorization: `Bearer ${token}`
                  },
                  body: formData

            })
            .then(res=>res.json())
            .then(res=>{
                if(res.error){
                    toastr.warning(res.error, "Please check you form !",{
                        "positionClass": "toast-bottom-left",
                        "progressBar": true,
                    })
                setLoadingSpin(false)

                }

                else{
                    toastr.success(`Product ${post.title} Created`,"New product",{
                        "positionClass": "toast-bottom-left",
                        "progressBar": true,
                    })
                    document.getElementById('photo').value= null;
                    document.getElementById('title').value= "";
                    document.getElementById('description').value= "";
                    setPost({
                        title: '',
                        description: '',
                        
                    })
                    setContent("**Your Content**")

                    setFormData(new FormData())
                    setLoadingSpin(false)

                }
            })
            .catch(err=>toastr.error(err, "server error !",{
                "positionClass": "toast-bottom-left",
                "progressBar": true,
            }))


  
  };



  return (
    
    <Container sx={{height: '100%', width: '100%',pt:3, m: 0 }}>
              <h3 className="text-secondary" >Create a new post</h3>

              <Box sx={{ width: '100%', borderRadius: 8,bgcolor: '#FFFFFF' ,height: '93%',boxShadow: 3,   }} >
              <form onSubmit={submitPost} id="post_form">

              <div className="row pt-4 " style={{ width:'100%'}}>
                  <div className="col-10 " >
                  
                        <Grid container justifyContent="center" spacing={2} sx={{p:5}}>
                              <Grid item xs={10}  >
                                  <TextField
                                  className="mt-4"
                                    sx={{p:5}}
                                    fullWidth
                                    label="Post Title"
                                    // id="filled-textarea standard-size-normal " 
                                    variant="filled"
                                    margin="dense" 
                                    name="title" 
                                    id="title" 
                                    onChange={handleChange}
                                    // value={value} 
                        
                                  />

                              </Grid>

                              <Grid item xs={10}>
                                <TextField
                                  fullWidth
                                  // id="filled-textarea standard-size-normal"
                                    variant="filled"
                                  label="Description"
                                  name="description" 
                                  id="description" 
                                  multiline
                                  rows={3}
                                  onChange={handleChange}
                                  // value={value}
                                />
                              </Grid>

                              <Grid item xs={11}>
                                <h6 className="mx-5 text-secondary mt-2">Content</h6>
                                <MarkdownEditor
                                  content ={content}
                                  setContent={setContent}
                                />
                                
                              </Grid>

                              <Grid item xs={10}>
                                <h6 className="mx-2 text-secondary mt-2">Upload Cover</h6>
                                <input onChange={handleImage}  id="photo" type="file" className="form-control-file mx-2" name="photo"  />


                              </Grid>
                              
                              <Grid item xs={10}>
                                {!loadingSpin &&  <button  className="my-4 btn btn-outline-primary mt-2 mx-2">New Post</button>}
                                {
                                  loadingSpin && <Spin></Spin>
                                }
                                

                              </Grid>


                          </Grid>


                      
                  </div>
                  {/* <div className="col-3" >

                         <Grid item xs={10}  >
                            <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label ">Category</InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="category"
                                    label="Category"
                                    name="category" 
                                    // defaultValue=
                                    onChange={handleChange}

                                  >
                                    {
                                      categories && (categories.map(category=>(
                                        <MenuItem index={category.id}    value={category.name}>{category.name}</MenuItem>
                                      )
                                      ))
                                    }

                                  </Select>
                                </FormControl>
                                <span className="d-block text-danger">{post.error_list.category}</span>

                        </Grid>
                        <button  className="my-4 btn btn-outline-primary">New Product</button>
                              
                  </div> */}
              </div>
              </form>

              </Box>


    </Container>






     

        
        
  );
};



export default NewPost
