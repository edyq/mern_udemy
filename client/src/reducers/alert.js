// a function that takes in a state (that is related to alerts)
// and then take action. the action is going to get dispatched from
// the action file
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState = [];

// action would contain a type and a payload
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload]; // copy the initialState and add action.payload
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}