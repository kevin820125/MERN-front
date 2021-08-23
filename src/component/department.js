import React from 'react';
import { Link } from "react-router-dom";




const Department = ({id, name}) =>{
    

    return(
        <Link to={`/departments/${id}`}>
        <div>
            {name}
        </div>
        </Link>
    )
}







export default Department