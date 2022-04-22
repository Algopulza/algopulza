import {api} from "api/api"
import axios from "axios"

export const getWeek = async () => {
    return await api.get('user/vulnerability').then().catch();
}