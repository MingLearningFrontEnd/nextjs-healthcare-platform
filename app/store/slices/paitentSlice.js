import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 模拟数据
const mockPatients = {
  '2': {
    id: '2',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    bio: {
      gender: 'male',
      date_of_birth: '1980-01-01',
      address_line_1: '123 Main St',
      address_line_2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zip_code: '10001',
      home_phone_number: '(555) 123-4567',
      cell_phone_number: '(555) 987-6543',
      work_phone_number: '(555) 456-7890',
      emergency_contact_name: 'Jane Doe',
      emergency_contact_relation: 'Spouse',
      emergency_contact_phone: '(555) 789-0123'
    },
    insurance: {
      provider: 'Blue Cross',
      policy_number: 'BC123456789',
      group_number: 'GRP987654',
      expiration_date: '2024-12-31'
    },
    preferred_language: 'English',
    balance: { amount: '150.00', currency: 'USD' },
    chart_id: 'CHART001',
    billing_type: 'Standard',
    inactive: false
  },
  '3': {
    id: '3',
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    bio: {
      gender: 'female',
      date_of_birth: '1985-05-15',
      address_line_1: '456 Oak Ave',
      address_line_2: '',
      city: 'Los Angeles',
      state: 'CA',
      zip_code: '90001',
      home_phone_number: '(555) 234-5678',
      cell_phone_number: '(555) 876-5432',
      work_phone_number: '(555) 345-6789',
      emergency_contact_name: 'John Smith',
      emergency_contact_relation: 'Spouse',
      emergency_contact_phone: '(555) 678-9012'
    },
    insurance: {
      provider: 'Aetna',
      policy_number: 'AE987654321',
      group_number: 'GRP123456',
      expiration_date: '2024-12-31'
    },
    preferred_language: 'English',
    balance: { amount: '75.50', currency: 'USD' },
    chart_id: 'CHART002',
    billing_type: 'Premium',
    inactive: false
  }
};

const convertToFHIR = (data) => {
  if (!data || typeof data !== "object") {
    return { error: "Invalid data input" };
  }

  return {
    resourceType: "Patient",
    id: data.id || "unknown",
    name: [
      {
        family: data.last_name || "Unknown",
        given: [data.first_name || "Unknown", data.middle_name || ""],
        use: "official",
      },
    ],
    gender: data.bio?.gender?.toLowerCase() || "unknown",
    birthDate: data.bio?.date_of_birth || "unknown",
    address: [
      {
        line: [
          data.bio?.address_line_1 || "",
          data.bio?.address_line_2 || ""
        ],
        city: data.bio?.city || "Unknown",
        state: data.bio?.state || "Unknown",
        postalCode: data.bio?.zip_code || "Unknown",
      },
    ],
    telecom: [
      { 
        system: "phone", 
        value: data.bio?.home_phone_number || "Unknown", 
        use: "home" 
      },
      { 
        system: "phone", 
        value: data.bio?.cell_phone_number || "Unknown", 
        use: "mobile" 
      },
      { 
        system: "phone", 
        value: data.bio?.work_phone_number || "Unknown", 
        use: "work" 
      },
      { 
        system: "email", 
        value: data.email || "Unknown", 
        use: "home" 
      },
    ],
    maritalStatus: {
      text: "Unknown",
    },
    communication: [
      {
        language: {
          text: data.preferred_language || "English",
        },
      },
    ],
    emergencyContact: {
      emergencyContactName: data.bio?.emergency_contact_name || "",
      relation: data.bio?.emergency_contact_relation || "",
      phoneNumber: data.bio?.emergency_contact_phone || ""
    },
    insuranceInfo: {
      provider: data.insurance?.provider || "",
      policyNumber: data.insurance?.policy_number || "",
      GroupNumber: data.insurance?.group_number || "",
      expirDate: data.insurance?.expiration_date || "",
    },
    balance: data.balance || { amount: "0.00", currency: "USD" },
    chartId: data.chart_id || null,
    billingType: data.billing_type || "Standard",
    inactive: data.inactive || false
  };
};

// async Thunk middleware to process async operation in redux 

export const fetchPatientData = createAsyncThunk(
  'patientSlice/fetchPatientData',
  async (patientId, { rejectWithValue }) => {
    try {
      // 使用模拟数据
      if (!patientId || !mockPatients[patientId]) {
        throw new Error('Invalid patient ID');
      }

      const mockData = mockPatients[patientId];
      const fhirData = convertToFHIR(mockData);
      console.log('Mock FHIR data:', fhirData);
      
      return fhirData;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to load patient data");
    }
  }
);

const patientSlice = createSlice({
  name: 'patientSlice',
  initialState: {
    patient: null,       
    loading: false,
    error: null,
  },
  reducers: {
    clearPatient(state) {
      state.patient = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 处理获取单个患者
      .addCase(fetchPatientData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.patient = payload;
      })
      .addCase(fetchPatientData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearPatient } = patientSlice.actions;
export default patientSlice.reducer;
