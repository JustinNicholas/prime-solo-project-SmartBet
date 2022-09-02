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
            <p>{games}</p>
        </>
    )
}

export default ViewGames;