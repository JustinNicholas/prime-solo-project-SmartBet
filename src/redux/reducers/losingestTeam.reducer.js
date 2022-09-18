const losingestTeamReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_LOSINGEST_TEAM':
        return action.payload;
      case 'UNSET_LOSINGEST_TEAM':
        return [];
      default:
        return state;
    }
  };

export default losingestTeamReducer;