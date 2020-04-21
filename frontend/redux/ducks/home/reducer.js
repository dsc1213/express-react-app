import { SETHOME } from './type';

const INITIAL_STATE = {
  isHome: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETHOME:
      return {
        ...state,
        isHome: action.payload,
      };
    default:
      return state;
  }
};
