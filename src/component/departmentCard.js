import React , {useState , useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";



const DepartmentCard = () =>{
    let initialArray = [];
    const [info , setInfo] = useState(null);
    const [ready , setReady] = useState(false);
    const [team , setTeam] = useState(initialArray);
    let {id} = useParams();
    useEffect(() =>{
        async function getInfo(){
            try{
                setTeam(initialArray);
                const res =await axios.get(`/departments/${id}`);
                setInfo(res.data.Department)
                for(let i of res.data.Department.teams){
                    setTeam(old => [...old , i])
                }
                setReady(true)
            }catch(e){
                console.log(e)
            }
        }
        getInfo();
    },[])


    return(
        <div>
            {ready?
            <div>
                <div>Department Information</div>
                <div>Department ID : {info.department_id}</div>
                <div>Department name : {info.name}</div>
                <div>Department inCharge Person : {info.inCharge}</div>
                <div>Teams:</div>
                {team.map(t => (
                    <li><Link to={`/departments/${info.department_id}/teams/${t}`}>{t}</Link></li>
                ))}
                    <Link to={`/departments/${info.department_id}/update`}>
                    <button>
                        Update Department
                    </button>
                    </Link>
            </div>
        : <div>Loading...</div>}
        {console.log(info)}
        <Link to={`/`}>
        <button>
            Back to Home
        </button>
        </Link>
        </div>
    )
}

export default DepartmentCard