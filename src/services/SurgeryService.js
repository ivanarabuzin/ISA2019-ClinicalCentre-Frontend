import {request} from "../base/HTTP";
import HttpMethod from "../constants/HttpMethod";

export async function getSurgeries(data) {
    return await request('/api/surgery/', data, HttpMethod.GET);
}