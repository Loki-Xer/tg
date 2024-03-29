const axios = require('axios');

async function trueLogin(message, number) {
  try {
    const trueData = await axios.post(`https://api.lokiser.xyz/truecaller/login`, { phoneNumber: number });
    const value = {
      [message.jid]: {
        "status": trueData.data.status, 
        "key": trueData.data.data.requestId,
        "number": number,
        "token": null,
        "userName": message.user.username
      }
    };

    await axios.post(`https://api.lokiser.xyz/truecaller/store`, { data: value });

    return "true";;
  } catch (error) {
    console.error("Error in trueLogin:", error);
    throw error;
  }
}

async function trueOtp(message, otp) {
  try {
    const trueLoginResponse = await axios.post(`https://api.lokiser.xyz/truecaller/restore`, { key: "loki" });
    const trueLoginData = trueLoginResponse.data[message.jid]; 
    
    const trueOtpResponse = await axios.post(`https://api.lokiser.xyz/truecaller/otp`, { 
      otp: otp, 
      number: trueLoginData.number, 
      key:  trueLoginData.key 
    });
    
    const value = {
      [message.jid]: {
        "status": trueOtpResponse.data.status, 
        "key": trueLoginData.key,
        "number": trueLoginData.number,
        "token": trueOtpResponse.data.data.installationId,
        "userName": message.user.username
      }
    };

    await axios.post(`https://api.lokiser.xyz/truecaller/store`, { data: value });
  } catch (error) {
    console.error("Error in trueOtp:", error);
    throw error;
  }
}


async function trueSearch(number, message) {
  try {
    const trueLoginResponse = await axios.post(`https://api.lokiser.xyz/truecaller/restore`, { key: "loki" });
    const trueLoginData = trueLoginResponse.data[message.jid];
    const trueSearchResponse = await axios.post(`https://api.lokiser.xyz/truecaller/search`,  {
      number: number, 
      token: trueLoginData.token 
    });
    return trueSearchResponse.data; 
  } catch (error) {
    console.error("Error in trueSearch:", error);
    throw error;
  }
}


async function trueLogeOut(message) {
  try {
    const trueLoginResponse = await axios.post(`https://api.lokiser.xyz/truecaller/restore`, { key: "loki" });
    const trueLoginData = trueLoginResponse.data[message.jid]; 
    
    const value = {
      [message.jid]: {
        "status": false, 
        "key": trueLoginData.key,
        "number": trueLoginData.number,
        "token": trueLoginData.token,
        "userName": message.user.username
      }
    };

    await axios.post(`https://api.lokiser.xyz/truecaller/store`, { data: value });
  } catch (error) {
    console.error("Error in trueLogeOut:", error);
    throw error;
  }
}

module.exports = { trueLogin, trueOtp, trueSearch, trueLogeOut };
