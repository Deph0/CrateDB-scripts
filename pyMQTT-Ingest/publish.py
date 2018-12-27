import time
import paho.mqtt.client as mqtt
import psutil

if __name__ == '__main__':
    mqttc = mqtt.Client()
    mqttc.max_inflight_messages_set(1000)
    mqttc.connect('127.0.0.1', port=1883, keepalive=60)

    while True:
        time.sleep(1)

        payload = '{{"cpu_percent": "{}", "virtual_memory_percent": "{}"}}' \
            .format(psutil.cpu_percent(), psutil.virtual_memory().percent)

       # result = mqttc.publish('events/system_load', qos=1, payload=payload)
        result = mqttc.publish('temperature/py', qos=1, payload=payload)
        print(result)
