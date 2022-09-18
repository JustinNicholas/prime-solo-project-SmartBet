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
    let betTotal = 0;

    const bets = useSelector(store => store.betHistory)
    const userId = useSelector(store => store.user.id)
    const username = useSelector((store) => store.user.username);
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
            <div className='bet-history-containers-container'>
                <div className='bet-history-profile-container'>
                    <h1 className='bet-history-info-heading'>BETTING HISTORY</h1>
                    <p className='username-text'>HI, {username.charAt(0).toUpperCase() + username.slice(1)}</p>
                    {bets.map(bet => {
                        profitTotal += bet.profit;
                        betTotal += 1;
                    })}

                    <div className='net-earnings-container'>
                        <p className='stats-header'>NET EARNINGS</p>
                        {profitTotal >= 0 ?
                        <h1 className='positive-profit earnings-info'>+{formatter.format(profitTotal)}</h1>
                        :
                        <h1 className='negative-profit earnings-info'>{formatter.format(profitTotal)}</h1>
                        }
                    </div>
                    <div className='bets-placed-container'>
                        <p  className='stats-header'>BETS PLACED</p>
                        <h1 className='total-bets-info'>{betTotal}</h1>
                    </div>
                    <div className='most-profitable-team-info'>

                    </div>
                </div>
                <div className='bet-history-graph-container'>
                    <BetHistoryChart />
                </div>
            </div>

            <div className='labels-container'>
                {/* need to style this class in css */}
                <p className='game-time-label'>TIME</p> 
                <p className='teams-label'>TEAMS</p>
                <p className='pick-label'>PICK</p>
                <p className='bet-moneyline-label'>MONEYLINE</p>
                <p className='bet-channel-label'>CHANNEL</p>
                <p className='bet-profit-label'>PROFIT</p>
            </div>
            {/* <h1>TOTAL PROFIT = {formatter.format(profitTotal)}</h1> */}
            {reversedBets.map( bet => {
                const date = moment(bet.time).format('LLLL');
                if (userId === bet.user_id) {
                    const fullDate = moment(bet.time).format('l');
                    const day = moment(bet.time).format('ddd');
                    const shortDate = moment(bet.time).format("MMM D");
                    const hour = moment(bet.time).format('LT');
                    // use moment js to parse time into easy to read text.
                    // const date = moment(bet.time).format('LLLL')
                    return (
                        // changed this to bet id because there could be more than one bet on a game.
                    <div className='bet-listing' key={bet.id}>
                        {/* <h1>Date/Time: {date} EST</h1> */}

                        <div className='away-team'>
                            <img className='team-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + bet.chosen_team + '.svg'} alt="logo" />
                        
                        {/* <p>Away Moneyline: {game.away_moneyline || 'TBD'}</p> */}
                        </div>
                        <p className='at-seperator'>VS</p>
                        <div className='home-team'>
                            <img className='team-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + bet.un_chosen_team + '.svg'} alt="logo" />
                        </div>
                        {/* <div className='team-names'>
                            <p>{bet.away_full_name}</p>
                            <p>{bet.home_full_name}</p>
                        </div> */}
                        {/* <div className='pick-info'> */}
                        <div className='centered-pick-team'>
                            <p className='pick-team-info'>{bet.chosen_team}</p>
                        </div>
                        <div className='centered-moneyline-info'>
                            <p className='moneyline-info'>{bet.chosen_moneyline}</p>
                        </div>
                            
                            
                        {/* </div> */}
                        {bet.is_completed ? 
                        <>
                            {/* <p>Time: {date}</p> */}
                            <div className='time-box-full'>
                                <h3 className='time-data'>{fullDate}</h3>
                                <p className='time-data'>{hour} EST</p>
                            </div>
                            <div className='centered-text'>
                                {bet.profit > 0 ?
                                <p className='positive-profit bet-profit-piece'>{formatter.format(bet.profit)}</p>
                                :
                                <p className='negative-profit bet-profit-piece'>{formatter.format(bet.profit)}</p>
                                }
                            </div>
                            {/* <p>Profit: {formatter.format(bet.profit)}</p> */}
                            <div className='bet-info'>
                                {bet.home_score ? <p className='bet-info-piece'>Final Score: {bet.home_team}: {bet.home_score} {bet.away_team}: {bet.away_score}</p>
                                :
                                <p className='bet-info-piece'>MANUAL ENTRY</p>
                                }
                            <div className='bet-buttons-container'>
                                <button className='bet-buttons' onClick={() => deleteBet(bet)}>DELETE</button>
                                <button className='bet-buttons' onClick={() => editBet(bet)}>EDIT</button>
                            </div>
                            </div>
                            <div className='team-moneylines'>
                            {/* <p>Time: {date}</p> */}
                            <p className='bet-channel-info'>{bet.channel || 'N/A'}</p>
                            </div>
                        </>
                        :
                        <>
                        <div className='time-box-short'>
                            {/* <h3 className='time-data'>{day}</h3> */}
                            <h3 className='time-data'>{day}, {shortDate}</h3>
                            <p className='time-data'>{hour} EST</p>
                        </div>
                        <div className='centered-text'>
                            <p className="bet-profit-piece">Pending</p>
                        </div>

                        <div className='bet-info'>
                        <p className='bet-info-piece'>FINAL SCORE: PENDING</p>
                            <div className='bet-buttons-container'>
                                <button className='bet-buttons' onClick={() => deleteBet(bet)}>DELETE</button>
                                <button className='bet-buttons' onClick={() => editBet(bet)}>EDIT</button>
                            </div>
                        </div>
                        <div className='team-moneylines'>
                            {/* <p>Time: {date}</p> */}
                            <p className='bet-channel-info'>{bet.channel}</p>
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