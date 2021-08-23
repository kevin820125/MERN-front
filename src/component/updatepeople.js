import React , {useState , useEffect} from 'react';
import { useParams , useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Col} from "react-bootstrap";
import axios from 'axios';
import { Link } from "react-router-dom";



const UpdatePeople = () => {
    const history = useHistory();
    let {userid , teamid , dpid} = useParams();
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
        const res2 = await axios.get(`/teams/${teamid}`);
        const peopleList = res2.data.Team.people;
        peopleList.map((i , idx) => {
            if(i === parseInt(userid)){
                peopleList[idx] = parseInt(userId)
            }
        })
        if(!res.data.User || res.data.User.userId === parseInt(userId)){
          if(pass === 'true'){
              await axios({
                method: "put",
                url: `/users/${userid}`,
                data:{
                    user_id : userId,
                    name : name
                },
              })
              await axios({
                    method: "put",
                    url: `/teams/${teamid}`,
                    data:{
                        team_id : res2.data.Team.team_id,
                        teamLead : res2.data.Team.teamLead,
                        people : peopleList
                    },
                  })
                  console.log('completed')
                  history.push(`/departments/${dpid}/teams/${teamid}`)
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
            Update Person
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
  
  
  export default UpdatePeople