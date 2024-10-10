const axios = require('axios');

exports.handler = async (event) => {
  const { raw } = JSON.parse(event.body);

  try {
    const response = await axios.post(
      'https://www.googleapis.com/gmail/v1/users/me/messages/send',
      { raw },
      {
        headers: {
          Authorization: `Bearer YOUR_GOOGLE_OAUTH_TOKEN`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully', response: response.data }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error sending email' }),
    };
  }
};
