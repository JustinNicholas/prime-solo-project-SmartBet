import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import moment from 'moment';
import { select } from 'redux-saga/effects';

function EditBet() {

    const history = useHistory();
    const {id} = useParams();
    const dispatch = useDispatch();
    console.log(id);

    const thisGame = useSelector( store => store.thisGame);
    const userID = useSelector( store => store.user.id);

    useEffect(() => {
        refresh(id);
    }, [])

    const refresh = (id) => {
        dispatch({
            type: 'EDIT_THIS_BET',
            payload: {id: id}
        })
        // need to find a way to load the values of the already selected on load
        // pickToWin(thisGame[0]);
    }

    const returnToBets = () => {
        history.push('/betHistory');
    }

    const pickToWin = (game) => {
        showHomeClicked();
        console.log('home team clicked');
        setChosenTeam({
            score_id: game.score_id,
            chosen_team: game.chosen_team,
            chosen_team_id: game.chosen_team_id,
            chosen_moneyline: game.chosen_moneyline,
            un_chosen_team: game.un_chosen_team,
            un_chosen_team_id: game.un_chosen_team_id,
            un_chosen_moneyline: game.un_chosen_moneyline,
            week: game.week,
            time: game.time,
            is_completed: game.is_completed,
            profit: game.profit,
            winner_same: true
        });
        console.log(chosenTeam);
    }
    const predictedLoser = (game) => {
        showAwayClicked();
        console.log('away team clicked');
        setChosenTeam({
            score_id: game.score_id,
            chosen_team: game.un_chosen_team,
            chosen_team_id: game.un_chosen_team_id,
            chosen_moneyline: game.un_chosen_moneyline,
            un_chosen_team: game.chosen_team,
            un_chosen_team_id: game.chosen_team_id,
            un_chosen_moneyline: game.chosen_moneyline,
            week: game.week,
            time: game.time,
            is_completed: game.is_completed,
            profit: game.profit,
            winner_same: false
        });
        // console.log(chosenTeam);
    }

    const [chosenTeam, setChosenTeam] = useState({
        score_id: 0,
        chosen_team: '',
        chosen_team_id: 0,
        chosen_moneyline: 0,
        un_chosen_team: '',
        un_chosen_team_id: 0,
        un_chosen_moneyline: 0,
        week: 0,
        time: '',
        is_completed: null,
        profit: 0,
        winner_same: null
    });
    const [betAmount, setBetAmount] = useState(0);

    const updateBet = (event) => {
        setBetAmount(event.target.value)
        console.log(event.target.value);
    }

    const updateThisBet = (event) => {
        event.preventDefault();

        if(chosenTeam.chosen_team_id === 0 || betAmount <= 0) {
            alert('please select a winning team and enter a valid bet amount.')
        } else {
            // console.log({ user_id: userID, score_id: chosenTeam.score_id, chosen_team: chosenTeam.chosen_team, global_team_id: chosenTeam.global_team_id, chosen_moneyline: chosenTeam.chosen_moneyline, week: chosenTeam.week, bet_amount: betAmount });
            //this is sent to the bet on this saga.

            console.log('CHOSENTEAM', chosenTeam);

            dispatch({
                type: 'SUBMIT_EDIT_BET',
                payload: { 
                    user_id: userID,
                    score_id: chosenTeam.score_id,
                    chosen_team: chosenTeam.chosen_team,
                    chosen_team_id: chosenTeam.chosen_team_id,
                    chosen_moneyline: chosenTeam.chosen_moneyline,
                    un_chosen_team: chosenTeam.un_chosen_team,
                    un_chosen_team_id: chosenTeam.un_chosen_team_id,
                    un_chosen_moneyline: chosenTeam.un_chosen_moneyline,
                    week: chosenTeam.week,
                    time: chosenTeam.time,
                    bet_amount: Number(betAmount),
                    is_completed: chosenTeam.is_completed,
                    profit: chosenTeam.profit,
                    winner_same: chosenTeam.winner_same,
                    id: id
                }
            })
            history.push('/betHistory');
        }
    }


        //money format
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
            })

        const [homeSelected, setHomeSeleceted] = useState(false);
        const [awaySelected, setAwaySeleceted] = useState(false);
    
        const showHomeClicked = () => {
            console.log('home clicked');
            setHomeSeleceted( true );
            setAwaySeleceted( false );
        }
    
        const showAwayClicked = () => {
            console.log('away clicked');
            setAwaySeleceted( true );
            setHomeSeleceted( false );
        }

    return(
        <>
        <>
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
            {thisGame.map( bet => {
                const date = moment(bet.time).format('LLLL');

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
                                <p className='bet-info-piece'>Manual Entry</p>
                                }
                            <div className='bet-buttons-container'>
                                {/* <button className='bet-buttons' onClick={() => deleteBet(bet)}>DELETE</button>
                                <button className='bet-buttons' onClick={() => editBet(bet)}>EDIT</button> */}
                            </div>
                            </div>
                        </>
                        :
                        <>
                        <div className='centered-text'>
                            <p className="bet-profit-piece">Pending</p>
                        </div>

                        <div className='bet-info'>
                            
                            {/* <div className='bet-buttons-container'>
                                <button className='bet-buttons' onClick={() => deleteBet(bet)}>DELETE</button>
                                <button className='bet-buttons' onClick={() => editBet(bet)}>EDIT</button>
                            </div> */}
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
                })}
        </>
    
            {/* <h1>Edit this bet!</h1> */}
            {thisGame.map( game => {
                    // use moment js to parse time into easy to read text.
                    const date = moment(game.time).format('LLLL')
                return (
                <div key={game.score_id}>
                    {/* <h3>Date/Time: {date} EST</h3> */}

                    <form onSubmit={ () => updateThisBet(event) }>
                    <div className='select-logos'>
                        <div className={ homeSelected ? 'home-logo-container-selected' : 'home-logo-container' } onClick={() => pickToWin(game)}>
                            {/* <p>THIS IS THE TEAM YOU PICKED TO WIN</p> */}
                            <img className='home-select-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + game.chosen_team + '.svg'} alt="logo" />
                            {/* <p>Home: {game.chosen_team}</p>
                            <p>Home Moneyline: {game.chosen_moneyline}</p> */}
                        </div>
                        <div className={ awaySelected ? 'away-logo-container-selected' : 'away-logo-container' } onClick={() => predictedLoser(game)}>
                            {/* <p>THIS IS THE PREDICTED LOSER</p> */}
                            <img className='away-select-logo' src={process.env.PUBLIC_URL + '/NflLogos/' + game.un_chosen_team + '.svg'} alt="logo" />
                            {/* <p>Away: {game.un_chosen_team}</p>
                            <p>Away Moneyline: {game.un_chosen_moneyline}</p> */}
                        </div>
                    </div>

                        {/* <h2>Edit Bet?</h2> */}
                    <div className='bet-amount-container'>
                        <p className='bet-input-label'>BET AMOUNT</p>
                        <input className='bet-input' onChange={() => updateBet(event)} type="number" placeholder='Amount of bet'/>
                        <button className='bet-input-button' type='submit'>SUBMIT</button>
                        <br />
                        <button className='cancel-bet-button' type='button' onClick={() => returnToBets()}>CANCEL</button>
                    </div>
                    </form>
                </div>
                )
})}
        </>
    )
}

export default EditBet;