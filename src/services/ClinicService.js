import {request} from "../base/HTTP";
import HttpMethod from "../constants/HttpMethod";

export async function getClinics(data) {
    return await request('/api/clinic/', data, HttpMethod.GET);
}

export async function getRateClinics() {
    return await request('/api/clinic/rate/list', {}, HttpMethod.GET);
}

export async function rateClinic(clinicId, rate) {
    return await request('/api/clinic/rate/' + clinicId + '/' + rate.value, {}, HttpMethod.POST);
}