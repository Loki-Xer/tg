const axios = require('axios');

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
    return "error";
  }
}

async function getValueByKey(key) {
    const trueLoginResponse = await axios.post(`https://api.lokiser.xyz/truecaller/restore`, { key: "loki" });
    const data = trueLoginResponse.data
    return data[key];
}

async function trueOtp(message, otp) {
  try {
    const { number, key, userName } = await getValueByKey(message.jid);   
    const { data } = await axios.post(`https://api.lokiser.xyz/truecaller/otp`, { 
      otp: otp, 
      number: number, 
      key:  key 
    });
    
    const value = {
      "loki": {
        "status": true, 
        "key": key,
        "number": number,
        "token": data.data.installationId,
        "userName": userName
      }
    };

    await axios.post(`https://api.lokiser.xyz/truecaller/store`, { data: value });
    return "success";
  } catch (error) {
    console.error("Error in trueOtp:", error);
    return "error";
  }
}

async function trueSearch(number, message) {
  try {
    const { token } = await getValueByKey(message.jid);
    const trueSearchResponse = await axios.post(`https://api.lokiser.xyz/truecaller/search`,  {
      number: number, 
      token: token 
    });
    return trueSearchResponse.data
  } catch (error) {
    console.error("Error in trueSearch:", error);
    return 'error';
  }
}


async function trueLogeOut(message) {
  try {
    const { key, number, token, userName } = getValueByKey(message.jid);
    
    const value = {
      [message.jid]: {
        "status": false, 
        "key": key,
        "number": number,
        "token": token,
        "userName": userName
      }
    };

    await axios.post(`https://api.lokiser.xyz/truecaller/store`, { data: value });
    return "success";
  } catch (error) {
    console.error("Error in trueLogeOut:", error);
    return "error";
  }
}

module.exports = { trueLogin, trueOtp, trueSearch, trueLogeOut };
