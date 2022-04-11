
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup,Breadcrumb, InputGroup } from '@themesberg/react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import { API_URL } from "../config";
import { AllUsers, httpVerifyUser, httpDelteUser } from "../core/ApiCore";
import Spin from "react-cssfx-loading/lib/Spin";




import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
// import { Routes } from "../routes";
// import transactions from "../data/transactions";
import UserPhoto from "../user/UserPhoto";
import { isAuthenticated } from "../helpers/isAuthenticated";

import 'bootstrap/dist/css/bootstrap.min.css'

import Search from "../core/Search";


const Tables = (props) => {

    const [limit, setLimit] = useState(7)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [userList, setUserList] = useState()
    let token = isAuthenticated().token

    //Loading state
    const [loadingSpin, setLoadingSpin] = useState(false);
    


    useEffect(() => {
      setLoadingSpin(true)

        AllUsers(limit,skip)
        .then((res)=>{
              setUserList(res);
              setSkip(0)
              setSize(res.length)
              setLoadingSpin(false)

      })
    },[])



    const nextButton = ()=>{
      setLoadingSpin(true)
      
      const toskip = skip + limit

      AllUsers(limit,toskip)
        .then((res)=>{
             setUserList(res);
             setSize(res.length)
            setSkip(toskip)
            setLoadingSpin(false)

        
        })
  }

  const PreviousButton = ()=>{
    setLoadingSpin(true)

    const toskip = skip - limit

    AllUsers(limit,toskip)
      .then((res)=>{
           setUserList(res);
           setSize(res.length)
          setSkip(toskip)
          setLoadingSpin(false)

      })
}


const verifyUser = (id)=>{

    setLoadingSpin(true)

    httpVerifyUser(id).then((res)=>{
        AllUsers(limit,skip)
          .then((res)=>{
                setUserList(res);
                setSize(res.length)
                setLoadingSpin(false)

      })
    }
)

}


const deleteUser = (id)=>{
    setLoadingSpin(true)

    httpDelteUser(id,token).then((res)=>{
      AllUsers(limit,skip)
        .then((res)=>{
              setUserList(res);
              setSize(res.length)
              setLoadingSpin(false)

    })}
  )

}



  const pagination= ()=>{
    return(
        (   
            size > 0 &&(

                  <nav className="">
                    <ul className="pagination d-flex justify-content-between">
                      {(size < limit && skip  >= limit) ?
                      
                      ( 
                          <li className="page-item">
                            <Pagination.Prev onClick={PreviousButton}>
                              Previous
                            </Pagination.Prev>
                          </li>
                      )
                      :(
                          <li className="page-item disabled">
                            <Pagination.Prev onClick={PreviousButton}>
                              Previous
                            </Pagination.Prev>
                          </li>
                      )
                    
                    }
                      
                    {size >= limit ?
                    ( 
                          <li className="page-item">
                            <Pagination.Next onClick={nextButton} >
                                Next
                            </Pagination.Next>
                          </li>
                      ) :<li className="page-item disabled">
                      <Pagination.Next onClick={nextButton} >
                          Next
                      </Pagination.Next>
                    </li> }
                    </ul>
                  </nav>
            )
        )
      )
    
}

    




  const TableRow = ({user}) => {

    return (
      <tr>
          <td>
            <span className="text-lowercase">
            <UserPhoto className="userphoto" id={user._id} name={isAuthenticated().user.name}  ></UserPhoto> 
          </span>
        </td>
        <td>
            <span className="text-lowercase">
            {user.ieeeId}
          </span>
        </td>
        <td>
          <span className="text-lowercase">
            {user.firstname+" "+user.lastname}
          </span>
        </td>
        <td>
          <span className="text-lowercase">
            {user.committee}
          </span>
        </td>
        <td>
          <span className="text-lowercase">
            {user.branch}
          </span>
        </td>
        <td>
          <span className="text-lowercase">
            0{user.phone}
          </span>
        </td>
        <td>
          <span className={`text-lowercase}`}>
            {user.email}
          </span>
        </td>
        <td>
          <span className={`text-lowercase}`}>
            {
              user.status ? "Verifed" : <Dropdown.Item className="text-info"  onClick={()=>{verifyUser(user._id)}}>
                                            <FaCheckCircle className="me-2" /> Verify
                                        </Dropdown.Item>
            }
              
               {/* <button onClick={()=>{verifyUser(user._id)}} type="button" class="btn btn-danger"></button> */}

          </span>
        </td>
         <td>
              <Dropdown.Item className="text-danger"  onClick={()=>{deleteUser(user._id)}} >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
        </td> 
      </tr>
    );
  };

  return (

    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/admin/dashboard">   Dashboard</Link></Breadcrumb.Item>
            <Breadcrumb.Item active>Users List</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Members List</h4>
        </div>
      </div>
      
      <Search  userList={userList}  onClick={setUserList}/>




     <Card border="light" className="table-wrapper table-responsive shadow-sm">
     {loadingSpin && <div style={{display:"flex", justifyContent:"center",  width:"100%"}} className="p-5">   <Spin className="m-5"></Spin>  </div> }

   {!loadingSpin && userList &&   <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
            <th className="border-bottom">Photo</th>
              <th className="border-bottom">IEEE ID</th>
              <th className="border-bottom">Full Name</th>
              <th className="border-bottom">Committee</th>
              <th className="border-bottom">Branch</th>
              <th className="border-bottom">Phone</th>
              <th className="border-bottom">Email</th>
              <th className="border-bottom">ID Status</th>
              {/* <th className="border-bottom">Action</th> */}
            </tr>
          </thead>

          
          <tbody>
            { userList.map(user => <TableRow  key={user._id} user={user} />)} 
          </tbody>
            
        </Table>
         {/* <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between  bg-primary ">
          {pagination()}
          <small className="fw-bold"> 
            Showing <b>totalTransactions</b> out of <b>25</b> entries
          </small> 
        </Card.Footer>  */}

        {pagination()}

      </Card.Body> }
    </Card> 
    </>
  );
};



export default Tables