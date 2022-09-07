import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function AddBet() {
    useEffect(() => {
        getTeamsFromDatabase();
    }, []);

    const teams = useSelector(store => store.teams);
    const dispatch = useDispatch();

    const getTeamsFromDatabase = () => {
        dispatch({
            type: 'GET_TEAMS'
        })
    }

    return(
        <div>
            <h1>Add a bet!</h1>
            <h3>Pick to win</h3>
            <select name="" id="">
                <option value="0">Select a Team</option>
                {teams.map( team => {
                    return(
                        <option value={team}>{team.team_full_name}</option>
                    )
                })}
            </select>
            <input type="text" placeholder="Your picks moneyline" />
            <h3>Opponent</h3>
            <select name="" id="">
                <option value="0">Select a Team</option>
                {teams.map( team => {
                    return(
                        <option value={team}>{team.team_full_name}</option>
                    )
                })}
            </select>
            <input type="text" placeholder="Opponents moneyline"/>
            <h3>Date/Time</h3>
            {/* Would like this to be a calendar select and a time select... */}
            <input type="text" placeholder="example 2022-09-08T16:00"/>
        </div>
    )
}

export default AddBet;