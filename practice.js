const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('i was here')  
})

app.listen(port,() =>{
    console.log('its working')
})