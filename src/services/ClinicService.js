import {request} from "../base/HTTP";
import HttpMethod from "../constants/HttpMethod";

export async function getClinics(data) {
    return await request('/api/clinic/', data, HttpMethod.GET);
}