import React from 'react';
 import AdminDashboard from "../admin/AdminDashboard"
import NewPost from './NewPost';

import 'bootstrap/dist/css/bootstrap.min.css';






const Post = () => {
  return <div className="row" style={{ width:'100%'}}>
                    <div className="col-3 m-0 p-0" >
                       <AdminDashboard/>
                    </div>
                    <div className="col-9 p-0 m-0" >
                        <NewPost/>
                    </div>
        </div>;
};

export default Post;
