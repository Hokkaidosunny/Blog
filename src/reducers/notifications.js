import { handleActions } from 'redux-actions';
import {ADD_NOTIFICATION, REMOVE_NOTIFICATION} from '../actions/notification.js';
import {replaceState} from '../util/returnPayLoad.js';

export default handleActions({
  [ADD_NOTIFICATION]: replaceState,
  [REMOVE_NOTIFICATION]: replaceState
}, []);
