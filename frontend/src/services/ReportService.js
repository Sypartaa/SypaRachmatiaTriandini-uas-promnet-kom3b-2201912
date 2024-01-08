import axios from 'axios';

const MONEY_API_BASE_URL = "http://localhost:9080/reports";

class ReportService {

    GetMoneys(){
        return axios.get(MONEY_API_BASE_URL);
    }

    CreateMoney(money){
        return axios.post(MONEY_API_BASE_URL, money);
    }

    GetMoneyById(moneyId){
        return axios.get(MONEY_API_BASE_URL + '/' + moneyId);
    }

    UpdateMoney(money, moneyId){
        return axios.put(MONEY_API_BASE_URL + '/' + moneyId, money);
    }

    DeleteMoney(moneyId){
        return axios.delete(MONEY_API_BASE_URL + '/' + moneyId);
    }
}

export default new ReportService()