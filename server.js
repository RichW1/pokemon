const express = require('express');
const port = process.env.PORT || 8087;

const app = express();




app.get('/', (req, res) => {
    res.send("The server is running.");
});








app.listen(port, (err) => {
    if (err)
    {
        console.log("Error starting the server: ", err);
    }
    console.log(`Server is running at port ${port}`);
});

