const betHistoryReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_BET_HISTORY':
        return action.payload;
      case 'UNSET_BET_HISTORY':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default betHistoryReducer;