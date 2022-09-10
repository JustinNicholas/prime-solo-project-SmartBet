import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import BetHistoryChart from '../BetHistoryChart/BetHistoryChart';


function BetHistory() {

    useEffect(() => {
        getBetsFromDatabase();
    }, []);

    let profitTotal = 0;

    const bets = useSelector(store => store.betHistory)
    const userId = useSelector(store => store.user.id)

    const dispatch = useDispatch();
    const history = useHistory();

    const getBetsFromDatabase = () => {
        dispatch({
            type: 'GET_BET_HISTORY'
        })
        console.log('dipatched!');
    }

    const editBet = (bet) => {
        console.log('clicked edit bet');
            dispatch({
                type: 'EDIT_THIS_BET',
                payload: bet
            })
            history.push(`/database/bets/edit/${bet.id}`)
    }

    const deleteBet = (bet) => {
        console.log('delete', bet.id);
        dispatch({
            type: 'DELETE_BET',
            payload: bet.id
        })
    }
    
    return(
        <>
            <h1>Bet History Page</h1>
            <BetHistoryChart />
            {/* <div>
                <Line
                data={chart}
                options={{
                    title:{
                    display:true,
                    text:'Profit History',
                    fontSize:20
                    },
                    legend:{
                    display:true,
                    position:'right'
                    }
                }}
                />
            </div> */}
            

            {bets.map(bet => {
                profitTotal += bet.profit;
            })}
            <h1>TOTAL PROFIT = ${profitTotal.toFixed(2)}</h1>
            {bets.map( bet => {
                if (userId === bet.user_id) {

                    // use moment js to parse time into easy to read text.
                    // const date = moment(bet.time).format('LLLL')
                    return (
                        // changed this to bet id because there could be more than one bet on a game.
                    <div key={bet.id}>
                        {/* <h1>Date/Time: {date} EST</h1> */}
                        <img className='team-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + bet.chosen_team + '.svg'} alt="logo" />
                        <p>Pick to Win: {bet.chosen_team}</p>
                        <p>Moneyline: {bet.chosen_moneyline}</p>
                        {/* <img className='team-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + bet.unchosen_team + '.svg'} alt="logo" />
                        <p>Pick to lose: {bet.unchosen_team}</p>
                        <p>Moneyline: {bet.unchosen_moneyline}</p>
                        <p>Channel: {bet.channel}</p> */}
                        <button onClick={() => deleteBet(bet)}>Delete</button>
                        <button onClick={() => editBet(bet)}>EDIT</button>
                    </div>
                    )
                }
                })}
        </>
    )

}

export default BetHistory;