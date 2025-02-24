import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './slices/paitentSlice';

const store = configureStore({
  reducer: {
    patientSlice: patientReducer, 
  },
});

export default store;