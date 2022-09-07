const teamsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_TEAMS':
        return action.payload;
      case 'UNSET_TEAMS':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  export default teamsReducer;