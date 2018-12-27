# CrateDB-scripts
CrateDB.io test scripts while researching IOT MQTT data ingestion 
These are notes and snippets only and not meant as a functional service/application.

# Installing CrateDB
Easiest way to install is using their install script:
`bash -c "$(curl -L install.crate.io)"`
as Found on the [Install Guide](https://crate.io/docs/crate/getting-started/en/latest/install-run/special/linux.html)
(I found Ubuntu 18.04 to work the best, debian 9 is not supported and i couldnt get it to install on debian 8)

Enable MQTT by editing the config file (/etc/crate/crate.yml) 
`ingestion.mqtt.enabled: true`
[More info](https://crate.io/a/getting-started-cratedb-mqtt-endpoint/) 

You can also read more about the python script with mqtt-CrateDB ingestion on this page and creation of table and ingestion rules needed for this to work.
Do note that the example table wouldnt work with group-queries such as avg,sum, etc. as object column type was set to ignore rather than dynamic [ref](https://crate.io/docs/crate/reference/en/latest/general/ddl/data-types.html#object)

[MQTT INGESTION SOURCE](https://crate.io/docs/crate/reference/en/latest/admin/ingestion/sources/mqtt.html#mqtt-data-structure)

# Usage
CrateDB provides a "admin" panel on localhost:4200, here you can explore tables, run queries and see load of the server.
[THE BASICS OF QUERYING](https://crate.io/docs/crate/getting-started/en/latest/first-use/query.html)

## CrateDB HTTP Endpoint API
CreateDB provides a HTTP Endpoint, by use of HTTP-POST Body-Requests. [ref](https://crate.io/docs/crate/reference/en/latest/interfaces/http.html)
Another example of this is found [here](https://crate.io/docs/crate/getting-started/en/latest/first-use/query.html#the-cratedb-http-endpoint)

## Scripts
I used the python script provided in the docus and created a nodejs equivilent version.
They will use the MQTT CrateDB Data Ingestion to do inserts based upon the Ingestion Rules.

There are other programming langauges provided by the community listed here: [Start Building](https://crate.io/docs/crate/getting-started/en/latest/start-building/index.html)
I used the example provided by `node-crate` to create a simple select query using the module.

# CrateDB Tables
I've mostly reused the examples from the docus, with exception on changing object to dynamic (default)
Ingestion rules are documented [here](https://crate.io/docs/crate/reference/en/latest/admin/ingestion/rules.html)

## MQTT topic 'events/system*'
( *=wildcard )
```sql
CREATE TABLE IF NOT EXISTS mqtt.system_information (
  client_id STRING,
  packet_id INTEGER,
  topic STRING,
  ts TIMESTAMP,
  payload OBJECT,
  PRIMARY KEY ("client_id", "packet_id")
);
CREATE INGEST RULE system_monitoring ON mqtt
  WHERE topic LIKE 'events/system%'
  INTO mqtt.system_information;
```

## MQTT topic 'temperature/*'
( *=wildcard )
```sql
CREATE TABLE mqtt_temperature (
  "client_id" STRING,
  "packet_id" INTEGER,
  "topic" STRING,
  "ts" TIMESTAMP,
  "payload" OBJECT(IGNORED),
  PRIMARY KEY ("client_id", "packet_id")
);
CREATE INGEST RULE temperature ON mqtt
  WHERE topic like 'temperature/%'
  INTO mqtt_temperature;
```

# Random ref urls
- [Crate IOT Data Platform for Discrete Manufacturing](https://crate.io/products/crate-iot-data-platform/)
- [IOT Sensor-data](https://crate.io/use-cases/iot-sensor-data/) (usecase)
- [Databases in Microservices Environment](https://crate.io/a/databases-in-microservice-environment/) (blogpost)
- [Inovate or Die: Microservices](https://www.sequoiacap.com/article/build-us-microservices/) (blogpost related to above url)
