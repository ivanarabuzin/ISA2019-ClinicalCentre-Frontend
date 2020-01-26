import {request} from "../base/HTTP";
import HttpMethod from "../constants/HttpMethod";

export async function getAppointments(data) {
    return await request('/api/appointment/patient', data, HttpMethod.GET);
}

export async function getAppointmentTypes(data) {
    return await request('/api/appointmentType/');
}

export async function getTermins(type, date) {
    return await request('/api/doctorTermin/' + type + '/' + date);
}