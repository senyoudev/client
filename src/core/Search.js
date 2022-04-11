import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import { Link } from "react-router-dom";
import { searchUsers } from './ApiCore';

const Search = (props) => {

    const [searchData, setSearchData] = useState('')


    const handleChange=(e)=>{
        setSearchData({...searchData, [e.target.id]:e.target.value})
    }


    //setUserList



    const searchSubmit = (e)=>{
        e.preventDefault();

        if(searchData){
            searchUsers(searchData)
            .then(res=>props.setUserList(res))
        }
        else{
            // setProducts([])
        }



        //console.log(products)
    }



    return (
        <form className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control  onChange={handleChange}  type="text" placeholder="Search" />
            </InputGroup>
          </Col>
        </Row>
      </form>
    )
}

export default Search
