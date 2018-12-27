var crate = require('node-crate');

crate.connect('localhost', 4200);

// https://crate.io/docs/crate/reference/en/latest/general/dql/selects.html#object-arrays
const sql = `SELECT	
	  client_id
	  , avg(ts)
	  , avg(payload['cpu_percent']::float)
	  , sum(payload['virtual_memory_percent']::float)
	FROM doc.mqtt_temperature
	-- WHERE client_id = ?
	GROUP BY client_id`

const params = ['mqttjs_a95de79b']

crate.execute(sql, params)
	.then(res => console.log(res.json) )
	.catch(err => console.log(err) )

//    console.log('Success', res.json, res.duration, res.rowcount, res.cols, res.rows)
