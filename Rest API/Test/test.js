const fetch = require('node-fetch')
const from1='dean'
const to1 = 'dean'
const url = " http://127.0.0.1:5000/copy"

fetch(url, {  
    method: 'POST',  
    headers: {  
      'auth': '1234'  
    },  
     body: JSON.stringify({
    from: from1,
    to: to1,
  })
})
.then(function (data) {  
  console.log('Request on: ', url)
  console.log('Request success: ', data);  
})  
.catch(function (error) { 
  console.log('Request on: ', url) 
  console.log('Request failure: ', error);  
});
await new Promise(resolve => setTimeout(resolve, 5000));



const url = " http://127.0.0.1:5000/status"

fetch(url, {  
    method: 'POST',  
    headers: {  
      'auth': '1234'  
    },  
     body: JSON.stringify({
    id: '1'
  })
})
.then(function (data) {  
  console.log('Request on: ', url)
  console.log('Request success: ', data);  
})  
.catch(function (error) { 
  console.log('Request on: ', url) 
  console.log('Request failure: ', error);  
});


