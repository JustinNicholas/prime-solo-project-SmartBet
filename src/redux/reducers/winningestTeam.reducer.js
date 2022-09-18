const winningestTeamReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_WINNINGEST_TEAM':
        return action.payload;
      case 'UNSET_WINNINGEST_TEAM':
        return [];
      default:
        return state;
    }
  };

export default winningestTeamReducer;