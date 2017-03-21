import axios from 'axios';

const UserApi = { 

    inLogin:(data)=>{
        return axios.post('/auth/login',data)
        .then((res)=>{
            console.log(res);
            return res;
        }).catch((err)=>{
            console.log(err);
            return err; 

        });
    },
    onRegister:(data)=>{
        return axios.post('/auth/register',data)
        .then((res)=>{
            return res;
        }).catch((err)=>{
            return err;
        });
    },

    onGetUser: (data)=>{
        return axios.get('/auth/getUser')
            .then((res)=>{
                console.log(res);
                return res;
            }).catch((err)=>{
                console.log(err);
            });
    },
    inLogin:(data)=>{
        return axios.post('/auth/login',data)
        .then((res)=>{
            console.log(res);
            return res;
        }).catch((err)=>{
            console.log(err);
            return err; 

        });
    },
    onLogout:(data)=>{
        return axios.get('/auth/logout',data)
        .then((res)=>{
            console.log(res);
            return res;
        }).catch((err)=>{
            console.log(err);
            return err; 

        });

    }
}

export default UserApi;