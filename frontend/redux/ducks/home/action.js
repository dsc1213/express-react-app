import { SETHOME } from './type';

export const setHome = data => ({
  type: SETHOME,
  payload: data,
});
