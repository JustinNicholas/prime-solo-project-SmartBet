import { useDispatch } from 'react-redux';

function updateData(){
const CronJob = require('cron').CronJob;
const job = new CronJob(
'0 2 11 * * 2',
function() {
    console.log('Update the games');
    updateGames();
},
null,
true,
'America/Chicago'
);

const dispatch = useDispatch();

const updateGames = () => {
    dispatch({
        type: 'UPDATE_GAMES'
    })
    console.log('dipatched!');
}
}

module.exports = updateData;