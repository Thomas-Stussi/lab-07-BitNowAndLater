const SES = require('aws-sdk/clients/ses');

const client = new SES();

const sendEmail = (to, subject, body) => {
  return new Promise((resolve, reject) => {
    client.sendEmail({
      Destination: {
        ToAddresses: [to]
      },
      Message: {
        Body: {
          Text: {
            Data: body
          }
        },
        Subject: {
          Data: subject
        }
      },
      Source: 'benwaples@gmail.com'
    }, (err, response) => {
      if(err) reject(err);
      else resolve(response);
    });
  });
};

module.exports = sendEmail;
