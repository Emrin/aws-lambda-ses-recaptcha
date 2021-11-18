'use strict'
const aws = require('aws-sdk')
const axios = require('axios')
const ses = new aws.SES({ region: 'eu-central-1' })

exports.handler = async function (event, context) {
  // Event is a POST request with the following info: ]email, [message, [token.
  // console.log('Received event:', JSON.stringify(event, null, 2));

  let statusCode = '200'
  let body = 'OK'
  const headers = {
    'Content-Type': 'application/json'
  }

  if (event.body) {
    try {
      // (Normally a JSON string but the Lambda Test feature sends an object.)
      const data = typeof event.body !== 'object' ? JSON.parse(event.body) : event.body

      // ReCaptcha
      if (!data.token) throw new Error('No Token'); // This immediately sends an error.
      const recaptchaUrl =
        `https://www.google.com/recaptcha/api/siteverify
        ?secret=${process.env.RECAPTCHA_SECRET_KEY}
        &response=${data.token}`;

      const recaptcha = await axios.post(recaptchaUrl, {});

      if (recaptcha.data.success) {
        // Send Email
        // API ref https://docs.aws.amazon.com/ses/latest/APIReference/API_SendEmail.html#API_SendEmail_RequestParameters
        const recipientEmailAddress = process.env.RECIPIENT_EMAIL
        const sourceEmailAddress = process.env.SOURCE_EMAIL
        const message = data.message
          + '\n\n\n ---Event---\n'
          + JSON.stringify(event, null, 2)
        const email = data.email !== '' ? data.email : 'No Subject'
        const params = {
          Destination: {
            ToAddresses: [recipientEmailAddress],
          },
          Message: {
            Body: {
              Text: { Data: message },
            },
            Subject: { Data: email },
          },
          Source: sourceEmailAddress,
        }
        await ses.sendEmail(params).promise()
      } else {
        throw new Error('ReCaptcha Error');
      }

    } catch (e) {
      console.error('Error:', e)
      statusCode = '400' // This will send an error without a message.
      body = 'Error: ' + e
    } finally {
      body = JSON.stringify(body)
    }
  }

  return { statusCode, body, headers }
}
