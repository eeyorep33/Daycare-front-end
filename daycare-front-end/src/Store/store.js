import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../Reducers/RootReducer';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['appReducer'],
};

const pReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(pReducer, applyMiddleware(thunkMiddleware));
export const persistor = persistStore(store);
