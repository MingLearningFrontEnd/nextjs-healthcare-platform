import { request } from '@/app/utils/http/requests';

export const getPatients = async (page = 1, perPage = 20) => {
    const params = {
        subdomain: 'smileconnect-incorperated-demo-practice',
        location_id: '312080',
        page,
        per_page: perPage
    };
    return request.get('/patients', params);
};

export const getPatientById = async (patientId) => {
    if (!patientId || patientId === '1') {
        return Promise.reject(new Error('Invalid patient ID'));
    }

    const params = {
        subdomain: process.env.NEXT_PUBLIC_SUBDOMAIN,
    };
    return request.get(`/patients/${patientId}`, params);
};


