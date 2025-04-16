import { configureStore } from '@reduxjs/toolkit';
import patientSliceReducer from './slices/paitentSlice';
import providerSliceReducer from './slices/providerSlice';
import practiceSliceReducer from './slices/practiceSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        patientSlice: patientSliceReducer,
        providerSlice: providerSliceReducer,
        practiceSlice: practiceSliceReducer,
        auth: authReducer,
    },
});

export default store;