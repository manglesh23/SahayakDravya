const twilio = require("twilio");

/* -------------------------------------------------------------------------- */
/*           Send SMS Notification via tiwilio                                */
/* -------------------------------------------------------------------------- */ 
const sendsms = async (to, text) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_ACCOUNT_TOKEN;
  const twilioPhoneNumber = "+18479614889";
  const client = twilio(accountSid, authToken);

  try {
    await client.messages.create({
      to: "+918084377799",
      from: twilioPhoneNumber,
      body: text,
    });
    console.log("SMS SENT");
  } catch (e) {
    console.log(e);
  }
};

module.exports = { sendsms };
