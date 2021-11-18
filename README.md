# AWS Lambda for Simple Contact Form [Node.js]

When a user fills a contact form on your website (using ReCaptcha), and sends it, this function will
check if the ReCaptcha token in the request is valid, and if so, will send you a personal email.

Your front end should send a POST request to your function's endpoint with a body payload in the form of

```js
{
  email: client_email_field,
  subject: subject_field,
  message: message_field,
  token: frontend_recaptcha_token
}
```

# Documentation

[AWS Lambda and NodeJS](https://docs.aws.amazon.com/lambda/latest/dg/lambda-nodejs.html)

# Optional Configuration
If you're new to AWS Lambda you should start with
[the setup guide](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-package.html)
to install your AWS CLI, create an IAM user with the right permissions,
and run `aws configure`.
Also create your Lambda function (referred to as `my-function` below).

# Updating

1. **Zip files:** once unzipped you should immediately be in root.
2. **Run in the current directory:**
`aws lambda update-function-code --function-name my-function --zip-file fileb://your-zip-file.zip`

