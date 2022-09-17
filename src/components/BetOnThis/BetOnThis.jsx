import React from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import moment from 'moment';

import './BetOnThis.css';

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
    const userID = useSelector( store => store.user.id);

    const homeTeam = (game) => {
        showHomeClicked();
        console.log('home team clicked');
        setChosenTeam({
            score_id: game.score_id,
            chosen_team: game.home_team,
            chosen_team_id: game.global_home_team_id,
            chosen_moneyline: game.home_moneyline,
            un_chosen_team: game.away_team,
            un_chosen_team_id: game.global_away_team_id,
            un_chosen_moneyline: game.away_moneyline,
            week: game.week,
            time: game.time
        });
        console.log(chosenTeam);
    }
    const awayTeam = (game) => {
        showAwayClicked();
        console.log('away team clicked');
        setChosenTeam({
            score_id: game.score_id,
            chosen_team: game.away_team,
            chosen_team_id: game.global_away_team_id,
            chosen_moneyline: game.away_moneyline,
            un_chosen_team: game.home_team,
            un_chosen_team_id: game.global_home_team_id,
            un_chosen_moneyline: game.home_moneyline,
            week: game.week,
            time: game.time,
        });
        // console.log(chosenTeam);
    }

    // need to update the info going into this state in the object
    const [chosenTeam, setChosenTeam] = useState({
        score_id: 0,
        chosen_team: '',
        chosen_team_id: 0,
        chosen_moneyline: 0,
        un_chosen_team: '',
        un_chosen_team_id: 0,
        un_chosen_moneyline: 0,
        week: 0,
        time: ''
    });
    const [betAmount, setBetAmount] = useState(0);

    const updateBet = (event) => {
        setBetAmount(event.target.value);
        console.log(event.target.value);
    }

    const addBet = (event) => {
        event.preventDefault();

        if(chosenTeam.score_id === 0 || betAmount <= 0) {
            alert('please select a winning team and enter a valid bet amount.')
        } else {
            // console.log({ user_id: userID, score_id: chosenTeam.score_id, chosen_team: chosenTeam.chosen_team, global_team_id: chosenTeam.global_team_id, chosen_moneyline: chosenTeam.chosen_moneyline, week: chosenTeam.week, bet_amount: betAmount });
            //this is sent to the bet on this saga.

            console.log(chosenTeam);

            dispatch({
                type: 'ADD_BET',
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
                    bet_amount: Number(betAmount)
                }
            })
            history.push('/viewGames');
        }
        
    }

    const [homeSelected, setHomeSeleceted] = useState(false);
    const [awaySelected, setAwaySeleceted] = useState(false);

    const showHomeClicked = () => {
        console.log('home clicked');
        setHomeSeleceted( true );
        setAwaySeleceted( false );
    }

    const showAwayClicked = () => {
        console.log('away clicked');
        setAwaySeleceted( true );
        setHomeSeleceted( false );
    }

    return(
        <>
        <h1>SELECT A TEAM TO WIN</h1>
                    {/* <h1>Upcoming Games</h1> */}
                    {thisGame.map( game => {
                        console.log(game);
                    // use moment js to parse time into easy to read text.
                    //Full Date
                    const date = moment(game.time).format('LLLL')
                    const gameTime = new Date(game.time).getTime();
                    // used to display time on listings
                    const day = moment(game.time).format('dddd');
                    const shortDate = moment(game.time).format("MMM D");
                    const hour = moment(game.time).format('LT');
                return (
                <div>
                <div className='labels-container'>
                    {/* need to style this class in css */}
                    <p className='game-time-label'>TIME</p> 
                    <p className='teams-label'>TEAMS</p>
                    <p className='moneyline-label'>MONEYLINE</p>
                    <p className='channel-label'>CHANNEL</p>
                </div>
                <div className='game-listing rounded-listing' key={game.score_id}>
                    {/* <h1>upcoming games</h1> */}
                    <div className='time-box'>
                        <h3 className='time-data'>{day}</h3>
                        <h3 className='time-data'>{shortDate}</h3>
                        <p className='time-data'>{hour} EST</p>
                    </div>
                    <div className='away-team'>
                        <img className='team-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + game.away_team + '.svg'} alt="logo" />
                    </div>
                    <p className='at-seperator'>at</p>
                    <div className='home-team'>
                        <img className='team-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + game.home_team + '.svg'} alt="logo" />
                    </div>
                    <div className='team-names'>
                        <p>{game.away_full_name}</p>
                        <p>{game.home_full_name}</p>
                    </div>
                    <div className='team-moneylines'>
                        <p>{game.away_moneyline || 'TBD'}</p>
                        <p>{game.home_moneyline || 'TBD'}</p>
                    </div>
                    <div className='game-channel'>
                        <p className='game-channel-info'>{game.channel || 'TBD'}</p>
                    </div>
                </div>
                </div>
                )
})}
            
            {thisGame.map( game => {
                    // use moment js to parse time into easy to read text.
                    const date = moment(game.time).format('LLLL')
                return (
                <div key={game.score_id}>
                    <form onSubmit={ () => addBet(event) }>
                        <div className='select-logos'>
                            <div className={ homeSelected ? 'home-logo-container-selected' : 'home-logo-container' } onClick={() => homeTeam(game)}>
                                <img className='away-select-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + game.home_team + '.svg'} alt="logo" />
                                <p className='select-team-name'>{game.home_full_name}</p>
                            </div>
                            <div className={ awaySelected ? 'away-logo-container-selected ' : 'away-logo-container' } onClick={() => awayTeam(game)}>
                                <img className='home-select-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + game.away_team + '.svg'} alt="logo" />
                                <p className='select-team-name'>{game.away_full_name}</p>
                            </div>
                        </div>
                        <div className='bet-amount-container'>
                            <p className='bet-input-label'>BET AMOUNT</p>
                            <p className='dollar-sign'>$</p>
                            <input className='bet-input' onChange={() => updateBet(event)} type="number" placeholder=' Amount of bet'/>
                            <button className='bet-input-button' type='submit'>SUBMIT</button>
                            <br />
                            <button  className='cancel-bet-button' onClick={() => returnToGames()}>CANCEL</button>
                        </div>
                    </form>
                </div>
                )
})}
        </>
    )
}

export default BetOnThis;