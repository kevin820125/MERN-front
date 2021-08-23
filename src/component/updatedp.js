import React , {useState , useEffect} from 'react';
import { useParams , useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Col} from "react-bootstrap";
import axios from 'axios';
import { Link } from "react-router-dom";
import "./dp.css";


const Updatedp = () =>{
    let {id} = useParams();
    const initial = {
        dpId:'',
        teams : '',
        inCharge : '',
        duplicate:''
    }
  const re = /^[0-9\b]+$/;
  const history = useHistory();
  const [dpId, setdpId] = useState("");
  const [name, setName] = useState("");
  const [teams, setTeams] = useState("");
  const [inCharge, setinCharge] = useState("");
  const [teamList , setTeamList] = useState([]);
  const [error , setError] = useState(initial)
  const [pass , setPass] = useState('false')


  useEffect(() => {
    check();
    return () => {
      setError(initial)
    }
  }, [dpId , teams , inCharge])



  async function handleSubmit(event) {
    setError(initial);
    event.preventDefault();
    console.log(error)
    try{
        const res = await axios.get(`/departments/${dpId}`);
        console.log(res)
        if(res.data.Department.department_id === parseInt(dpId) || !res.data.Department){
            if(pass === 'true'){
                await axios({
                    method: "put",
                    url: `/departments/${id}`,
                    data:{
                        department_id : dpId,
                        name: name,
                        teams : teamList,
                        inCharge : inCharge
                    },
                  })
                history.push('/')
            }
        }else{
            setError({...error ,duplicate : 'duplicate id' })
        } 
    } catch(e){
        console.log(e)
    }
  }


 function check(){
    setTeamList([])
    if(dpId.length>0 && !re.test(dpId)){
        setError({...error , dpId : "dpId must be integer"})
        return false;
    }
    if(inCharge.length>0 && !re.test(inCharge)){
        setError({...error , inCharge : " inCharge must be integer"})
        return false;
    }
    let l = teams.split(',')
    if(teams.length > 0){
      for(let i of l){
        if(!re.test(i)){
            setError({...error , teams : " teams must be integer"})
            return false;
            break;
        }else{
            setTeamList(old =>[...old , parseInt(i)])
        }
    }
    }
    setPass('true')
 }

  function validateForm() {
    return dpId.length > 0 && name.length > 0 && inCharge.length > 0;
  }


  return (
    <div className="Login"> 
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="dpId">
          <Form.Label>Department_id : </Form.Label>
          <Form.Control
            autoFocus
            type="dpId"
            value={dpId}
            onChange={(e) => setdpId(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="name">
          <Form.Label>Department Name : </Form.Label>
          <Form.Control
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="teams">
          <Form.Label>Department teams (use comma to seperate team) : </Form.Label>
          <Form.Control
            type="teams"
            value={teams}
            onChange={(e) => setTeams(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="inCharge">
          <Form.Label>inCharge Person_ID : </Form.Label>
          <Form.Control
            type="inCharge"
            value={inCharge}
            onChange={(e) => setinCharge(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Update Department 
        </Button>
      </Form>
      <Link to={`/`}>
        <div>
            Back to Home
        </div>
        </Link>
      <Col>
            {error.duplicate.length > 0 ? <p className='error'>{error.duplicate}</p> : null}
            {error.dpId.length > 0 ? <p className='error'>{error.dpId}</p> : null}
            {error.teams.length > 0 ? <p className='error'>{error.teams}</p> : null}
            {error.inCharge.length > 0 ? <p className='error'>{error.inCharge}</p> : null}
      </Col>
    </div>
  );
}


export default Updatedp