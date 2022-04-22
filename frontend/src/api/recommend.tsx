import {api} from "api/api"
import axios from "axios"

export const getRecommend = async () => {
    return await api.get('/recomm/vulnerability').then().catch();
}