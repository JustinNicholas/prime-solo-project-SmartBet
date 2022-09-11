import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

function AddBet() {

    useEffect(() => {
        getTeamsFromDatabase();
    }, []);

    const teams = useSelector(store => store.teams);
    const dispatch = useDispatch();
    const history = useHistory();
    const userID = useSelector( store => store.user.id);

    const getTeamsFromDatabase = () => {
        dispatch({
            type: 'GET_TEAMS'
        })
    }

    const addBet = (event) => {
        event.preventDefault();
            console.log({ user_id: userID, score_id: chosenTeam.score_id, chosen_team: chosenTeam.chosen_team, global_team_id: chosenTeam.global_team_id, chosen_moneyline: chosenTeam.chosen_moneyline, week: chosenTeam.week, bet_amount: chosenTeam.bet_amount });
            //this is sent to the bet on this saga.
            dispatch({
                type: 'ADD_BET',
                payload: { 
                    user_id: userID,
                    score_id: 0,
                    chosen_team: chosenTeam.chosen_team,
                    chosen_team_id: chosenTeam.chosen_team_id,
                    chosen_moneyline: chosenTeam.chosen_moneyline,
                    un_chosen_team: chosenTeam.un_chosen_team,
                    un_chosen_team_id: chosenTeam.un_chosen_team_id,
                    un_chosen_moneyline: chosenTeam.un_chosen_moneyline,
                    week: chosenTeam.week,
                    time: chosenTeam.time,
                    bet_amount: Number(chosenTeam.bet_amount),
                    winLoss: chosenTeam.winLoss
                }
            })
        console.log(chosenTeam);
        history.push('/betHistory');
    }

    const [chosenTeam, setChosenTeam] = useState({
        score_id: 0,
        chosen_team: '',
        chosen_team_id: 0,
        chosen_moneyline: 0,
        un_chosen_team: '',
        un_chosen_team_id: 0,
        un_chosen_moneyline: 0,
        week: 0,
        time: moment(new Date()).format(),
        bet_amount: 0,
        is_complete: true,
        profit: 0,
        winLoss: null
    });

    const [startDate, setStartDate] = useState(new Date());

    const dateChange = (date) => {
        // this sets the date that is visible to users in a nice legible way
        setStartDate(date);
        console.log(moment(date).format());
        // this sets the date in the object we are sending to the database in a way that matches the dates we get from the api.
        setChosenTeam({
            ...chosenTeam,
            time: moment(date).format()
        })
    }

    const betChange = (event) => {
        console.log(event.target.value);
        setChosenTeam({
            ...chosenTeam,
            bet_amount: event.target.value
        })
    }

    const pickChange = (event) => {
        let team = event.target.value
        let pickId = team.split(',')[0];
        let pickName = team.split(',')[1];
        console.log(Number(pickId));
        console.log(pickName);
        setChosenTeam({
            ...chosenTeam,
            chosen_team_id: Number(pickId),
            chosen_team: pickName
        })
    }

    const oppChange = (event) => {
        let oppTeam = event.target.value
        let oppId = oppTeam.split(',')[0];
        let oppName = oppTeam.split(',')[1];
        console.log(Number(oppId));
        console.log(oppName);
        setChosenTeam({
            ...chosenTeam,
            un_chosen_team_id: Number(oppId),
            un_chosen_team: oppName
        })
    }
    const pickMoneylineChange = (event) => {
        console.log(event.target.value);
        setChosenTeam({
            ...chosenTeam,
            chosen_moneyline: event.target.value
        })
    }

    const oppMoneylineChange = (event) => {
        console.log(event.target.value);
        setChosenTeam({
            ...chosenTeam,
            un_chosen_moneyline: event.target.value
        })
    }

    const winLossChange = (event) => {
        console.log(event);
        setChosenTeam({
            ...chosenTeam,
            winLoss: event
        })
    }

    return(
        <div>
            <h1>Add a bet!</h1>
            <form onSubmit={() => addBet(event)}>
            <h3>Pick to win</h3>
            <select onChange={() => pickChange(event)}>
                <option value="0">Select a Team</option>
                {teams.map( team => {
                    return(
                        <option key={team.id} value={[team.id, team.team_abv_city]} >{team.team_full_name}</option>
                    )
                })}
            </select>
            <br />
            <input type="text" placeholder="Your picks moneyline" onChange={() => pickMoneylineChange(event)} />
            <h3>Opponent</h3>
            <select onChange={() => oppChange(event)}>
                <option value="0">Select a Team</option>
                {teams.map( team => {
                    return(
                        <option key={team.id} value={[team.id, team.team_abv_city]} >{team.team_full_name}</option>
                    )
                })}
            </select>
            <br />
            <input type="text" placeholder="Opponents moneyline" onChange={() => oppMoneylineChange(event)} />
            <h3>Date/Time</h3>
            {/* Would like this to be a calendar select and a time select... */}
            <DatePicker selected={startDate} showTimeSelect dateFormat="Pp" onChange={(date) => dateChange(date)} />
            <input type="number" placeholder="Bet Amount" onChange={() => betChange(event)}/>
            <br />
            <button type="button" onClick={() => winLossChange(true)} >WIN</button>
            <button type="button" onClick={() => winLossChange(false)} >LOSS</button>
            <br />
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddBet;

// showTimeSelect dateFormat="Pp"
//2022-09-08T20:20:00