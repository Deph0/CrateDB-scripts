var mqtt = require('mqtt')
var os = require('os')
var osUtils = require('os-utils');

const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
const host = 'mqtt://127.0.0.1:1883'

const mqttOptions = {
  keepalive: 60,
//  protocolId: 'MQTT',
//  protocolVersion: 4,
//  reconnectPeriod: 1000,
//  connectTimeout: 30 * 1000,
//  clean: true,
  clientId: clientId
}

var client  = mqtt.connect(host, mqttOptions)


client.on('connect', function () {
	console.log('client connected')
	// client.subscribe('temperature/node', { qos: 1 }) // -- Data ingest only, MQTT -> SQLDB
	setInterval( () => {
		console.log('second passed')
		const payload = {
				"cpu_percent": Math.random(),
				"virtual_memory_percent": os.freemem() / os.totalmem()//osUtils.freememPercentage()
		}
		client.publish('temperature/node', JSON.stringify(payload), { qos: 1 })
		//client.publish('node', '{"cpu_percent": "1", "virtual_memory_percent": "2"}', { qos: 1 })
	}, 1000);
})

client.on('message', function (topic, message, packet) {
  console.log('Received Message:= ' + message.toString() + '\nOn topic:= ' + topic)
})

client.on('error', function (a) {
  console.log('error!' + a)
})

client.on('offline', function (a) {
  console.log('lost connection!' + a)
})

client.on('close', function (a) {
  console.log('connection closed!' + a)
})





