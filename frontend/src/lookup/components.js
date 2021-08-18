import axios from 'axios'


const globalUrl = "http://localhost:4567"

export class ApiLookup{
    static axiosLookup(method,endpoint,callback,data){
        const headers = {
            "Content-Type":"application/json"
        }
        axios({
            method:method,
            url: `${globalUrl}/api/${endpoint}`,
            headers:headers,
            data
        })
        .then(response=>{
            callback(response.data,response.status)
        })
        .catch((err)=>{
            callback({detail:'Hubo un error por favor intente mas tarde'},400)
            console.log(err)
        })
    }

    static getAlphaVantage(callback,symbol,function_){
        this.axiosLookup("POST","facadealpha",callback,{symbol:symbol,function:function_})
    }
}