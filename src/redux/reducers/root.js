import { combineReducers } from '@reduxjs/toolkit';

const r = (state = 0, action) => {
  switch (action.type) {
    case 'SOME':
      return state + 5;
    default:
      return state;
  }
};

const root = combineReducers({ rrr: r });

export default root;
