import { request } from '@/app/utils/http/requests';

export const getPatients = async () => {
    const response = await request.get('/patients');
    return response;
};
