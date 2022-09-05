const currentWeekReducer = (state = 0, action) => {
    console.log(action.payload);
    console.log('IN SET WEEK NOWWW', action.payload);
    switch (action.type) {
      case 'SET_WEEK':
        return action.payload;
      case 'UNSET_WEEK':
        return 0;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default currentWeekReducer;