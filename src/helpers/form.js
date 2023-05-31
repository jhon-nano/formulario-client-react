import { API } from "aws-amplify";
import axios from "axios";

export function getCountries() {
    return new Promise((resolve, reject) => {
        axios.get('https://countriesnow.space/api/v0.1/countries')
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                reject(error)
            });
    });
}

export function getForms() {
    return new Promise((resolve, reject) => {
        API.get('api', '/form/list')
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                reject(error)
            });
    });
}

export function createForm(data) {
    return new Promise((resolve, reject) => {
        API.post('api', '/form/create', { body: data })
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                reject(error)
            });
    });
}



