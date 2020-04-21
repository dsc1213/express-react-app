import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createBrowserHistory as createHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';
import * as reducers from './ducks';
import { baseName, nodeEnv } from '../config/env';

const history = createHistory({ basename: baseName });
const routeMiddleware = routerMiddleware(history);

const middleware = [thunk, routeMiddleware];
const isProd = nodeEnv == 'production' || nodeEnv == 'prod';
if (!isProd) {
  middleware.push(createLogger());
}

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
};

const rootReducer = combineReducers({
  ...reducers,
  router: connectRouter(history),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middleware)));

export const persistor = persistStore(store);

export { store, history };
