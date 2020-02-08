import {request} from "../base/HTTP";
import HttpMethod from "../constants/HttpMethod";

export async function getAppointments(data) {
    return await request('/api/appointment/patient', data, HttpMethod.GET);
}

export async function getAppointmentsHistory(data) {
    return await request('/api/appointment/patient/history', data, HttpMethod.GET);
}

export async function getUnconfirmedAppointments(data) {
    return await request('/api/appointment/unconfirmed', data, HttpMethod.GET);
}

export async function getAppointmentTypes(data) {
    return await request('/api/appointmentType/');
}

export async function getTermins(type, date, city, clientId, name) 
{
    name = name ? name : 'null';

    return await request('/api/doctorTermin/' + clientId + '/' + type + '/' + date + '/' + city + '/' + name);
}

export async function getClinicsTermins(type, date, city) {
    return await request('/api/doctorTermin/clinics/' + type + '/' + date + '/' + city);
}

export async function getFreeDoctorTermins(clinicId) {
    return await request('/api/doctorTermin/free/' + clinicId);
}

export async function createAppointmentFromTermin(terminId) {
    return await request('/api/appointment/fromTermin/' + terminId, {}, HttpMethod.POST)
}

export async function approveAppointment(appointmentId, terminId, hallId) {
    return await request('/api/appointment/approve/' + appointmentId + "/" + terminId + "/" + hallId, {}, HttpMethod.POST)
}

export async function acceptAppointment(id) {
    return await request('/api/appointment/accept/' + id, {}, HttpMethod.POST);
}

export async function rejectAppointment(id) {
    return await request('/api/appointment/reject/' + id, {}, HttpMethod.POST);
}