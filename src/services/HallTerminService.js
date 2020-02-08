import {request} from "../base/HTTP";
import HttpMethod from "../constants/HttpMethod";
import { dateToString } from "../util/DateUtil";

export async function getClinicsHallTermins(clinicId, date) {
    return await request('/api/hallTermin/' + clinicId + '/' + dateToString(date));
}

export async function getFreeHallTermins(clinicId) {
    return await request('/api/hallTermin/free/' + clinicId);
}