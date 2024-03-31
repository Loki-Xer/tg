const axios = require('axios');

async function token(jid) {
    try {
        const numberData = await axios.post(`https://api.lokiser.xyz/truecaller/restore`, { key: "login", id: jid });
        const tokenData = await axios.post(`https://api.lokiser.xyz/truecaller/restore`, { key: "token", id: numberData.data.number });
        return tokenData.data.token;
    } catch (error) {
        console.error("Error in token retrieval:", error);
        throw error; 
    }
}

async function trueLogin(message, number) {
    try {
        const trueData = await axios.post(`https://api.lokiser.xyz/truecaller/login`, { phoneNumber: number });
        const value = {
            [message.jid]: {
                "status": true, 
                "key": trueData.data.data.requestId,
                "number": number,
                "token": null,
                "userName": message.user.username
            }
        };
        await axios.post(`https://api.lokiser.xyz/truecaller/store`, { data: value });
        return "success";
    } catch (error) {
        console.error("Error in trueLogin:", error);
        throw error;
    }
}

async function trueOtp(message, otp) {
    try {
        const { data } = await axios.post(`https://api.lokiser.xyz/truecaller/restore`, { key: "login", id: message.jid });
        await axios.post(`https://api.lokiser.xyz/truecaller/otp`, { 
            otp: otp, 
            number: data.number, 
            key:  data.key 
        });
        return "success";
    } catch (error) {
        console.error("Error in trueOtp:", error);
        throw error;
    }
}

async function trueSearch(number, message) {
    try {
        const tokenValue  = await token(message.jid);
        const trueSearchResponse = await axios.post(`https://api.lokiser.xyz/truecaller/search`, {
            number: number, 
            token: tokenValue 
        });
        return trueSearchResponse.data;
    } catch (error) {
        console.error("Error in trueSearch:", error);
        throw error;
    }
}

module.exports = { trueLogin, trueOtp, trueSearch };
