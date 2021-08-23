import React , {useState , useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Link , Redirect } from "react-router-dom";


const TeamCard = () =>{
    const init = [];
    const [info , setInfo] = useState(null);
    const [ready , setReady] = useState(false);
    const [people , setPeople] = useState(init);
    const [noTeamFound , setNoTeamFound] = useState('')
    let {dpid,teamid} = useParams();
    useEffect(() =>{
        setPeople(init)
        async function getInfo(){
            try{
                const res =await axios.get(`/teams/${teamid}`);
                setInfo(res.data.Team)
                for(let i of res.data.Team.people){
                    setPeople(old => [...old , i])
                }
                setReady(true)
            }catch(e){
                setNoTeamFound('No such a team , you can add it')
            }
        }
        getInfo();
    },[])


    return(
        <div>
            {ready?
            <div>
                <div>Teams Information</div>
                <div>Team Id: {info.team_id}</div>
                <div>Team Lead: {info.teamLead}</div>
                <div>{info.inCharge}</div>
                <div>People:</div>
                {people.map(t => (
                    <li><Link to={`${teamid}/users/${t}`}>{t}</Link></li>
                ))}
            <button><Link to='/'>Go Home</Link></button>
            <Link to={`/departments/${dpid}/teams/${info.team_id}/update`}>
                    <button>
                        Update Team
                    </button>
                    </Link>
            </div>
        : <div>Loading...</div>}
        <div>
            {noTeamFound ? <div>Oops , you haven't create this team , please click here to create a team! <Link to={'/addteam'}>Create Team</Link></div> : null}
        </div>
        </div>
    )
}



export default TeamCard