import React from 'react'
import AdminDashboard from './AdminDashboard'
import 'bootstrap/dist/css/bootstrap.min.css'
import Tables from './Tables'

const UserList = () => {
    return (
        
        <div className="container-fluid">
            <div className="row align-items-start d-flex justify-content-around">
            <div className="col-2" style={{padding:0}}>
                    <AdminDashboard/>
            </div>
            <div className="col-10">
                <Tables/>
            </div>
            </div>
        </div>
    )
}

export default UserList
