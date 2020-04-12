import {createStore, combineReducers,applyMiddleware} from 'redux';
import countryReducer from '../reducers/countryReducer';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { createLogger } from 'redux-logger';

// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ['country'],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [],
};
const rootReducer = combineReducers({country: countryReducer});
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
    persistedReducer,
    applyMiddleware(
      createLogger(),
    ),
  );
// const configureStore = () => {
//   return createStore(rootReducer);
// };
// Middleware: Redux Persist Persister
let persistor = persistStore(store);
// Exports
export {
  store,
  persistor,
};
