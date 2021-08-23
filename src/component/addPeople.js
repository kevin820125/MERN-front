import React, { useState , useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import {Col} from "react-bootstrap";
import "./dp.css";
import { Link } from "react-router-dom";

const AppPeople = () => {
  const initial = {
    userId : '',
}
  const re = /^[0-9\b]+$/;
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [error , setError] = useState(initial);
  const [success , setSuccess] = useState('');
  const [pass , setPass] = useState('false')



  useEffect(() => {
    check();
    return () => {
      setError(initial)
    }
  }, [userId])

 async function handleSubmit(event) {
    setError(initial);
    setSuccess('');
    event.preventDefault();
    try{
      const res = await axios.get(`/users/${userId}`);
      if(!res.data.User){
        if(pass === 'true'){
            await axios({
                method: "post",
                url: "/users",
                data:{
                    user_id : userId,
                    name : name
                },
              })
            setSuccess(' add team Successfully!')
            setName('');
            setUserId('')
            setPass('false');
        }
    }else{
        setError({...error ,userId : 'duplicate id' })
    } 
    }catch(e){
      console.log(e)
    }
  }




  function check(){
    if(userId.length > 0 && !re.test(userId)){
      setError({...error , teamId : "userId must be Integer"})
    }
    setPass('true')
  }



  function validateForm() {
    return userId.length > 0 && name.length > 0;
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="userId">
          <Form.Label>userId</Form.Label>
          <Form.Control
            autoFocus
            type="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="name">
          <Form.Label>user Name</Form.Label>
          <Form.Control
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          AddPerson
        </Button>
      </Form>
      <Link to={`/`}>
        <div>
            Back to Home
        </div>
        </Link>
      <Col>
            {error.userId.length > 0 ? <p className='error'>{error.userId}</p> : null}
            {success.length > 0 ? <p>{success}</p> : null}
      </Col>
    </div>
  );
}


export default AppPeople