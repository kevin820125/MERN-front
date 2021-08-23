import React , {useState , useEffect} from 'react';
import axios from 'axios';
import { useParams , useHistory } from "react-router-dom";
import { Link } from "react-router-dom";


const DepartmentCard = () =>{
    const history = useHistory();
    const [info , setInfo] = useState(null);
    const [ready , setReady] = useState(false);
    const [suc , setSuc] = useState('')
    let {dpid , teamid , userid} = useParams();
    useEffect(() =>{
        async function getInfo(){
            try{
                const res =await axios.get(`/users/${userid}`);
                console.log('this is res' + res)
                setInfo(res.data.User)
                if(res.data.User){
                    setReady(true)
                }else{
                    setSuc('No such a team , you can add it')
                }
            }catch(e){
                console.log(e)
            }
        }
        getInfo();
    },[])

    function goBack(){
        history.goBack();
    }
    return(
        <div>
            {ready?
            <div>
                <div>Person Information</div>
                <div>Person name : {info.name}</div>
                <div>Person ID : {info.user_id}</div>
                <button onClick={goBack}>Go Back</button>
                <Link to={`/departments/${dpid}/teams/${teamid}/users/${info.user_id}/update`}>
                    <button>
                        Update Person
                    </button>
                    </Link>
            </div>
        : <div>Loading...</div>}
        {suc ? <div>Oops , looks like you havn't had this person's information, create one!<Link to={'/addpeople'}>Create person</Link></div> : null}
        </div>
    )
}

export default DepartmentCard