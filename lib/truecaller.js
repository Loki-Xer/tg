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

async function trueOtp(message, otp) {
  try {
    const jid = message.jid;
    const trueLoginResponse = await axios.post(`https://api.lokiser.xyz/truecaller/restore`, { key: "loki" });
    const trueLoginData = trueLoginResponse.data[jid];
    
    const trueOtpResponse = await axios.post(`https://api.lokiser.xyz/truecaller/otp`, { 
      otp: otp, 
      number: trueLoginData.number, 
      key:  trueLoginData.key 
    });
    
    const value = {
      [jid]: {
        "status": true, 
        "key": trueLoginData.key,
        "number": trueLoginData.number,
        "token": trueOtpResponse.data.data.installationId,
        "userName": message.user.username
      }
    };

    await axios.post(`https://api.lokiser.xyz/truecaller/store`, { data: value });
    return "success";
  } catch (error) {
    console.error("Error in trueOtp:", error);
    return "error";
  }
}

async function trueSearch(number, message, jid) {
  try {
    const trueLoginResponse = await axios.post(`https://api.lokiser.xyz/truecaller/restore`, { key: "loki" });
    const trueLoginData = trueLoginResponse.data[jid];
    const trueSearchResponse = await axios.post(`https://api.lokiser.xyz/truecaller/search`,  {
      number: number, 
      token: trueLoginData.token 
    });
    return trueSearchResponse.data
  } catch (error) {
    console.error("Error in trueSearch:", error);
    return 'error';
  }
}


async function trueLogeOut(message, jid) {
  try {
    const trueLoginResponse = await axios.post(`https://api.lokiser.xyz/truecaller/restore`, { key: "loki" });
    const trueLoginData = trueLoginResponse.data[jid]; 
    
    const value = {
      [jid]: {
        "status": false, 
        "key": trueLoginData.key,
        "number": trueLoginData.number,
        "token": trueLoginData.token,
        "userName": message.user.username
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
