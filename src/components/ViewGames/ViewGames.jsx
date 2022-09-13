import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import './ViewGames.css'

function ViewGames() {
    useEffect(() => {
        getGamesFromDatabase();
    }, []);

    // we set the selected week to the current week so users don't have to use the select unless they need to see other weeks.
    useEffect(() => {
        setSelecetedWeek(currentWeek || 1);
    }, [currentWeek]);

    const games = useSelector(store => store.games)
    const currentWeek = useSelector(store => store.week)
    const [selectedWeek, setSelecetedWeek] = useState(1)
    
    // console.log(currentWeek)
    const dispatch = useDispatch();
    const history = useHistory();

    const updateSelecetedWeek = (event) => {
        console.log(event.target.value);
        setSelecetedWeek(event.target.value)
    }

    const getGamesFromDatabase = () => {
        dispatch({
            type: 'GET_WEEK'
        })
        dispatch({
            type: 'GET_GAMES'
        })
        // console.log('dipatched!');
    }

    const betOnThis = (game) => {
        dispatch({
            type: 'BET_ON_THIS',
            payload: game
        })
        history.push(`/database/bets/${game.score_id}`)
    }

    const currentDate = new Date()
    const timeNumber = currentDate.getTime();
    // console.log('current date', timeNumber);

    return(
        <>
            <h1>Games for Week: {selectedWeek || 1}</h1>
            <select onChange={() => updateSelecetedWeek(event)}>
                <option value={selectedWeek}>Select a Week</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
            </select>
            {/* <button onClick={() => getGamesFromDatabase()}>View Games!</button> */}
            {games.map( game => {
                if ( game.week == selectedWeek) {
                    // use moment js to parse time into easy to read text.
                    const date = moment(game.time).format('LLLL')
                    const gameTime = new Date(game.time).getTime();
                return (
                <div className='game-listing' key={game.score_id}>
                    <h3>{date} EST</h3>
                    <div className='away-team'>
                        <img className='team-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + game.away_team + '.svg'} alt="logo" />
                        <p>{game.away_full_name}</p>
                        {/* <p>Away Moneyline: {game.away_moneyline || 'TBD'}</p> */}
                    </div>
                    <p className='at-seperator'>at</p>
                    <div className='home-team'>
                        <img className='team-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + game.home_team + '.svg'} alt="logo" />
                        <p>{game.home_full_name}</p>
                        {/* <p>Home Moneyline: {game.home_moneyline || 'TBD'}</p> */}
                    </div>
                    <div className='game-info'>
                        {gameTime < timeNumber ?
                        <p>Final Score: {game.home_team}:{game.home_score} {game.away_team}:{game.away_score}</p>
                        :
                        <>
                            <p>Channel: {game.channel || 'TBD'}</p>
                            {selectedWeek == currentWeek || selectedWeek == currentWeek+1? <button onClick={() => betOnThis(game)}>Bet On This</button>: <></>}
                        </>
                        }
                    </div>
                </div>
                )
                }
})}
        </>
    )
}

export default ViewGames;

// not re typing these if I have to go back to this method...
// import ARI from '../../assets/NflPngLogos/ARI.png';
// import ATL from '../../assets/NflPngLogos/ATL.png';
// import BAL from '../../assets/NflPngLogos/BAL.png';
// import BUF from '../../assets/NflPngLogos/BUF.png';
// import CAR from '../../assets/NflPngLogos/CAR.png';
// import CHI from '../../assets/NflPngLogos/CHI.png';
// import CIN from '../../assets/NflPngLogos/CIN.png';
// import CLE from '../../assets/NflPngLogos/CLE.png';
// import DAL from '../../assets/NflPngLogos/DAL.png';
// import DEN from '../../assets/NflPngLogos/DEN.png';
// import DET from '../../assets/NflPngLogos/DET.png';
// import GB from '../../assets/NflPngLogos/GB.png';
// import HOU from '../../assets/NflPngLogos/HOU.png';
// import IND from '../../assets/NflPngLogos/IND.png';
// import JAX from '../../assets/NflPngLogos/JAX.png';
// import KC from '../../assets/NflPngLogos/KC.png';
// import LAC from '../../assets/NflPngLogos/LAC.png';
// import LAR from '../../assets/NflPngLogos/LAR.png';
// import LV from '../../assets/NflPngLogos/LV.png';
// import MIA from '../../assets/NflPngLogos/MIN.png';
// import MIN from '../../assets/NflPngLogos/MIN.png';
// import NE from '../../assets/NflPngLogos/NE.png';
// import NO from '../../assets/NflPngLogos/NO.png';
// import NYG from '../../assets/NflPngLogos/NYG.png';
// import NYJ from '../../assets/NflPngLogos/NYJ.png';
// import PHI from '../../assets/NflPngLogos/PHI.png';
// import PIT from '../../assets/NflPngLogos/PIT.png';
// import SEA from '../../assets/NflPngLogos/SEA.png';
// import SF from '../../assets/NflPngLogos/SF.png';
// import TB from '../../assets/NflPngLogos/TB.png';
// import TEN from '../../assets/NflPngLogos/TEN.png';
// import WAS from '../../assets/NflPngLogos/WAS.png';