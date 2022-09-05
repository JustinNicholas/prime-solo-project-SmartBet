const currentWeeReducer = (state = 0, action) => {
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
  export default gamesReducer;