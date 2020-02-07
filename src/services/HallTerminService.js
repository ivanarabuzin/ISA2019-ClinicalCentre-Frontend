import {request} from "../base/HTTP";
import HttpMethod from "../constants/HttpMethod";

export async function getClinicsHallTermins(clinicId, date) {
    return await request('/api/hallTermin/' + clinicId + '/' + date);
}