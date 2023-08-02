require("dotenv").config();
const app = require('./app');
const port = process.env.PORT;

app.listen(3000, () => {
    console.log(`API listening on port 3000`);
});