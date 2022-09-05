import React from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
// const cron = require('node-cron');

function ViewGames() {
    useEffect(() => {
        getGamesFromDatabase();
        // updateGames();
    }, []);

    // cron.schedule('* * * * * *', () => {
    // console.log('running a task every minute');
    // });

    const games = useSelector(store => store.games)
    const currentWeek = useSelector(store => store.week)

    const dispatch = useDispatch();

    const updateGames = () => {
        dispatch({
            type: 'UPDATE_GAMES'
        })
        console.log('dipatched!');
    }

    const getGamesFromDatabase = () => {
        dispatch({
            type: 'GET_GAMES'
        })
        console.log('dipatched!');
    } 

    return(
        <>
            <h1>Games</h1>
            <button onClick={() => getGamesFromDatabase()}>View Games!</button>
            {games.map( game => {
                if ( game.week === 1 ) {
                return (
                <div key={game.score_id}>
                    <h1>Date: {game.time}</h1>
                    <p>Home: {game.home_team}</p>
                    <p>Home Moneyline: {game.home_moneyline}</p>
                    <p>Away: {game.away_team}</p>
                    <p>Away Moneyline: {game.away_moneyline}</p>
                    <p>Channel: {game.channel}</p>
                </div>
                )
                }
})}
        </>
    )
}

export default ViewGames;