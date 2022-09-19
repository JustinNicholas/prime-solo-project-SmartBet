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
        setSelecetedWeek(currentWeek || 2);
    }, [currentWeek]);

    const games = useSelector(store => store.games)
    const currentWeek = useSelector(store => store.week)
    const [selectedWeek, setSelecetedWeek] = useState(2)
    
    for (let i=0; i<games.length; i++) {
        if (games[i].is_over === false) {
            upcomingGames += 1;
        } else {
            completedGames += 1;
        }
    }
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
        dispatch({
            type: 'GET_WINNINGEST_TEAM'
        })
        dispatch({
            type: 'GET_LOSINGEST_TEAM'
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

    let upcomingGames = [];
    let completedGames = [];

    return(
        
        <div>
                {games.map( game => {
                if ( game.week == selectedWeek && game.is_over === true) {
                    completedGames.push(game);
                } else if ( game.week == selectedWeek && game.is_over === false) {
                    upcomingGames.push(game);
                }
            })}
        <div className='hero-image-container'>
            <img className='hero-image' src={process.env.PUBLIC_URL + '/HeroImage/HeroImage.svg'} />
            <div className='hero-text'>
                <p className='hero-intro'>WELCOME TO</p>
                <h1 className='hero-logo'>SMARTBET</h1>
                <p className='hero-slogan'>The tracking app for <strong>BET</strong>ter decision making</p>
            </div>
        </div>
            {/* <h4>WEEK {selectedWeek || 1}</h4> */}
            <div className='upcoming-games-header'>
                <h1 className='upcoming-completed-headers'>UPCOMING GAMES</h1>
                <div className='week-label-view-games'>
                    <select onChange={() => updateSelecetedWeek(event)}>
                        <option value={selectedWeek}>THIS WEEK</option>
                        <option value="1">WEEK 1</option>
                        <option value="2">WEEK 2</option>
                        <option value="3">WEEK 3</option>
                        <option value="4">WEEK 4</option>
                        <option value="5">WEEK 5</option>
                        <option value="6">WEEK 6</option>
                        <option value="7">WEEK 7</option>
                        <option value="8">WEEK 8</option>
                        <option value="9">WEEK 9</option>
                        <option value="10">WEEK 10</option>
                        <option value="11">WEEK 11</option>
                        <option value="12">WEEK 12</option>
                        <option value="13">WEEK 13</option>
                        <option value="14">WEEK 14</option>
                        <option value="15">WEEK 15</option>
                        <option value="16">WEEK 16</option>
                        <option value="17">WEEK 17</option>
                        <option value="18">WEEK 18</option>
                    </select>
                </div>
            </div>
            {upcomingGames.length === 0 ?
            <div className='none-labels-container'>
                <p className='none-label'>NO UPCOMING GAMES FOR THIS WEEK</p>
            </div>
            :
            <div className='labels-container'>
                <p className='date-label'>DATE</p>
                <p className='teams-label'>TEAMS</p>
                <p className='moneyline-label'>MONEYLINE</p>
                <p className='channel-label'>CHANNEL</p>
                {/* <p className='place-bet-label'>PLACE BET</p> */}
            </div>
            }

            {games.map( game => {
                if ( game.week == selectedWeek && game.is_over === false) {
                    // use moment js to parse time into easy to read text.
                    //Full Date
                    const date = moment(game.time).format('LLLL')
                    const gameTime = new Date(game.time).getTime();
                    // used to display time on listings
                    const day = moment(game.time).format('ddd');
                    const shortDate = moment(game.time).format("MMM D");
                    const hour = moment(game.time).format('LT');
                return (
                <div className='game-listing' key={game.score_id}>
                    {/* <h1>upcoming games</h1> */}
                    {/* <div className='time-box'>
                        <h3 className='time-data'>{day}</h3>
                        <h3 className='time-data'>{shortDate}</h3>
                        <p className='time-data'>{hour} EST</p>
                    </div> */}
                    <div className='time-box-short'>
                        <h3 className='time-data'>{day.toUpperCase()} {shortDate.toUpperCase()}</h3>
                        <p className='time-data-hour'>{hour} EST</p>
                    </div>
                    <div className='away-team'>
                        <img className='team-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + game.away_team + '.svg'} alt="logo" />
                    </div>
                    <p className='at-seperator'>AT</p>
                    <div className='home-team'>
                        <img className='team-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + game.home_team + '.svg'} alt="logo" />
                    </div>
                    <div className='team-names'>
                        <p className='team-name-info-text'><span className='dots'>&#9675; </span> {game.away_full_name.toUpperCase()}</p>
                        <p className='team-name-info-text'><span className='dots'>&#9679; </span> {game.home_full_name.toUpperCase()}</p>
                    </div>
                    <div className='team-moneylines'>
                        <p className='team-name-info-text'>{game.away_moneyline>0? '+' + game.away_moneyline : game.away_moneyline || 'TBD'}</p>
                        <p className='team-name-info-text'>{game.home_moneyline>0? '+' + game.home_moneyline : game.home_moneyline || 'TBD'}</p>
                    </div>
                    <div className='game-channel'>
                        <p className='game-channel-info'>{game.channel || 'TBD'}</p>
                    </div>
                    <div className='game-info'>
                        {gameTime < timeNumber ?
                        <p className='game-score'>IN PROGRESS</p>
                        :
                        <>
                            {selectedWeek == currentWeek || selectedWeek == currentWeek+1? <button className='place-bet-button' onClick={() => betOnThis(game)}>PLACE BET</button>: <></>}
                        </>
                        }
                    </div>
                </div>
                )
                }

})}
            <div className='completed-games-header'>
                <h1 className='upcoming-completed-headers'>COMPLETED GAMES</h1>
            </div>
            {completedGames.length === 0 ?
            <div className='none-labels-container'>
                <p className='none-label'>NO COMPLETED GAMES FOR THIS WEEK</p>
            </div>
            :
            <div className='labels-container'>
                <p className='date-label'>DATE</p>
                <p className='teams-label'>TEAMS</p>
                <p className='moneyline-label'>MONEYLINE</p>
                <p className='channel-label'>CHANNEL</p>
                <p className='final-score-label'>FINAL SCORE</p>
            </div>
            }
            {games.map( game => {
                if ( game.week == selectedWeek && game.is_over === true) {
                    // use moment js to parse time into easy to read text.
                    //Full Date
                    const date = moment(game.time).format('LLLL')
                    const gameTime = new Date(game.time).getTime();

                    const day = moment(game.time).format('ddd');
                    const shortDate = moment(game.time).format("MMM D");
                    const hour = moment(game.time).format('LT');
                return (
                <div className='game-listing' key={game.score_id}>
                    {/* <div className='time-box'>
                        <h3 className='time-data'>{day}</h3>
                        <h3 className='time-data'>{shortDate}</h3>
                        <p className='time-data'>{hour} EST</p>
                    </div> */}
                    <div className='time-box-short'>
                        <h3 className='time-data'>{day.toUpperCase()} {shortDate.toUpperCase()}</h3>
                        <p className='time-data-hour'>{hour} EST</p>
                    </div>
                    <div className='away-team'>
                        <img className={game.home_score > game.away_score? 'grey-team-logo' : 'team-logo' } src={process.env.PUBLIC_URL + '/NflLogos/' + game.away_team + '.svg'} alt="logo" />
                    </div>
                    <p className='at-seperator'>AT</p>
                    <div className='home-team'>
                        <img className={game.away_score > game.home_score? 'grey-team-logo' : 'team-logo' } src={process.env.PUBLIC_URL + '/NflLogos/' + game.home_team + '.svg'} alt="logo" />
                    </div>
                    <div className='team-names'>
                        <p className={game.home_score > game.away_score? 'grey-loser team-name-info-text' : 'team-name-info-text' }><span className='dots'>&#9675; </span>{game.away_full_name}</p>
                        <p className={game.away_score > game.home_score? 'grey-loser team-name-info-text' : 'team-name-info-text' }><span className='dots'>&#9679; </span>{game.home_full_name}</p>
                    </div>
                    <div className='team-moneylines'>
                        <p className='team-name-info-text'>{game.away_moneyline>0? '+' + game.away_moneyline : game.away_moneyline || 'TBD'}</p>
                        <p className='team-name-info-text'>{game.home_moneyline>0? '+' + game.home_moneyline : game.home_moneyline || 'TBD'}</p>
                    </div>
                    <div className='game-channel'>
                        <p className='game-channel-info'>{game.channel || 'TBD'}</p>
                    </div>
                    <div className='game-over-teams'>
                        <p className='game-over-team-names'>{game.home_team}</p>
                        <p className='game-over-team-names'>{game.away_team}</p>
                    </div>
                    <div className='game-over-scores'>
                        <p className='game-over-score'>{game.home_score}</p>
                        <p className='game-over-score'>{game.away_score}</p>
                    </div>
                </div>
                )
                }
            })}
        </div>
    )
}

export default ViewGames;