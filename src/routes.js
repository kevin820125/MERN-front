import React , {useState} from "react";
import { Switch, Route } from "react-router-dom";
import Home from './component/home.js'
import TeamCard from "./component/teamCard.js";
import DepartmentCard from "./component/departmentCard.js";
import PeopleCard from './component/peopleCard.js'
import AddDp from "./component/addDp.js";
import AddTeam from './component/addTeam.js'
import AddPeople from './component/addPeople.js'
import Updatedp from './component/updatedp.js'
import UpdateTeam from './component/updateteam.js'
import UpdatePeople from "./component/updatepeople.js";
const Routes = () =>{
    return(
        <Switch>
            <Route exact path='/'>
                <Home/>
            </Route>
            <Route exact path='/departments/:id'>
                <DepartmentCard/>
            </Route>
            <Route exact path='/departments/:id/update'>
                <Updatedp/>
            </Route>
            <Route exact path='/departments/:dpid/teams/:teamid'>
                <TeamCard/>
            </Route>
            <Route exact path='/departments/:dpid/teams/:teamid/update'>
                <UpdateTeam/>
            </Route>
            <Route exact path='/departments/:dpid/teams/:teamid/users/:userid/update'>
                <UpdatePeople/>
            </Route>
            <Route exact path='/departments/:dpid/teams/:teamid/users/:userid'>
                <PeopleCard/>
            </Route>
            <Route exact path="/adddp">
                <AddDp />
            </Route>
            <Route exact path="/addteam">
                <AddTeam />
            </Route>
            <Route exact path="/addpeople">
                <AddPeople/>
            </Route>
        </Switch>
    )
}



export default Routes;