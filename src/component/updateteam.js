import React , {useState , useEffect} from 'react';
import { useParams , useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Col} from "react-bootstrap";
import axios from 'axios';
import { Link } from "react-router-dom";

import "./dp.css";



const UpdateTeam = () => {
    const history = useHistory();
    let {dpid , teamid} = useParams();
    const initial = {
      teamId : '',
      teamLead : '',
      people : '',
  }
    const re = /^[0-9\b]+$/;
    const [upteamId, setTeamId] = useState("");
    const [teamLead, setTeamLead] = useState("");
    const [people, setPeople] = useState("");
    const [error , setError] = useState(initial);
    const [peopleList , setPeopleList] = useState([]);
    const [success , setSuccess] = useState('')
    const [pass , setPass] = useState('false')
  
  
  
    useEffect(() => {
      check();
      return () => {
        setError(initial)
      }
    }, [upteamId , teamLead , people])
  
   async function handleSubmit(event) {
      setError(initial);
      setSuccess('');
      event.preventDefault();
      try{
        const res = await axios.get(`/teams/${upteamId}`);
        const res2 = await axios.get(`/departments/${dpid}`);
        const teamList = res2.data.Department.teams;
        teamList.map((i , idx) => {
            if(i === parseInt(teamid)){
                teamList[idx] = parseInt(upteamId)
            }
      })
        if(res.data.Team.team_id === parseInt(upteamId) || !res.data.Team){
          if(pass === 'true'){
            await axios({
                  method: "put",
                  url: `/teams/${teamid}`,
                  data:{
                      team_id : upteamId,
                      teamLead : teamLead,
                      people : peopleList
                  },
                })
            await axios({
                method: "put",
                url: `/departments/${dpid}`,
                data:{
                    department_id : dpid,
                    name: res2.data.Department.name,
                    teams : teamList,
                    inCharge : res2.data.Department.inCharge
                },
              })
            history.push(`/departments/${dpid}`)
          }
      }else{
          setError({...error ,teamId : 'duplicate id' })
      } 
      }catch(e){
        console.log(e)
      }
    }
  
  
  
  
    function check(){
      setPeopleList([])
      if(upteamId.length > 0 && !re.test(upteamId)){
        setError({...error , teamId : "teamId must be Integer"})
      }
      if(teamLead.length > 0 && !re.test(teamLead)){
        setError({...error , teamId : "teamLead must be Integer"})
      }
      if(people.length > 0){
        let l = people.split(',')
        console.log('people' , l)
        for(let i of l){
          if(!re.test(i)){
              setError({...error , people: " people must be integer and must use comma to seperate and not end with comma"})
              return false;
              break;
          }else{
              setPeopleList(old =>[...old , parseInt(i)])
          }
      }
     }
      setPass('true')
    }
  
  
  
    function validateForm() {
      return upteamId.length > 0 && teamLead.length > 0;
    }
  
    return (
      <div className="Login">
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="upteamId">
            <Form.Label>teamId</Form.Label>
            <Form.Control
              autoFocus
              type="upteamId"
              value={upteamId}
              onChange={(e) => setTeamId(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="teamLead">
            <Form.Label>teamLead</Form.Label>
            <Form.Control
              type="teamLead"
              value={teamLead}
              onChange={(e) => setTeamLead(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="people">
            <Form.Label>people(usr comma to seperate) : </Form.Label>
            <Form.Control
              type="people"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Update Team
          </Button>
        </Form>
        <Link to={`/`}>
          <div>
              Back to Home
          </div>
          </Link>
        <Col>
              {error.teamId.length > 0 ? <p className='error'>{error.teamId}</p> : null}
              {error.teamLead.length > 0 ? <p className='error'>{error.teamLead}</p> : null}
              {error.people.length > 0 ? <p className='error'>{error.people}</p> : null}
              {success.length > 0 ? <p>{success}</p> : null}
        </Col>
      </div>
    );
  }
  
  
  export default UpdateTeam