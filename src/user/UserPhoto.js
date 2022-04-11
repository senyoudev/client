import React, {useEffect,useState} from 'react'
import { API_URL } from '../config'
import logo from "../img/logo.png"
import defaultPhoto from "../img/defaultPhoto.png"


const UserPhoto = ({className,id, name}) => {

    const [photoNotDisponile, setPhotoNotDisponile] = useState(false)
    const httpLoadPhot =   ()=>{
        return fetch(`${API_URL}/user/photo/${id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type":"application/json",
                // Authorization: `Bearer ${token}`
    
            },
    
        })
        .then(res=>res.json())
        // .then(res=>{console.log(res)})
        .catch(err=>console.error(err))
    
    }
    

    useEffect(
        () => {
        httpLoadPhot().then(res=>{
            if(res.error){
                setPhotoNotDisponile(true)
            }
        })
        }
    ,[id])


    if(photoNotDisponile){
        return <img className={className} src={defaultPhoto}  alt={`${name}`} />
    }
    else{
        return <img className={className} src={`${API_URL}/user/photo/${id}`}  alt={`${name}`} />
    }
    


    
}

export default UserPhoto
