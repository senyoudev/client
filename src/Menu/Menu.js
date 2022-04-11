import React from 'react'
import "./Menu.css"
import { Link, withRouter } from 'react-router-dom'
import { API_URL } from '../config';
import toastr from 'toastr'
import "toastr/build/toastr.css"
import { isAuthenticated } from '../helpers/isAuthenticated';
import UserPhoto from '../user/UserPhoto';
import logo from "../img/logo.png"


const isActive = (history, path)=>{
    if(history.location.pathname === path){
        return{color:"#F3A520"}
    }
    else{
        return {color:"#fff"}

    }
}



const Menu=(props)=> {
let id,name
if(isAuthenticated()){
    id = isAuthenticated().user._id
    name = isAuthenticated().user.name
}


const signout = ()=>{
    fetch(`${API_URL}/signout`)
    .then(()=>{
            toastr.success("user sgin out ","next time",{
                "positionClass": "toast-bottom-left",
            })
            localStorage.removeItem("JWT_Info")
            props.history.push('/signin')
    })

}









    return (




        /////////////////////////// 
        
        <div className="top">
            <a class="navbar-brand" href="#">
                 <img src={logo} alt="" width="125" height="50"/>
            </a>
            <div className="topcenter">
                <ul className="toplist">
                    <li className="topListItem">
                        <Link style={isActive(props.history,"/" )} to="/">Home</Link>
                    </li>
                    <li className="topListItem">
                        <Link style={isActive(props.history,"/courses" )} to="/courses">Courses</Link>
                    </li>
                    <li className="topListItem">
                        <Link style={isActive(props.history,"/about" )} to="/about">About</Link>
                    </li>
                    <li className="topListItem">
                        <Link style={isActive(props.history, "/contact")} to="/contact">Contact</Link>
                    </li>
                    
                </ul>
            </div>
            <div className="topright">
                    
                    {isAuthenticated() &&(
                        <>
                            {isAuthenticated() && isAuthenticated().user.role === 1 &&
                            <Link 
                                style={isActive(props.history, `${isAuthenticated() && isAuthenticated().user.role === 1 ? '/admin':''}/dashboard`)} 
                                className="nav-link" 
                                to={`${isAuthenticated() && isAuthenticated().user.role === 1 ? '/admin':''}/dashboard`}
                            >
                                 Dashboard
                            </Link>}
                            <Link to='/profile'>
                                <UserPhoto className="userphoto" id={isAuthenticated().user._id} name={isAuthenticated().user.name}  ></UserPhoto> 
                            </Link>                              
                        </>
                    )}
                    <ul className="toplist">
                        

                       {!isAuthenticated() && (<>
                            <li className="topListItem">
                                <Link style={isActive(props.history,"/signin" )} to="/signin">Sing in</Link>
                            </li>
                            <li className="topListItem">
                                <Link style={isActive(props.history,"/signup" )} to="/signup">Register</Link>
                            </li>
                        </>)}
                        {isAuthenticated() && (
                        <li className="topListItem">
                            <span style={isActive(props.history,"/logout" )} onClick={signout}>Logout</span>
                        </li>
                        )}
                    </ul>
            </div>
        </div> 
    )
}

export default withRouter(Menu)
