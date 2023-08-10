const path = require('path');
const http = require('http');
const express = require('express');

const app = express();

//Set static folder
app.use(express.static(path.join(__dirname,'public')));

const PORT = 3000 || process.nextTick.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


