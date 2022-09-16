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
               {profitTotal >= 0 ?
                            <h1 className='positive-profit'>TOTAL PROFIT = {formatter.format(profitTotal)}</h1>
                            :
                            <h1 className='negative-profit'>TOTAL PROFIT = {formatter.format(profitTotal)}</h1>
                            }
            {/* <h1>TOTAL PROFIT = {formatter.format(profitTotal)}</h1> */}
            {reversedBets.map( bet => {
                const date = moment(bet.time).format('LLLL');
                if (userId === bet.user_id) {

                    const day = moment(bet.time).format('dddd');
                    const shortDate = moment(bet.time).format("MMM D");
                    const hour = moment(bet.time).format('LT');
                    // use moment js to parse time into easy to read text.
                    // const date = moment(bet.time).format('LLLL')
                    return (
                        // changed this to bet id because there could be more than one bet on a game.
                    <div className='bet-listing' key={bet.id}>
                        {/* <h1>Date/Time: {date} EST</h1> */}
                        <div className='time-box'>
                            <h3 className='time-data'>{day}</h3>
                            <h3 className='time-data'>{shortDate}</h3>
                            <p className='time-data'>{hour} EST</p>
                        </div>
                        <div className='away-team'>
                            <img className='team-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + bet.chosen_team + '.svg'} alt="logo" />
                        
                        {/* <p>Away Moneyline: {game.away_moneyline || 'TBD'}</p> */}
                        </div>
                        <p className='at-seperator'>VS</p>
                        <div className='home-team'>
                            <img className='team-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + bet.un_chosen_team + '.svg'} alt="logo" />
                        </div>
                        <div className='team-names'>
                            <p>{bet.away_full_name}</p>
                            <p>{bet.home_full_name}</p>
                        </div>
                        <div className='pick-info'>
                            <p>Pick to Win: {bet.chosen_team}</p>
                            <p>Moneyline: {bet.chosen_moneyline}</p>
                        </div>
                        {bet.is_completed ? 
                        <>
                            {/* <p>Time: {date}</p> */}

                            {/* <p>Profit: {formatter.format(bet.profit)}</p> */}
                            <div className='bet-info'>
                                {bet.home_score ? <p className='bet-info-piece'>Final Score: {bet.home_team}:{bet.home_score} {bet.away_team}:{bet.away_score}</p>
                                :
                                <p className='bet-info-piece'>Manual Entry</p>
                                }

                            {bet.profit > 0 ?
                            <p className='positive-profit bet-info-piece'>{formatter.format(bet.profit)}</p>
                            :
                            <p className='negative-profit bet-info-piece'>{formatter.format(bet.profit)}</p>
                            }
                            <div className='bet-buttons-container'>
                                <button className='bet-buttons' onClick={() => deleteBet(bet)}>DELETE</button>
                                <button className='bet-buttons' onClick={() => editBet(bet)}>EDIT</button>
                            </div>
                            </div>
                        </>
                        :
                        <>
                        <div className='bet-info'>
                            <p>Profit: Pending</p>
                            <div className='bet-buttons-container'>
                                <button className='bet-buttons' onClick={() => deleteBet(bet)}>DELETE</button>
                                <button className='bet-buttons' onClick={() => editBet(bet)}>EDIT</button>
                            </div>
                        </div>
                        <div className='team-moneylines'>
                            {/* <p>Time: {date}</p> */}
                            <p>{bet.channel}</p>
                        </div>
                        </>
                        }
                        {/* <img className='team-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + bet.un_chosen_team + '.svg'} alt="logo" />
                        <p>Pick to lose: {bet.un_chosen_team}</p>
                        <p>Moneyline: {bet.un_chosen_moneyline}</p> */}
                        
                    </div>
                    )
                }
                })}
        </>
    )

}

export default BetHistory;