import {request} from "../base/HTTP";
import HttpMethod from "../constants/HttpMethod";

export async function resetPasswordRequest(data) {
    return await request('/api/users/password/reset', data, HttpMethod.POST);
}

export async function resetPassword(data) {
    return await request('/api/users/password/reset_form', data, HttpMethod.POST);
}

export async function register(data) {
    return await request('/api/user/', data, HttpMethod.POST);
}

export async function activateUser(token) {
    return await request('/api/user/activate/' + token, {}, HttpMethod.POST);
}

export async function editProfile(data) {
    return await request('/api/user/edit', data, HttpMethod.POST);
}

export async function getUnconfrimedUsers(data) {
    return await request('/api/user/unconfirmedUsers', data, HttpMethod.GET);
}

export async function confirmeUser(id) {
    return await request('/api/user/confirmUser/' + id, {}, HttpMethod.POST);
}

export async function declineUser(id, message) {
    return await request('/api/user/declineUser/' + id + '/' + message, {}, HttpMethod.POST);
}