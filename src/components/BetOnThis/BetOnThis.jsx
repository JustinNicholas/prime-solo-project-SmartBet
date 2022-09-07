import React from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import moment from 'moment';

function BetOnThis() {
    let {score_id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        refresh(score_id);
    }, []);

    const refresh = (score_id) => {
        dispatch({
            type: 'BET_ON_THIS',
            payload: {score_id: score_id}
        })
        dispatch({
            type: 'GET_THIS_GAME',
            payload: score_id
        })
    }

    const returnToGames = () => {
        history.push('/viewGames');
    }

    const thisGame = useSelector( store => store.thisGame);
    const userID = useSelector( store => store.user.id)

    const homeTeam = (game) => {
        console.log('home team clicked');
        setChosenTeam({score_id: game.score_id, chosen_team: game.home_team, global_team_id: game.global_home_team_id, chosen_moneyline: game.home_moneyline, week: game.week });
        console.log(chosenTeam);
    }
    const awayTeam = (game) => {
        console.log('away team clicked');
        setChosenTeam({score_id: game.score_id, chosen_team: game.away_team, global_team_id: game.global_away_team_id, chosen_moneyline: game.away_moneyline, week: game.week });
        console.log(chosenTeam);
    }

    // need to update the info going into this state in the object
    const [chosenTeam, setChosenTeam] = useState({score_id: 0, chosen_team: '', global_team_id: 0, chosen_moneyline: 0, week: 0 });
    const [betAmount, setBetAmount] = useState(0);

    const updateBet = (event) => {
        setBetAmount(event.target.value)
        console.log(event.target.value);
    }

    const addBet = (event) => {
        event.preventDefault;

        if(chosenTeam.score_id === 0 || betAmount <= 0) {
            alert('please select a winning team and enter a valid bet amount.')
        } else {
            // console.log({ user_id: userID, score_id: chosenTeam.score_id, chosen_team: chosenTeam.chosen_team, global_team_id: chosenTeam.global_team_id, chosen_moneyline: chosenTeam.chosen_moneyline, week: chosenTeam.week, bet_amount: betAmount });
            //this is sent to the bet on this saga.
            dispatch({
                type: 'ADD_BET',
                payload: { user_id: userID, score_id: chosenTeam.score_id, chosen_team: chosenTeam.chosen_team, global_team_id: chosenTeam.global_team_id, chosen_moneyline: chosenTeam.chosen_moneyline, week: chosenTeam.week, bet_amount: Number(betAmount) }
            })
        }
    }

    return(
        <>
            <h1>Bet On This Game!</h1>
            {thisGame.map( game => {
                    // use moment js to parse time into easy to read text.
                    const date = moment(game.time).format('LLLL')
                return (
                <div key={game.score_id}>
                    <h3>Date/Time: {date} EST</h3>
                    
                    <h2>Select a team to win!</h2>
                    <form onSubmit={ () => addBet(event) }>
                        <div onClick={() => homeTeam(game)}>
                            <p>THIS IS THE HOME TEAM</p>
                            <img className='team-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + game.home_team + '.svg'} alt="logo" />
                            <p>Home: {game.home_team}</p>
                            <p>Home Moneyline: {game.home_moneyline}</p>
                        </div>
                        <div onClick={() => awayTeam(game)}>
                            <p>THIS IS THE AWAY TEAM</p>
                            <img className='team-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + game.away_team + '.svg'} alt="logo" />
                            <p>Away: {game.away_team}</p>
                            <p>Away Moneyline: {game.away_moneyline}</p>
                        </div>
                        <p>Channel: {game.channel}</p>

                        <h2>How much are you betting?</h2>
                        <input onChange={() => updateBet(event)} type="number" placeholder='Amount of bet'/>
                        <button type='submit'>Submit the Bet</button>
                        <br />
                        <button onClick={() => returnToGames()}>Return to Games</button>
                    </form>
                </div>
                )
})}
        </>
    )
}

export default BetOnThis;