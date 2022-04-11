import React, {useState, useEffect,useRef} from 'react'
import { isAuthenticated } from '../helpers/isAuthenticated';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';
import toastr from 'toastr'
import "toastr/build/toastr.css"
import UserPhoto from './UserPhoto';
import 'bootstrap/dist/css/bootstrap.min.css'
import { getOneUser } from '../core/ApiCore';
import "./sign.css"


const Profile = (props) => {

    const fileInput = useRef(null)
    const [inputHandle, setInputHandle]= useState(false)
    const [user, setUser] = useState({})
    let userId= isAuthenticated().user._id
    let token = isAuthenticated().token
     //console.log(userId + token)
    useEffect(()=>{
        
        getOneUser(userId,token)
        .then(res=>{
            setUser(res)

        })


    },[props])
   // console.log(user)
    /////////////////////


    const [formData, setFormData] = useState(new FormData()); 

    const [userPhoto, setUserPhoto] = useState({
      photo:'',      
  })

  const  UserPhotoChange =(e)=>{
      console.log(e.target.files)
    const value = e.target.id === 'photo' ? e.target.files[0] : e.target.value;
    
    formData.set(e.target.id, value)

    setUserPhoto({[e.target.id]:value})
        
    // }

    
}

    const submitUserPhoto=(e)=>{
      // e.preventDefault()

      fetch(`${API_URL}/user/uploaduserphoto/${userId}`, {
          method: "POST",
          headers: {
              "Accept": "application/json",
              "Authorization": `Bearer ${token}`
          },
          body: formData
      })
      .then(res=>res.json())
      .then(res=>{
          if(res.error){
              toastr.warning(res.error, "Please check you Photo !",{
                  "positionClass": "toast-bottom-left",
              })
          }

          else{
              toastr.success(`${user.name}  you changed your Photo  `,"Successfully",{
                  "positionClass": "toast-bottom-left",
              })
              
              setUserPhoto({
                  photo: '',
              })

              setFormData(new FormData())
          }
      })
      .catch(err=>toastr.error(err, "server error !",{
          "positionClass": "toast-bottom-left",
      }))
  }


    //////////////////

/////////////////

    const userInfo= ()=>{
        return(
                <div className="container">
                  <div className="main-body">
                        <nav aria-label="breadcrumb" className="main-breadcrumb">
                          <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a >Home</a></li>
                            <li className="breadcrumb-item"><a >User</a></li>
                            <li className="breadcrumb-item active" aria-current="page">User Profile</li>
                          </ol>
                        </nav>

                        <div className="row gutters-sm">
                          <div className="col-md-4 mb-3">
                            <div className="card">
                              <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                <UserPhoto className='userinformationphoto rounded-circle' id={isAuthenticated().user._id} name={isAuthenticated().user.name}  ></UserPhoto>
                                  
                                  <div className="my-3">
                                    <h4> {user.firstname} {user.lastname}</h4>
                                    
                                    <div class="my-4">
                                    <p className="text-secondary mb-1">Add Photo </p>
                                        <input  
                                            onChange={UserPhotoChange} 
                                            class="form-control" 
                                            type="file" 
                                            id="photo"
                                            style={{display:"none"}}
                                            ref={fileInput} 
                                             />
                                      {!inputHandle?  <button 
                                              onClick={()=> {fileInput.current.click(); setInputHandle(true)}} 
                                              className="my-2 btn btn-outline-primary"
                                              >
                                                Change Photo
                                              </button>
                                      :""}      

                                    </div>

                                    {inputHandle? <button 
                                      onClick={submitUserPhoto} 
                                      className=" btn btn-outline-primary"

                                      >
                                      Save
                                      </button>: ""}

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="card mb-3">
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-sm-3">
                                    <h6 className="mb-0 text-secondary">First Name :</h6>
                                  </div>
                                  <div className="col-sm-9 ">
                                    {user.firstname}
                                  </div>
                                </div>
                                <hr/>
                                <div className="row">
                                  <div className="col-sm-3">
                                    <h6 className="mb-0 text-secondary">Last Name: </h6>
                                  </div>
                                  <div className="col-sm-9">
                                    {user.lastname}
                                  </div>
                                </div>
                                <hr/>
                                <div className="row">
                                  <div className="col-sm-3 text-secondary">
                                    <h6 className="mb-0">Email: </h6>
                                  </div>
                                  <div className="col-sm-9">
                                  {user.email}
                                  </div>
                                </div>
                                <hr/>
                                <div className="row">
                                  <div className="col-sm-3 text-secondary">
                                    <h6 className="mb-0">Phone: </h6>
                                  </div>
                                  <div className="col-sm-9">
                                      0{user.phone}
                                  </div>
                                </div>
                                <hr/>
                                <div className="row">
                                  <div className="col-sm-3 text-secondary">
                                    <h6 className="mb-0">Committee: </h6>
                                  </div>
                                  <div className="col-sm-9 ">
                                      {user.committee}
                                  </div>
                                </div>
                                <hr/>
                                <div className="row">
                                  <div className="col-sm-3 text-secondary">
                                    <h6 className="mb-0">IEEE ID: </h6>
                                  </div>
                                  <div className="col-sm-9 ">
                                      {user.ieeeId}
                                  </div>
                                </div>

                                <hr/>
                                <div className="row">
                                  <div className="col-sm-3 text-secondary">
                                    <h6 className="mb-0">Branch: </h6>
                                  </div>
                                  <div className="col-sm-9">
                                      {user.branch}
                                  </div>
                                </div>

                                <hr/>
                                <div className="row">
                                  <div className="col-sm-3">
                                    <h6 className="mb-0 text-secondary">Status: </h6>
                                  </div>
                                  <div className="col-sm-9">
                                    {!user.status ? "Pending..." : "Verified" }
                                  </div>
                                </div>
                                <hr/>
                                <div className="row">
                                  <div className="col-sm-12">
                                  <Link  className="d-flex justify-content-center" style={{width:"200px !important"}} to='/editprofile' variant="body2">
                                              <button 
                                                className="my-2 btn btn-outline-primary px-5"
                                              >
                                                Edit
                                              </button>
                                  </Link>
                                  </div>
                                </div>
                              </div>
                            </div>

                


                          </div>
                        </div>

                      </div>
                </div>
            
        )
    }

    return (
        <div>
             <div className="row justify-content-center mt-5">


                    <div className="col-md-6">
                            {userInfo()} 
                    </div>


                </div>
            
        </div>
    )
}

export default Profile
