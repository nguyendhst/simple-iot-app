import { Paho } from "paho-mqtt";
import { AsyncStorage } from "react-native";

const port = 1883;
const securePort = 8883;
const host = "io.adafruit.com";
// const username = "Your Adafruit IO Username";
// const password = "Your Adafruit IO Key";
const client = new Paho.Client(host, port);

client.onConnectionLost = (responseObject) => {
    console.log("Connection lost:", responseObject.errorMessage);
};

client.onMessageArrived = (message) => {
    console.log("Message arrived:", message.payloadString);
};

client.connect({
    onSuccess: () => {
        console.log("Connected to the MQTT broker");
    },
    onFailure: (error) => {
        console.log("Failed to connect:", error.errorMessage);
    },
});

const connect = () => {};

class MQTTClient {}

export default MQTTClient;
