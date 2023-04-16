import { LineChart } from "react-native-chart-kit";
import { Dimensions, View } from "react-native";
import React, { useEffect, useState } from "react";

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

const emptyLineChart = () => {
    return (
        <LineChart
            data={{
                labels: ["0", "1"],
                datasets: [
                    {
                        data: [0, 3],
                    },
                ],
            }}
            width={Dimensions.get("window").width - 50} // from react-native
            height={120}
            yAxisSuffix="--"
            yAxisInterval={4} // optional, defaults to 1
            chartConfig={chartConfig}
            bezier
            style={{
                marginVertical: 8,
                borderRadius: 16,
            }}
        />
    );
};

const generateLineChart = (labels, data, kind) => {
    return labels.length === 0 || data.length === 0 ? (
        emptyLineChart()
    ) : (
        <LineChart
            data={{
                labels: labels,
                datasets: [
                    {
                        data: data,
                    },
                ],
            }}
            width={Dimensions.get("window").width - 50} // from react-native
            height={120}
            yAxisSuffix={kind}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartConfig}
            bezier
            style={{
                marginVertical: 13,
                borderRadius: 10,
            }}
        />
    );
};

export const Grapher = (props) => {
    const { timeseries, kind } = props;

    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);
    const [unit, setUnit] = useState("-");

    useEffect(() => {
        if (timeseries !== undefined && timeseries.length !== 0) {
			//  [{"1": "15:56:15"}, {"0": "15:56:18"}, {"1": "15:56:48"}, {"0": "15:56:51"}]

            const labels = timeseries.map((item) => {
				return Object.values(item)[0];
			});
			const data = timeseries.map((item) => {
				return Object.keys(item)[0];
			});

            setLabels(labels);
            setData(data);
            setUnit(kind === "humidity" ? "g.m-3" : "°C");
        } else {
            setLabels(["12:12"]);
            setData([1]);
        }
    }, [timeseries]);

    /// logging
    useEffect(() => {
        console.log("graph labels: ", labels);
        console.log("graph data: ", data);
    }, [labels, data]);

    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            {generateLineChart(labels, data, unit)}
        </View>
    );
};