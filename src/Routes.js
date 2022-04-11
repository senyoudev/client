import React from 'react'
import {BrowserRouter ,Switch, Route} from 'react-router-dom'
import Home from './core/Home'
import Menu from './Menu/Menu'
import Signin from './user/Signin'
import Signup from './user/Signup'
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import AdminDashboard from './admin/AdminDashboard'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import { Courses } from './courses/Courses'
import UserList from './admin/UserList'
import NewAdmin from './admin/NewAdmin'
import Post from './post/Post'
import About from './about/About'
import Contact from './contact/Contact'


function Routes() {
    return (
            <BrowserRouter>
                <Menu></Menu>
                <Switch>
                    <PrivateRoute path="/" exact component={Home} />
                    <PrivateRoute path="/profile" exact component={Profile} />
                    <PrivateRoute path="/editprofile" exact component={EditProfile} />
                    <PrivateRoute path="/courses" exact component={Courses} />
                    <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                    <AdminRoute path="/admin/users" exact component={UserList} />
                    <AdminRoute path="/admin/addadmin" exact component={NewAdmin} />
                    <AdminRoute path="/admin/post" exact component={Post} />
                    <Route path="/signin" exact component={Signin} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/about" exact component={About} />
                    <Route path="/contact" exact component={Contact} />
                </Switch>

            </BrowserRouter>
)
}

export default Routes
