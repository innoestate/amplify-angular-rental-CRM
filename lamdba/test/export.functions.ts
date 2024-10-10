export const testAsync =  new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('resolved');
  }, 1000);
});
