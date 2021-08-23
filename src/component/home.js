import React , {useState , useEffect} from 'react';
import axios from 'axios';
import { set } from 'mongoose';
import Department from './department.js'
import { Link } from "react-router-dom";

const HomePage = () =>{
    const [data, setData] =useState(null);
    const [ready , setready] = useState(false)
  useEffect(() => {
    async function dp(){
      let res = await axios.get('/departments')
      setData(res.data)
      setready(true)
    }
    dp();
  }, []);


    return(
        <div>
          <div>Department List</div>
          {ready ?             
          data.map((d , idx) =>(
             <ul><Department
                key = {idx}
                name = {d.name}
                id = {d.department_id}
             ></Department></ul>
            )
            )
             : 
            <div>loading...</div>}
        <Link to={`/adddp`}>
        <button>
            Add Department
        </button>
        </Link>
        <Link to={`/addteam`}>
        <button>
            Add Team
        </button>
        </Link>
        <Link to={`/addpeople`}>
        <button>
            Add person
        </button>
        </Link>
        </div>

            
    )

}

export default HomePage