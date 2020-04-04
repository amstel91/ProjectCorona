import { COUNTRY_CHANGE } from '../constants';
export function changeCountry(country) {
    //console.log(country);
return {
type: COUNTRY_CHANGE,
payload: country
}
}