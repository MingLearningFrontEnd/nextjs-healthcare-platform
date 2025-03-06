import { configureStore } from '@reduxjs/toolkit';
import patientSliceReducer from './slices/paitentSlice';
import providerSliceReducer from './slices/providerSlice';

export const store = configureStore({
    reducer: {
        patientSlice: patientSliceReducer,
        providerSlice: providerSliceReducer,
    },
});

export default store;