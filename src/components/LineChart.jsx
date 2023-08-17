import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

const LineChart = (props) => {
  const { data, years, year, month, type } = props;

  const [chartData, setChartData] = useState();
  const [maxLength, setMaxLength] = useState();
  const [options, setOptions] = useState({
    chart: {
      type: "spline",
      spacingTop: 30,
      spacingBottom: 10,
      spacingLeft: 20,
      spacingRight: 30,
    },
    title: {
      text: "",
      align: "left",
    },
    yAxis: {
      gridLineWidth: 1,
      title: {
        text: "",
      },
    },
    xAxis: {},
    accessibility: { enabled: false },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    plotOptions: {
      series: {
        lineWidth: 4,
        marker: {
          enabled: false,
          lineWidth: 1,
        },
        label: {
          connectorAllowed: false,
        },
      },
    },
    series: [],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 1024,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    let dataArray = [];

    if (year === "all" && month !== "all") {
      years.forEach((item) => {
        const formattedData = data
          .filter((i) => i.date.split("/")[2] === item.slice(-2))
          .map((item) => {
            const date = moment(item.date, "MM/DD/YYYY").format("DD");
            return [parseInt(date), item.people];
          });
        dataArray.push(formattedData);
      });
    } else {
      const formattedData = data.map((item) => {
        const d = moment(item.date, "MM/DD/YYYY").format("D");
        const m = moment(item.date, "MM/DD/YYYY").format("M");
        const y = moment(item.date, "MM/DD/YYYY").format("YYYY");
        return [Date.UTC(y, m - 1, d), item.people];
      });

      dataArray.push(formattedData);
    }

    setChartData(dataArray);

    const arrayWithMaxElements = dataArray.reduce((maxArray, currentArray) => {
      if (currentArray.length > maxArray.length) {
        return currentArray;
      } else {
        return maxArray;
      }
    }, []);
    setMaxLength(arrayWithMaxElements.length);
  }, [data, years, year, month]);

  useEffect(() => {
    if (chartData) {
      const updatedChartOptions = {
        ...options,
        xAxis:
          chartData.length === 1
            ? {
                gridLineWidth: 1,
                type: "datetime",
              }
            : {
                gridLineWidth: 1,
                type: "linear",
                catagories: Array.from(
                  { length: maxLength },
                  (_, index) => 1 + index
                ),
              },
        series: chartData.map((item, index) => {
          const m = moment()
            .month(month - 1)
            .format("MMMM");
          return {
            name: `${type === "cases" ? "New Case" : type} ${
              year === "all" && month !== "all" ? `- ${m} ${years[index]}` : ""
            }`,
            data: item,
            marker: { symbol: "circle" },
          };
        }),
      };
      setOptions(updatedChartOptions);
    }
  }, [chartData]);

  if (chartData?.length > 0) {
    return (
      <div className="highcharts-frame overflow-hidden rounded-2xl !shadow-sm !drop-shadow-sm">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </div>
    );
  }
};

export default LineChart;
