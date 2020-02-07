import {request} from "../base/HTTP";
import HttpMethod from "../constants/HttpMethod";

export async function getRecords(data) {
    return await request('/api/record/', data, HttpMethod.GET);
}