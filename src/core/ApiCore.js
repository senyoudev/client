import { API_URL } from "../config"
import { isAuthenticated } from '../helpers/isAuthenticated';


export const getOneUser = (id,token)=>{
    return fetch(`${API_URL}/user/${id}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },

    })
    .then(res=>res.json())
    .then(res=>res.user)
    .catch(err=>console.error(err))


}


export const setUserPhoto = (id,token)=>{
    return fetch(`${API_URL}/user/uploaduserphoto/${id}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },

    })
    .then(res=>res.json())
    .then(res=>res.user)
    .catch(err=>console.error(err))


}


export const AllUsers = (limit,skip)=>{
    

    return fetch(`${API_URL}/user?limit=${limit}&skip=${skip}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${isAuthenticated().token}`

        },

    })
    .then(res=>res.json())
    .then(res=>res.users)
    .catch(err=>console.error(err))


}


export const searchUsers = (search)=>{
    

    return fetch(`${API_URL}/user?search=${search}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${isAuthenticated().token}`

        },

    })
    .then(res=>res.json())
    .then(res=>res.users)
    .catch(err=>console.error(err))


}


export const httpVerifyUser = (id)=>{
    
    


}


export const httpDelteUser =   (id,token)=>{
    return fetch(`${API_URL}/user/${id}`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`

        },

    })
    // .then(res=>res.json())
    .then(res=>{console.log(res)})
    .catch(err=>console.error(err))


}



//-----------Post requests

// export const httpCreatePost = (id,formData)=>{

    
  
// }

// export const httpAllPosts = (id,token)=>{

// }

// export const httpUpdatePost = (id,token)=>{

// }

// export const httpDeletePost = (id,token)=>{

// }

