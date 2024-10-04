import { createQuittance } from './pdf.utils';
interface Person { name: string, street: string, city: string };

export const handler = async (event, context) => {


  try {

    function parseUrlEncodedString(urlEncodedStr) {
      // Step 1: Create a new URLSearchParams object with the input string
      const params = new URLSearchParams(urlEncodedStr);

      // Step 2: Convert URLSearchParams into a plain object
      const result = {};

      // Iterate over the params and populate the object
      params.forEach((value, key) => {
        result[key] = value;
      });

      return result;
    }



    let body = event?.body ? event.body : event;
    console.log('body', body);
    let requestBody;
    if (event.isBase64Encoded) {
      let decodedBody = Buffer.from(body, 'base64').toString('utf-8');
      requestBody = parseUrlEncodedString(decodedBody);//= JSON.parse(decodedBody); // parse JSON body
    } else {
      requestBody = body;  // parse directly if not base64
    }
    body = requestBody;

    const owner: Person = { name: body.ownerName, street: body.ownerStreet, city: body.ownerCity };
    const lodger: Person = { name: body.lodgerName, street: body.lodgerStreet, city: body.lodgerCity };
    const address = body.address;
    const rent = parseInt(body.rent);
    const charges = parseInt(body.charges);
    const signature = body?.signature ?? '';
    const date = { start: body?.startDate, end: body?.endDate };

    const result = await createQuittance(owner, lodger, address, rent, charges, signature, date);
    const response = {
      statusCode: 200,
      isBase64Encoded: true,  // Tells API Gateway the response is base64 encoded
      headers: {
        'Content-Type': 'application/pdf',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Disposition': 'attachment; filename="receipt.pdf"',
      },
      body: result.toString('base64')
    };
    return response;
  } catch (e) {
    console.error('error creating quittance', e);
    const response = {
      statusCode: 500,
      body: 'error creating quittance'
    };
  }


};
