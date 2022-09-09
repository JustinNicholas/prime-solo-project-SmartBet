import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import moment from 'moment';
import { select } from 'redux-saga/effects';

function EditBet() {

    const history = useHistory();
    const {id} = useParams();
    const dispatch = useDispatch();

    const thisGame = useSelector( store => store.thisGame);
    const userID = useSelector( store => store.user.id);

    useEffect(() => {
        refresh(id);
    }, [])

    const refresh = (id) => {
        dispatch({
            type: 'EDIT_THIS_BET',
            payload: {id: id}
        })
        // need to find a way to load the values of the already selected on load
        // pickToWin(thisGame[0]);
    }

    const returnToBets = () => {
        history.push('/betHistory');
    }

    const pickToWin = (game) => {
        console.log('home team clicked');
        setChosenTeam({
            score_id: game.score_id,
            chosen_team: game.chosen_team,
            chosen_team_id: game.chosen_team_id,
            chosen_moneyline: game.chosen_moneyline,
            un_chosen_team: game.un_chosen_team,
            un_chosen_team_id: game.un_chosen_team_id,
            un_chosen_moneyline: game.un_chosen_moneyline,
            week: game.week,
            time: game.time,
            is_completed: game.is_completed,
            profit: game.profit,
            winner_same: true
        });
        console.log(chosenTeam);
    }
    const predictedLoser = (game) => {
        console.log('away team clicked');
        setChosenTeam({
            score_id: game.score_id,
            chosen_team: game.un_chosen_team,
            chosen_team_id: game.un_chosen_team_id,
            chosen_moneyline: game.un_chosen_moneyline,
            un_chosen_team: game.chosen_team,
            un_chosen_team_id: game.chosen_team_id,
            un_chosen_moneyline: game.chosen_moneyline,
            week: game.week,
            time: game.time,
            is_completed: game.is_completed,
            profit: game.profit,
            winner_same: false
        });
        // console.log(chosenTeam);
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
        time: '',
        is_completed: null,
        profit: 0,
        winner_same: null
    });
    const [betAmount, setBetAmount] = useState(0);

    const updateBet = (event) => {
        setBetAmount(event.target.value)
        console.log(event.target.value);
    }

    const updateThisBet = (event) => {
        event.preventDefault;

        if(chosenTeam.chosen_team_id === 0 || betAmount <= 0) {
            alert('please select a winning team and enter a valid bet amount.')
        } else {
            // console.log({ user_id: userID, score_id: chosenTeam.score_id, chosen_team: chosenTeam.chosen_team, global_team_id: chosenTeam.global_team_id, chosen_moneyline: chosenTeam.chosen_moneyline, week: chosenTeam.week, bet_amount: betAmount });
            //this is sent to the bet on this saga.

            console.log('CHOSENTEAM', chosenTeam);

            dispatch({
                type: 'SUBMIT_EDIT_BET',
                payload: { 
                    user_id: userID,
                    score_id: chosenTeam.score_id,
                    chosen_team: chosenTeam.chosen_team,
                    chosen_team_id: chosenTeam.chosen_team_id,
                    chosen_moneyline: chosenTeam.chosen_moneyline,
                    un_chosen_team: chosenTeam.un_chosen_team,
                    un_chosen_team_id: chosenTeam.un_chosen_team_id,
                    un_chosen_moneyline: chosenTeam.un_chosen_moneyline,
                    week: chosenTeam.week,
                    time: chosenTeam.time,
                    bet_amount: Number(betAmount),
                    is_completed: chosenTeam.is_completed,
                    profit: chosenTeam.profit,
                    winner_same: chosenTeam.winner_same,
                    id: id
                }
            })
        }
    }

    return(
        <>
            <h1>Edit this bet!</h1>
            {thisGame.map( game => {
                    // use moment js to parse time into easy to read text.
                    const date = moment(game.time).format('LLLL')
                return (
                <div key={game.score_id}>
                    <h3>Date/Time: {date} EST</h3>

                    <form onSubmit={ () => updateThisBet(event) }>
                        <div onClick={() => pickToWin(game)}>
                            <p>THIS IS THE TEAM YOU PICKED TO WIN</p>
                            <img className='team-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + game.chosen_team + '.svg'} alt="logo" />
                            <p>Home: {game.chosen_team}</p>
                            <p>Home Moneyline: {game.chosen_moneyline}</p>
                        </div>
                        <div onClick={() => predictedLoser(game)}>
                            <p>THIS IS THE PREDICTED LOSER</p>
                            <img className='team-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + game.un_chosen_team + '.svg'} alt="logo" />
                            <p>Away: {game.un_chosen_team}</p>
                            <p>Away Moneyline: {game.un_chosen_moneyline}</p>
                        </div>

                        <h2>Edit Bet?</h2>
                        <input onChange={() => updateBet(event)} type="number" placeholder='Amount of bet'/>
                        <button type='submit'>Submit Edits</button>
                        <br />
                        <button type='button' onClick={() => returnToBets()}>Return to Bets</button>
                    </form>
                </div>
                )
})}
        </>
    )
}

export default EditBet;