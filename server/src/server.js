const app=require('./app');
const connectDatabase = require('./config/db');
const logger = require('./controllers/logger/logerController');
const {serverPort } = require('./secret');


const Port= 3002;
app.listen(Port, async() => {
  logger.log("info",`Example app listening on port ${Port}`);
  await connectDatabase();
})

