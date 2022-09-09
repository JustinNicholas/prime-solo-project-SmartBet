import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  // const CronJob = require('cron').CronJob;
  // const job = new CronJob(
  // '0 0 2 * * 2',
  // function() {
  //     console.log('Update the games');
  //     updateGames();
  // },
  // null,
  // true,
  // 'America/Chicago'
  // );

  // const dispatch = useDispatch();

  // const updateGames = () => {
  //     dispatch({
  //         type: 'UPDATE_GAMES'
  //     })
  //     console.log('dipatched!');
  // }

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />

    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
