import { combineReducers } from 'redux';
import vatReducer from './vat';

const rootReducer = combineReducers({vat: vatReducer});
export default rootReducer;
