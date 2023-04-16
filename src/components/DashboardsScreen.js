import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { DashboardContext } from "../../App";
import { Grapher } from "./Grapher";

const drawGraph = (data, type) => {

	return (
		<View style={styles.container}>
			<Grapher timeseries={data} kind={type} />
		</View>
	);
};


const DashboardsScreen = ({ navigation }) => {
    const { data } = React.useContext(DashboardContext);

    const [temp, setTemp] = React.useState([]);
	const [hum, setHum] = React.useState([]);

    useEffect(() => {
        if (data) {
            // check if string contains 'sensor1'
            if (data.includes("button1")) {
                console.log({ [data.split(" ")[0]]: data.split(" ")[2] });
                // append value to temp array
                // if temp length > 10, remove first element
                {
                    temp.length > 10 ? temp.shift() : null;
                }
                // {value:time}
                setTemp([
                    ...temp,
                    { [data.split(" ")[0]]: data.split(" ")[2] },
                ]);
            } else if (data.includes("sensor3")) {
				console.log({ [data.split(" ")[0]]: data.split(" ")[2] });
				// append value to hum array
				// if hum length > 10, remove first element
				{
					hum.length > 10 ? hum.shift() : null;
				}
				// {value:time}
				setHum([
					...hum,
					{ [data.split(" ")[0]]: data.split(" ")[2] },
				]);
			}
        }
        console.log("data", data);
    
    }, [data]);

	useEffect(() => {
		console.log("temp", temp);
		console.log("hum", hum);
	}, [temp, hum]);

    return (
        <View style={styles.container}>
            {/*<Grapher timeseries={temp} kind="temperature" />*/}
			{drawGraph(temp, "temperature")}
			{/*{drawGraph(hum, "humidity")}*/}
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
