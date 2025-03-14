import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 创建异步 thunk action
export const fetchPracticeData = createAsyncThunk(
    'practice/fetchPractice',
    async () => {
        try {
            // 模拟数据，直接使用固定的 ID
            const mockPracticeData = {
                id: "1",  // 固定的 ID
                name: "Dr. John Smith",
                type: "Dental Clinic",
                email: "info@pearldental.com",
                phone: "123-456-7890",
                role: "practice administrator",
                address: "123 Pearl Street, New York, NY 10001",
                operatingHours: {
                    monday: "9:00 AM - 6:00 PM",
                    tuesday: "9:00 AM - 6:00 PM",
                    wednesday: "9:00 AM - 6:00 PM",
                    thursday: "9:00 AM - 6:00 PM",
                    friday: "9:00 AM - 5:00 PM"
                },
                providers: [],
                staff: [],
                specialties: [
                    "General Dentistry",
                    "Orthodontics",
                    "Periodontics",
                    "Endodontics"
                ]
            };
            
            return mockPracticeData;
        } catch (error) {
            throw error;
        }
    }
);

const practiceSlice = createSlice({
    name: 'practice',
    initialState: {
        practice: null,
        loading: false,
        error: null
    },
    reducers: {
        clearPractice: (state) => {
            state.practice = null;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPracticeData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPracticeData.fulfilled, (state, action) => {
                state.loading = false;
                state.practice = action.payload;
            })
            .addCase(fetchPracticeData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { clearPractice } = practiceSlice.actions;
export default practiceSlice.reducer; 