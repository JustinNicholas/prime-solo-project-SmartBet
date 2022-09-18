import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import BetHistoryChart from '../BetHistoryChart/BetHistoryChart';
import CountUp from 'react-countup';
import './BetHistory.css'
import ScaleLoader from "react-spinners/ScaleLoader";


function BetHistory() {

    useEffect(() => {
        getBetsFromDatabase();
    }, []);

    let profitTotal = 0;
    let betTotal = 0;

    const bets = useSelector(store => store.betHistory)
    const winningestTeam = useSelector(store => store.winningestTeam)
    const losingestTeam = useSelector(store => store.losingestTeam)
    const userId = useSelector(store => store.user.id)
    const username = useSelector((store) => store.user.username);
    //slice makes a copy of the array. we reverse the copy so most recent bet is at the top
    // without slice we were reversing the array globalling and it would change the chart order.
    const reversedBets = bets.slice(0).reverse();

    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoading, setLoading] = useState(true);

    const getBetsFromDatabase = () => {
        dispatch({
            type: 'GET_BET_HISTORY'
        })
        dispatch({
            type: 'GET_WINNINGEST_TEAM'
        })
        dispatch({
            type: 'GET_LOSINGEST_TEAM'
        })
        console.log('dipatched!');
        setTimeout(() => {
            setLoading(false)
        }, 1000);
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
        setTimeout(() => {
            getBetsFromDatabase();
        }, 100)
    }

    //money format
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
        })

    if (isLoading){
        return (
            <div className='loading-spinner-bars'>
                <ScaleLoader
                color="#FFF500"
                height={300}
                width={50}
                />
            </div>
        )
    }

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
                        <h1 className='positive-profit earnings-info'>+<CountUp prefix="$" separator="," duration={1.00} end={profitTotal} decimals={2} /></h1>
                        :
                        <h1 className='negative-profit earnings-info'><CountUp prefix="$" separator="," duration={1.00} end={profitTotal} decimals={2} /></h1>
                        }
                    </div>
                    <div className='bets-placed-container'>
                        <p className='stats-header'>BETS PLACED</p>
                        <h1 className='total-bets-info'><CountUp duration={1.0} end={betTotal} /></h1>
                    </div>
                    <div className='most-profitable-team-info'>
                        <p className='stats-header'>MOST PROFITABLE</p>
                        <p>{winningestTeam[0].team_full_name}</p>
                        { winningestTeam[0].sum >= 0 ?
                        <h1 className='positive-profit earnings-info'>+<CountUp prefix="$" separator="," duration={1.00} end={winningestTeam[0].sum} decimals={2} /></h1>
                        :
                        <h1 className='negative-profit earnings-info'><CountUp prefix="$" separator="," duration={1.00} end={winningestTeam[0].sum} decimals={2} /></h1>
                        }
                    </div>
                    <div className='least-profitable-team-info'>
                        <p className='stats-header'>LEAST PROFITABLE</p>
                        <p>{losingestTeam[0].team_full_name}</p>
                        { losingestTeam[0].sum >= 0 ?
                        <h1 className='positive-profit earnings-info'>+<CountUp prefix="$" separator="," duration={1.00} end={losingestTeam[0].sum} decimals={2} /></h1>
                        :
                        <h1 className='negative-profit earnings-info'><CountUp prefix="$" separator="," duration={1.00} end={losingestTeam[0].sum} decimals={2} /></h1>
                        }
                    </div>
                </div>
                <div className='bet-history-graph-container'>
                    <BetHistoryChart />
                </div>
            </div>

            <div className='labels-container'>
                {/* need to style this class in css */}
                <p className='bet-game-time-label'>TIME</p> 
                <p className='bet-teams-label'>TEAMS</p>
                <p className='pick-label'>PICK</p>
                <p className='bet-moneyline-label'>MONEYLINE</p>
                <p className='bet-channel-label'>CHANNEL</p>
                <p className='bet-profit-label'>PROFIT</p>
            </div>
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
                        <div className='away-team'>
                            <img className='team-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + bet.chosen_team + '.svg'} alt="logo" />
                        </div>
                        <p className='at-seperator'>VS</p>
                        <div className='home-team'>
                            <img className='team-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + bet.un_chosen_team + '.svg'} alt="logo" />
                        </div>
                        <div className='centered-pick-team'>
                            <p className='pick-team-info'>{bet.chosen_team}</p>
                        </div>
                        <div className='centered-moneyline-info'>
                            <p className='moneyline-info'>{bet.chosen_moneyline}</p>
                        </div>
                            
                        {bet.is_completed ? 
                        <>
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
                            <p className='bet-channel-info'>{bet.channel || 'N/A'}</p>
                            </div>
                        </>
                        :
                        <>
                        <div className='time-box-short'>
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
                            <p className='bet-channel-info'>{bet.channel}</p>
                        </div>
                        </>
                        }
                        
                    </div>
                    )
                }
                })}
        </>
    )

}

export default BetHistory;