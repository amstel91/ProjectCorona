import { COUNTRY_CHANGE } from '../constants';
const initialState = {
country: 0
};
const countryReducer = (state = initialState, action) => {
switch(action.type) {
case COUNTRY_CHANGE:
return {
...state,
country:action.payload
};
default:
return state;
}
}
export default countryReducer;