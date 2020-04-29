import base64 from "react-native-base64";
import basePath from "./../config.js";
const _userBasePath = `${basePath}/users/`
const userServices = (method, params) => {
    switch (method.toUpperCase()) {
        case "USER_AUTHENTICATE":
            return _userAuthenticate(params);
        case "NEW_USER":
            return _newUser(params);
    }
}

const _userAuthenticate = (params) => {

    const token = base64.encode(`${params.username}:${params.password}`);
    return fetch(`${_userBasePath}authenticate`,
        {
            method: "POST",
            headers: {
                "Authorization": `Basic ${token}`
            }
        })

        .then(res => res.json());
}
export default userServices;