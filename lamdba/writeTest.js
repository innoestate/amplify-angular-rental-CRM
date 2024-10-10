const fs = require('fs');

console.log('write test');
fs.writeFile("/tmp/test", "Hey there!", function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});
fs.readFile('test', function(err, data){
  if(err){
    return console.log(err);
  }
  console.log(data);
});
