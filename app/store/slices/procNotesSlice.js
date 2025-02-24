
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const API_BASE_URL = "https://7dg2llc8kl.execute-api.us-east-1.amazonaws.com/dev";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;



const convertToFHIR = (data) => {
  if (!data || typeof data !== "object") {
    return { error: "Invalid data input" };

  }

  return {
    resourceType: "Patient",
    id: data.PatNum || "unknown",
    name: [
      {
        family: data.LName || "Unknown",
        given: [data.FName || "Unknown", data.MiddleI || ""],
        use: "official",
      },
    ],
    gender: data.Gender?.toLowerCase() || "unknown",  
    birthDate: data.Birthdate || "unknown",  
    address: [
      {
        line: [data.Address || "", data.Address2 || ""], 
        city: data.City || "Unknown",
        state: data.State || "Unknown",
        postalCode: data.Zip || "Unknown",
      },
    ],
    telecom: [
      { system: "phone", value: data.HmPhone || "Unknown", use: "home" },
      { system: "email", value: data.Email || "Unknown", use: "home" },
    ],
    maritalStatus: {
      text: data.Position || "Unknown", 
    },
    communication: [
      {
        language: {
          text: data.Language || "English",
        },
      },
    ],
  };
};

// async Thunk middleware to process async operation in redux 
export const fetchProcNotesData = createAsyncThunk(
  'procNotesSlice/fetchProcNotesData',
  async (patientId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/procnotes/${patientId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type':'application/json',
          'x-api-key':API_KEY
        }
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const responseData = await response.json();
      const data = responseData.body
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }

    // mock data
    // const response = await new Promise((resolve) =>
    //   setTimeout(() => {
    //     resolve( {
    //       resourceType: "Patient",
    //       id:patientId,
    //       name: [
    //         {
    //           family: "Liu",
    //           given: ["Mingjie", ""],
    //           use: "official",
    //         },
    //       ],
    //       gender: "male",
    //       birthDate: "2000-05-14",
    //       address: [
    //         {
    //           line: ["125 Satin Heights", ""],
    //           city: "Greensboro",
    //           state: "NC",
    //           postalCode: "05698",
    //         },
    //       ],
    //       telecom: [
    //         { system: "phone", value: "(536)624-5871", use: "home" },
    //         { system: "phone", value: "(536)265-8587", use: "work" },
    //         { system: "phone", value: "(536)987-5621", use: "mobile" },
    //         { system: "email", value: "mjliu@example.com", use: "home" },
    //       ],
    //       maritalStatus: {
    //         text: "Single",
    //       },
    //       communication: [
    //         {
    //           language: {
    //             text: "Chinese",
    //           },
    //         },
    //       ],
    //     });
    //   }, 1000) // 模拟 1 秒延迟
    // );
    // return response; // 返回模拟数据
  }
);


const procNotesSlice = createSlice({
  name: 'patientSlice',
  initialState: {
    patient: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearPatient(state) {
      state.patient = null; // 清空患者数据
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProcNotesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProcNotesData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.patient = payload;
      })
      .addCase(fetchProcNotesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch patient data';
      });
  },
});

export const { clearPatient } = procNotesSlice.actions;

export default procNotesSlice.reducer;