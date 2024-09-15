
export const METHOD_POST = "POST";
export const userLocal = '@user'
export const logoutLocal = '@logout'
export const SERVICE_KEY = 'CgYh5TbHicce4HDZzk11At2Z2k1DuxkR'
export const base_url = "https://erp.zangueandpartners.com"; //http://192.168.0.103:8095  http://192.168.43.154:8095 https://mimisets.com
// export const base_url = "https://dev.metuaa.com"; //http://192.168.0.103:8095  http://192.168.43.154:8095 https://mimisets.com

export const DATABASE = 'zangue_erp' //lewootrack_dev_db me lewootrack_dev_db tua_db_14

const headers = new Headers();


headers.append('api-key', "THAL7SP0JJZ3O5S5Q0Y1LAOSHHG65R7M")
headers.append('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluQHphbmd1ZS5jb20iLCJ1aWQiOjJ9.6tNcn0q4VbxVo5Dmxb2Mm49lTFi-w5l2ccYrZBHGa3k")
// headers.append('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluQG1ldHVhYS5vcmciLCJ1aWQiOjJ9.IVq2qul-eEnyvdhaFndrLK5WDZ0A0-uOKTJ7QV8mhWw")
export const requestFetch = (url, req) => {
    return fetch(url, req);
};
export const SOCKET_SERVER_URL_USERS = 'http://95.111.244.110:3001';



export async function postData(url, { arg }) {
    console.log("request URL", url);
    console.log("request arg", JSON.stringify(arg));
    return fetch(url, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(arg)
    }).then((res) => {
        // console.log("mauvaise reponse", res);
        if (res.ok) {
            return res.json()
        } else {
            console.log("mauvaise reponse", res);
        }
    })
}



export async function putDataMRedis(url, { arg }) {
    console.log("request URL", url);
    console.log("request arg", arg);

    return fetch(url, {
        headers: { 'Content-Type': 'application/json', },
        method: 'PUT',
        body: JSON.stringify(arg)
    }).then((res) => {
        if (res.ok) {
            return res.json()
        } else {
            console.log("mauvaise reponse", res);
        }
    })
}
export async function AddAmount(url, { arg }) {
    console.log("request URL", url);
    console.log("request arg", arg);

    const formdata = new FormData();
    formdata.append("partner_id", arg?.partner_id);
    formdata.append("amount", arg?.amount);
    formdata.append("journal_id", arg?.selectJournals);
    return fetch(url, {
        headers: headers,
        method: 'POST',
        body: formdata
    }).then((res) => {
        // console.log("mauvaise reponse", res);
        if (res.ok) {
            return res.json()
        } else {
            console.log("mauvaise reponse", res);
        }
    })
}
export async function RechargeMobileWalletEnd(url, { arg }) {
    console.log("request URL", url);
    console.log("request arg", arg);

    const formData = new FormData();
    for (const key in arg) {
        formData.append(key, arg[key]);
    }

    console.log(formData);
    return fetch(url, {
        headers: headers,
        method: 'POST',
        body: formData
    }).then((res) => {
        // console.log("mauvaise reponse", res);
        if (res.ok) {
            return res.json()
        } else {
            console.log("mauvaise reponse", res);
        }
    })
}
export async function MobileRechargeBalence(url, { arg }) {
    console.log("request URL", url);
    console.log("request arg", arg);

    const formdata = new FormData();
    formdata.append("service", SERVICE_KEY);
    formdata.append("amount", arg?.amount);
    formdata.append("phonenumber", arg?.phoneNumber);
    return fetch(url, {
        headers: headers,
        method: 'POST',
        body: formdata
    }).then((res) => {
        // console.log("mauvaise reponse", res);
        if (res.ok) {
            return res.json()
        } else {
            console.log("mauvaise reponse", res);
        }
    })
}
export async function MobileVerifyBalence(url, { arg }) {
    console.log("request URL", url);
    console.log("request arg", arg);

    const formdata = new FormData();
    formdata.append("paymentId", arg?.paymentId);

    return fetch(url, {
        headers: headers,
        method: 'POST',
        body: formdata
    }).then((res) => {
        if (res.ok) {
            return res.json()
        } else {
            console.log("mauvaise reponse", res);
        }
    })
}
export async function SentOtp(url, { arg }) {
    console.log("request URL", url);
    const formdata = new FormData();
    formdata.append("email", arg?.email);

    return fetch(url, {
        headers: headers,
        method: 'POST',
        body: formdata
    }).then((res) => {
        if (res.ok) {
            return res.json()
        } else {
            console.log("mauvaise reponse", res);
        }
    })
}
export async function VerifyOtp(url) {
    console.log("request URL", url);
    return fetch(url, {
        headers: headers,
        method: 'GET',
    }).then((res) => {
        if (res.ok) {
            return res.json()
        } else {
            console.log("mauvaise reponse", res);
        }
    })
}
export async function postDataDoc(url, { arg }) {
    console.log("request URL", url);
    console.log("request arg", arg);

    const formdata = new FormData();

    formdata.append("file", arg?.file);
    formdata.append("record_id", arg?.record_id);
    formdata.append("name", arg?.name);
    formdata.append("begin_date", "2010-10-12 23:22:22");
    formdata.append("end_date", "2060-10-12 23:22:22");
    formdata.append("type", arg.type);

    console.log("request formdata", formdata);
    return fetch(url, {
        headers: headers,
        method: 'POST',
        body: formdata
    }).then((res) => {
        // console.log("mauvaise reponse", res);
        if (res.ok) {
            return res.json()
        } else {
            console.log("mauvaise reponse", res);
        }
    })
}

