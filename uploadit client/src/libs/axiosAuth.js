import axios from "axios";
import Cookies from "js-cookie";

var types = ["get", "delete", "head", "options", "post", "put", "patch"];

var f = {};
for (let i of types)
{
    f[i] = (url, param={}, header={}) => {
        let jwtToken = Cookies.get("JWT");
        Object.assign(header, jwtToken ? { Authorization: jwtToken } : {});
        param.headers = header;

        param.method = i;
        param.url = url;

        return axios(param);
    };
}

export default f;