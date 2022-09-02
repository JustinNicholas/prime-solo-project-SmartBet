const gamesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_GAMES':
        return action.payload;
      case 'UNSET_GAMES':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default gamesReducer;