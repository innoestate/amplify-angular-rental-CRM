import { testAsync } from './export.functions';
export const handler = async (event: any, context: any) => {

  console.log('testExport');
  const value = await testAsync;
  console.log('async', value);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello World!',
    }),
  };
}
handler(null, null);
