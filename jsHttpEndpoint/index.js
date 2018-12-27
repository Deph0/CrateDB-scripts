const http = require('request-promise');

const sql = `select * from doc.mqtt_temperature`

var options = {
    method: 'POST',
    uri: 'http://localhost:4200/_sql',
    body: { 'stmt': sql },
    json: true // Automatically stringifies the body to JSON
};

http(options)
	.then(res => console.log(res) )
	.catch(err => console.log(err) )
