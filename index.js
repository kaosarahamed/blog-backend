const app = require("./app");
require("dotenv").config();
const port = process.env.PORT || 4001;

app.listen(port, () => {
    console.log(`app is running at http://localhost:${port}`)
});