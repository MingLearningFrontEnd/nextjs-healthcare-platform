import { configureStore } from '@reduxjs/toolkit';
import patientSliceReducer from './slices/paitentSlice';
import providerSliceReducer from './slices/providerSlice';
import practiceSliceReducer from './slices/practiceSlice';

export const store = configureStore({
    reducer: {
        patientSlice: patientSliceReducer,
        providerSlice: providerSliceReducer,
        practiceSlice: practiceSliceReducer,
    },
});

export default store;