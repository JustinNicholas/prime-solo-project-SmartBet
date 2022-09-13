import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import BetHistoryChart from '../BetHistoryChart/BetHistoryChart';
import './BetHistory.css'


function BetHistory() {

    useEffect(() => {
        getBetsFromDatabase();
    }, []);

    let profitTotal = 0;

    const bets = useSelector(store => store.betHistory)
    const userId = useSelector(store => store.user.id)
    //slice makes a copy of the array. we reverse the copy so most recent bet is at the top
    // without slice we were reversing the array globalling and it would change the chart order.
    const reversedBets = bets.slice(0).reverse();

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

    //money format
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
        })
    
    return(
        <>
            <h1>Bet History Page</h1>
            <BetHistoryChart />

            {bets.map(bet => {
                profitTotal += bet.profit;
            })}
            <h1>TOTAL PROFIT = ${profitTotal.toFixed(2)}</h1>
            {reversedBets.map( bet => {
                const date = moment(bet.time).format('LLLL');
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
                        {bet.is_completed ? 
                        <>
                            <p>Time: {date}</p>
                            {bet.profit > 0 ?
                            <p className='positive-profit'>Profit: {formatter.format(bet.profit)}</p>
                            :
                            <p className='negative-profit'>Profit: {formatter.format(bet.profit)}</p>
                            }

                            {/* <p>Profit: {formatter.format(bet.profit)}</p> */}
                            {bet.home_score ? <p>Final Score: {bet.home_team}:{bet.home_score} {bet.away_team}:{bet.away_score}</p>
                            :
                            <p>Manual Entry</p>
                        }
                        </>
                        :
                        <>
                            <p>Profit: Pending</p>
                            <p>Time: {date}</p>
                            <p>Channel: {bet.channel}</p>
                        </>
                        }
                        {/* <img className='team-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + bet.un_chosen_team + '.svg'} alt="logo" />
                        <p>Pick to lose: {bet.un_chosen_team}</p>
                        <p>Moneyline: {bet.un_chosen_moneyline}</p> */}
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