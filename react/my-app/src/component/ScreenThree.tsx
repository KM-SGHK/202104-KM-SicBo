import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import Container from "@material-ui/core/Container";

export function ScreenThree() {
  const [dataLength, setDataLength] = useState<any>([]);
  const [d1Data, setD1Data] = useState<any>([]);
  const [d2Data, setD2Data] = useState<any>([]);
  const [d3Data, setD3Data] = useState<any>([]);
  const [sumData, setSumData] = useState<any>([]);
  const [optionData, setOptionData] = useState<any>([]);
  useEffect(() => {
    async function getMongoDBdata() {
      const res = await fetch("http://localhost:8080/mongoDBsicBoData", {
        method: "GET",
      });
      if (res.status == 200) {
        let result = await res.json();
        console.log("testing result in screen 3", result);
        result.d1DataForChart.unshift(["Top Three Number", "Occurence"]);
        result.d2DataForChart.unshift(["Top Three Number", "Occurence"]);
        result.d3DataForChart.unshift(["Top Three Number", "Occurence"]);
        result.sumDataForChart.unshift(["Top Three Number", "Occurence"]);
        result.optionDataForChart.unshift(["Top Three Number", "Occurence"]);
        setDataLength(result.dataLength)
        setD1Data(result.d1DataForChart);
        setD2Data(result.d2DataForChart);
        setD3Data(result.d3DataForChart);
        setSumData(result.sumDataForChart);
        setOptionData(result.optionDataForChart);
      }
    }
    getMongoDBdata();
  }, []);

  console.log(d1Data);

  return (
    <div className="containerScreen3">
      <Container fixed>
        <div>
          <h1 className="header">Analytics From Past Gaming Results</h1>
          <p className="subtitle">
            {dataLength} Data Fetched From Database (MongoDB) are used for
            analytics
          </p>
        </div>

        <div className="chartSpacing">
          <Chart
            width={"700px"}
            height={"500px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={sumData}
            options={{
              legend: "none",
              pieSliceText: "label",
              title: "Top Three Sicbo Game Sum",
              pieStartAngle: 100,
            }}
            rootProps={{ "data-testid": "4" }}
          />
          <Chart
            width={"700px"}
            height={"500px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={optionData}
            options={{
              legend: "none",
              pieSliceText: "label",
              title: "Top Three Winning Options",
              pieStartAngle: 100,
            }}
            rootProps={{ "data-testid": "4" }}
          />
        </div>
        <div className="chartSpacing">
          <Chart
            width={"450px"}
            height={"400px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={d1Data}
            options={{
              legend: "none",
              pieSliceText: "label",
              title: "Top Three Number From Dice One",
              pieStartAngle: 100,
            }}
            rootProps={{ "data-testid": "4" }}
          />
          <Chart
            width={"450px"}
            height={"400px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={d2Data}
            options={{
              legend: "none",
              pieSliceText: "label",
              title: "Top Three Number From Dice Two",
              pieStartAngle: 100,
            }}
            rootProps={{ "data-testid": "4" }}
          />
          <Chart
            width={"450px"}
            height={"400px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={d3Data}
            options={{
              legend: "none",
              pieSliceText: "label",
              title: "Top Three Number From Dice Three",
              pieStartAngle: 100,
            }}
            rootProps={{ "data-testid": "4" }}
          />
        </div>
      </Container>
    </div>
  );
}

export default ScreenThree;
