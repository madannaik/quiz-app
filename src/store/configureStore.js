import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { loginStore } from './login';

import { reducer } from './questions';


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const combine = combineReducers({
  answered:reducer,
  login:loginStore
})

const persistedReducer = persistReducer(persistConfig, combine)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})
export const persistor = persistStore(store);
