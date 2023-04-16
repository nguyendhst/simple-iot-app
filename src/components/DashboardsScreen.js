import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import SwitchSelector from "react-native-switch-selector";

import { DashboardContext } from "../../App";

const options = [
    { label: "off", value: "Off" },
    { label: "on", value: "On" },
];

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
};

const toFloat = (str) => {
    return parseFloat(str);
};

const DashboardsScreen = ({ navigation }) => {
    const { data } = React.useContext(DashboardContext);

    const [temp, setTemp] = React.useState([]);
    const [hum, setHum] = React.useState([]);

    const updateData = () => {
        const newDataPoint = Math.floor(Math.random() * 20);
        // only get hours:minutes:seconds
        const newTime = new Date().toLocaleTimeString().split(" ")[0];
        const newData = { [toFloat(newDataPoint)]: newTime };

        setTemp((temp) => temp.concat(newData));
        setHum((hum) => hum.concat(newData));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            updateData();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (temp.length > 3) {
            temp.shift();
        }
        if (hum.length > 3) {
            hum.shift();
        }
    }, [temp, hum]);

    useEffect(() => {
        if (data) {
            // check if string contains 'sensor1'
            if (data.includes("button1")) {
                console.log({ [data.split(" ")[0]]: data.split(" ")[2] });
                // append value to temp array

                // {value:time}
                const val = data.split(" ")[0];
                const time = data.split(" ")[2];
                const datapoint = { [val]: time };
                setTemp([...temp, datapoint]);
            } else if (data.includes("sensor3")) {
                console.log({ [data.split(" ")[0]]: data.split(" ")[2] });
                // append value to hum array

                const val = data.split(" ")[0];
                const time = data.split(" ")[2];
                const datapoint = { [val]: time };
                setHum([...hum, datapoint]);
            }
        }
        console.log("data", data);
    }, [data]);

    useEffect(() => {
        console.log(
            "temp",
            temp.map((item) => Object.values(item)[0]),
            temp.map((item) => toFloat(Object.keys(item)[0]))
        );
        console.log("hum", hum);
    }, [temp, hum]);

    return (
        <View style={styles.container}>
            {temp.length === 0 ? (
                <Text>no data</Text>
            ) : (
                <>
                    <Text
                        style={{
                            fontSize: 30,
                            marginBottom: 10,
                        }}
                    >
                        Temperature
                    </Text>
                    <LineChart
                        data={{
                            labels: temp.map((item) => Object.values(item)[0]),
                            datasets: [
                                {
                                    data: temp.map((item) =>
                                        toFloat(Object.keys(item)[0])
                                    ),
                                },
                            ],
                        }}
                        width={Dimensions.get("window").width - 50} // from react-native
                        height={120}
                        yAxisSuffix={"°C"}
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={chartConfig}
                        bezier
                        style={{
                            marginVertical: 13,
                            borderRadius: 10,
                        }}
                    />
                </>
            )}
            {hum.length === 0 ? (
                <Text>no data</Text>
            ) : (
                <>
                    <Text
                        style={{
                            fontSize: 30,
                            marginBottom: 10,
                        }}
                    >
                        Humidity
                    </Text>
                    <LineChart
                        data={{
                            labels: hum.map((item) => Object.values(item)[0]),
                            datasets: [
                                {
                                    data: hum.map((item) =>
                                        toFloat(Object.keys(item)[0])
                                    ),
                                },
                            ],
                        }}
                        width={Dimensions.get("window").width - 50} // from react-native
                        height={120}
                        yAxisSuffix={"%"}
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={chartConfig}
                        bezier
                        style={{
                            marginVertical: 13,
                            borderRadius: 10,
                        }}
                    />
                </>
            )}
            <View
                style={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
					marginLeft: 35,
					marginRight: 35,
                }}
            >
                <Text style={{ fontSize: 30 }}>Fan</Text>
                <SwitchSelector
                    options={options}
                    initial={0}
                    onPress={(value) =>
                        console.log(`Call onPress with value: ${value}`)
                    }
                    fontSize={15}
                    buttonColor={"#1E2923"}
                />
                <Text style={{ fontSize: 30 }}>Light</Text>
                <SwitchSelector
                    options={options}
                    initial={0}
                    onPress={(value) =>
                        console.log(`Call onPress with value: ${value}`)
                    }
                    fontSize={15}
                    buttonColor={"#1E2923"}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 30,
    },
});

export default DashboardsScreen;
