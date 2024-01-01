const app=require('./app');
const connectDatabase = require('./config/db');
const { serverPort } = require('./secret');


const Port= 3002;
app.listen(Port, async() => {
  console.log(`Example app listening on port ${Port}`);
  await connectDatabase();

})