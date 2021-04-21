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
  const [optionData2, setOptionData2] = useState<any>([]);
  useEffect(() => {
    async function getMongoDBdata() {
      const res = await fetch("http://localhost:8080/mongoDBsicBoData", {
        method: "GET",
      });
      if (res.status == 200) {
        let result = await res.json();
        let testingOptionData: any[] = result.optionDataForChart
        let colors: any[] = ["#F8FF00", "#00F8FF", "#FF00F8"]
        console.log("testing result in screen 3", result);
        result.d1DataForChart.unshift(["Top Three Number", "Occurence"]);
        result.d2DataForChart.unshift(["Top Three Number", "Occurence"]);
        result.d3DataForChart.unshift(["Top Three Number", "Occurence"]);
        result.sumDataForChart.unshift(["Top Three Number", "Occurence"]);
        // result.optionDataForChart.unshift(["Top Three Number", "Occurence"]);
        // eslint-disable-next-line array-callback-return
        testingOptionData.map((e:any, i:any) => {
          e.push(colors[i])
          e.push(null)
        })
        console.log('testing optionData, ', testingOptionData)
        testingOptionData.unshift(
          [
            'Option',
            'Occurence',
            { role: 'style' },
            {
              sourceColumn: 0,
              role: 'annotation',
              type: 'string',
              calc: 'stringify',
            },
          ],
        )
        setDataLength(result.dataLength);
        setD1Data(result.d1DataForChart);
        setD2Data(result.d2DataForChart);
        setD3Data(result.d3DataForChart);
        setSumData(result.sumDataForChart);
        setOptionData(result.optionDataForChart);
        setOptionData2(testingOptionData);
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
        <div className="barChartSpacing">
          <Chart
            width={"500px"}
            height={"300px"}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={optionData2}
            options={{
              title: "Top Three Winning Options (Occurence)",
              width: 800,
              height: 290,
              bar: { groupWidth: "95%" },
              legend: { position: "none" },
              hAxis: {
                title: 'Occurence',
                minValue: 0,
              },
            }}
            // For tests
            rootProps={{ "data-testid": "6" }}
          />
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
              title: "Top Three Winning Options (Proportion)",
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
