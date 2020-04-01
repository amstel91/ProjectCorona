import { COUNTRY_CHANGE } from '../constants';
const initialState = {
country: ''
};
const countryReducer = (state = initialState, action) => {
switch(action.type) {
case COUNTRY_CHANGE:
    console.log(action.payload);
return {
...state,
country:action.payload
};
default:
return state;
}
}
export default countryReducer;