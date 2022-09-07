import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

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

    const [startDate, setStartDate] = useState(new Date());

    const dateChange = (date) => {
        setStartDate(date);
        console.log(moment(date).format());
    }

    const addBet = (event) => {
        event.preventDefault();

        console.log(startDate);
    }

    return(
        <div>
            <h1>Add a bet!</h1>
            <form onSubmit={() => addBet(event)}>
            <h3>Pick to win</h3>
            <select name="" id="">
                <option value="0">Select a Team</option>
                {teams.map( team => {
                    return(
                        <option key={team.id} value={team}>{team.team_full_name}</option>
                    )
                })}
            </select>
            <input type="text" placeholder="Your picks moneyline" />
            <h3>Opponent</h3>
            <select name="" id="">
                <option value="0">Select a Team</option>
                {teams.map( team => {
                    return(
                        <option key={team.id} value={team}>{team.team_full_name}</option>
                    )
                })}
            </select>

            <input type="text" placeholder="Opponents moneyline"/>
            <h3>Date/Time</h3>
            {/* Would like this to be a calendar select and a time select... */}
            <DatePicker selected={startDate} showTimeSelect dateFormat="Pp" onChange={(date) => dateChange(date)} />
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddBet;

// showTimeSelect dateFormat="Pp"
//2022-09-08T20:20:00