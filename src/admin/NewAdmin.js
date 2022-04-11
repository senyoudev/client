import React from 'react'
import AdminDashboard from './AdminDashboard'

import 'bootstrap/dist/css/bootstrap.min.css'

const NewAdmin = () => {
    return (
        <div className="container-fluid">
        <div className="row align-items-center d-flex justify-content-between">
        <div className="col" style={{padding:0}}>
                <AdminDashboard/>
        </div>
        <div className="col">
                New Admin
        </div>
        </div>
    </div>
    )
}

export default NewAdmin
