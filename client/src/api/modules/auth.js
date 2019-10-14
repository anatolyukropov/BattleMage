import axios from '../axiosConfig';

export default {
    logIn: data =>
        new Promise((resolve, reject) => {
            axios
                .post(`/login`, data)
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    reject(err);
                });
        }),

    logOut: () => {
        new Promise((resolve, reject) => {
            axios
                .delete(`/logOut`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
};
