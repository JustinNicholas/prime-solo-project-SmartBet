import React from 'react';
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


    const games = useSelector(store => store.games)
    const currentWeek = useSelector(store => store.week)

    const dispatch = useDispatch();
    const history = useHistory();

    const getGamesFromDatabase = () => {
        dispatch({
            type: 'GET_WEEK'
        })
        dispatch({
            type: 'GET_GAMES'
        })
        console.log('dipatched!');
    }

    const betOnThis = (game) => {
        dispatch({
            type: 'BET_ON_THIS',
            payload: game
        })
        history.push(`/database/bets/${game.score_id}`)
    }

    return(
        <>
            <h1>Games</h1>
            {/* <button onClick={() => getGamesFromDatabase()}>View Games!</button> */}
            {games.map( game => {
                if ( game.week === currentWeek ) {
                    // use moment js to parse time into easy to read text.
                    const date = moment(game.time).format('LLLL')
                return (
                <div key={game.score_id}>
                    <h1>Date/Time: {date} EST</h1>
                    <img className='team-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + game.home_team + '.svg'} alt="logo" />
                    <p>Home: {game.home_team}</p>
                    <p>Home Moneyline: {game.home_moneyline}</p>
                    <img className='team-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + game.away_team + '.svg'} alt="logo" />
                    <p>Away: {game.away_team}</p>
                    <p>Away Moneyline: {game.away_moneyline}</p>
                    <p>Channel: {game.channel}</p>
                    <button onClick={() => betOnThis(game)}>Bet On This</button>
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