function getCorrectDateFormat(chaine) {

    const date = new Date(chaine);

    const formattedDate = date.toISOString().replace('T', ' ').replace(/\.\d+Z/, '');
    return formattedDate;
}
export async function postDataVehicule(url, { arg }) {
    console.log("request URL", url);
    console.log("request arg", arg);
    const { images } = arg
    var image = {}
    const formdata = new FormData();
    if (images) {

        if (images.face) {
            console.log("images face---------", images.face);
            formdata.append("face", images.face);

        }
        if (images.dos) {
            formdata.append("dos", images.dos);
        }
        if (images.cote) {
            formdata.append("cote", images.cote);
        }
        if (images.interieur) {
            formdata.append("interieur", images.interieur);
        }
    }

    formdata.append("user_id", arg?.UserID?.toString());
    formdata.append("chassisNumber", arg?.chassisNumber?.toString() || "0");
    formdata.append("licensePlate", arg?.licensePlate?.toString() || "---");
    formdata.append("model_id", arg?.model || 0);

    formdata.append("bluetooth", arg?.bluetooth?.toString() || "false");
    formdata.append("comfort", arg?.comfort?.toString() || "VIP");
    formdata.append("fleet_class", arg?.mode?.toString() || "VIP");
    formdata.append("fleet_comfort", arg?.comfort?.toString() || "VIP");
    formdata.append("class_vehicle_id", arg?.mode?.toString());
    formdata.append("comfort_vehicle_id", arg?.comfort?.toString());
    formdata.append("gps", arg?.gps?.toString() || "false");
    // formdata.append("imatriculationDate", arg?.imatriculationDate?.toString() || "--");
    formdata.append("imei", arg?.imei?.toString() || "00000");
    formdata.append("passagerNumber", arg?.passagerNumber?.toString() || 5);
    formdata.append("seats", arg?.passagerNumber?.toString() || 4);
    formdata.append("dorNumber", arg?.dorNumber?.toString() || 2);
    formdata.append("color", arg?.color?.toString() || "Noire");
    formdata.append("modelYear", arg?.modelYear?.toString() || "0");
    formdata.append("description", arg?.description?.toString() || "-----");
    if (arg?.driver) {
        formdata.append("driver_id", arg?.driver);
    }
    formdata.append("rent", arg?.rent || "false");

    if (arg?.rentEndTime && arg?.rentStartTime && arg?.rent) {
        formdata.append("rent", arg?.rent);

        formdata.append("rentEndTime", getCorrectDateFormat(arg?.rentEndTime));
        formdata.append("rentStartTime", getCorrectDateFormat(arg?.rentStartTime));
    }

    // formdata.append("mode", arg?.mode?.toString() || "");
    formdata.append("mode", arg?.mode || "A");
    console.log("request formdata", formdata);
    return fetch(url, {
        headers: headers,
        method: 'POST',
        body: formdata
    }).then((res) => {
        console.log("mauvaise reponse", res);
        if (res.ok) {
            return res.json()
        } else {
            console.log("mauvaise reponse", res);
        }
    })
}
export async function putData(url, { arg }) {
    console.log("request URL", url);
    console.log("request arg", arg);

    return fetch(url, {
        headers: headers,
        method: 'PUT',
        body: JSON.stringify(arg)
    }).then((res) => {
        if (res.ok) {
            return res.json()
        } else {
            console.log("mauvaise reponse", res);
        }
    })
}
export function putDataM(url, { arg }) {
    console.log("request URL", url);
    console.log("request arg", arg);

    return fetch(url, {
        headers: headers,
        method: 'PUT',
        body: JSON.stringify(arg)
    }).then((res) => {
        if (res.ok) {
            return res.json()
        } else {
            console.log("mauvaise reponse", res);
        }
    })
}
export async function getData(url) {
    // console.log("request URL", url);


    return fetch(url, {
        headers: headers,
        method: 'GET',
    }).then((res) => {
        if (res.ok) {

            return res.json()
        } else {
            console.log("mauvaise reponse", res);

        }
    })
}
export const getDataM = (url) => {
    console.log("request URL", url);


    return fetch(url, {
        headers: headers,
        method: 'GET',
    }).then((res) => {
        if (res.ok) {

            return res.json()
        } else {
            console.log("mauvaise reponse", res);
            throw new Error("Erreur lors de l'execution de la requete status:" + res.status + "" + res.statusText);

        }
    })
}
