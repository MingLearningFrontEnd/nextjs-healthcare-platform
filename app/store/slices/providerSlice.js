import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProviderBanner } from '../../(main)/provider-portal/components/ProviderBanner.jsx';
import { ProviderNavigation } from '../../(main)/provider-portal/components/ProviderNavigation.jsx';

// 创建异步 thunk action
export const fetchProviderData = createAsyncThunk(
    'provider/fetchProvider',
    async (providerId) => {
        try {
            // 这里暂时使用模拟数据
            const mockProviderData = {
                id: providerId,
                name: "Dr. Smith",
                specialty: "Dentist",
                email: "dr.smith@example.com",
                phone: "123-456-7890",
                address: "123 Medical Center Dr.",
                patients: [],
                schedule: [],
                // 其他需要的provider数据...
            };
            
            return mockProviderData;
        } catch (error) {
            throw error;
        }
    }
);

const providerSlice = createSlice({
    name: 'provider',
    initialState: {
        provider: null,
        loading: false,
        error: null
    },
    reducers: {
        clearProvider: (state) => {
            state.provider = null;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProviderData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProviderData.fulfilled, (state, action) => {
                state.loading = false;
                state.provider = action.payload;
            })
            .addCase(fetchProviderData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { clearProvider } = providerSlice.actions;
export default providerSlice.reducer;
