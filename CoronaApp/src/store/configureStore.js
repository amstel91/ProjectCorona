import { createStore, combineReducers } from 'redux';
import countryReducer from '../reducers/countryReducer';
const rootReducer = combineReducers(
{ country: countryReducer }
);
const configureStore = () => {
return createStore(rootReducer);
}
export default configureStore;