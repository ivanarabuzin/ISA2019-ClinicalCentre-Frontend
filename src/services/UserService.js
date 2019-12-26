import {request} from "../base/HTTP";
import HttpMethod from "../constants/HttpMethod";

export async function resetPasswordRequest(data) {
    return await request('/api/users/password/reset', data, HttpMethod.POST);
}

export async function resetPassword(data) {
    return await request('/api/users/password/reset_form', data, HttpMethod.POST);
}