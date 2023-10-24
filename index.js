require('dotenv').config()
const app = require("./app/app");
console.log('---->', process.env.DB_NAME);
const port = process.env.APP_PORT || 3000

app.listen(port, () => {
    console.log(`>>> Server runnign on port ${port} <<<`);
})