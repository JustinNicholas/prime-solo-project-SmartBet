import React from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';

function ViewGames() {

    const games = useSelector(store => store.games)

    const dispatch = useDispatch();

    const getGames = () => {
        console.log('get games button clicked');
        dispatch({
            type: 'GET_GAMES'
        })
        console.log('dipatched!');

    }

    return(
        <>
            <h1>Games</h1>
            <button onClick={() => getGames()}>View Games!</button>
            {games.map( game => (
                <div key={game.ScoreId}>
                    <h1>Date: {game.DateTime}</h1>
                    <p>Home: {game.HomeTeam}</p>
                    <p>Home Moneyline: {game.HomeTeamMoneyLine}</p>
                    <p>Away: {game.AwayTeam}</p>
                    <p>Away Moneyline: {game.AwayTeamMoneyLine}</p>
                    <p>Channel: {game.Channel}</p>
                </div>
            ))}
        </>
    )
}

export default ViewGames;