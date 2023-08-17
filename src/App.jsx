import React, { useEffect, useState } from "react";
import { getAll } from "./services/CovidServices";
import LineChart from "./components/LineChart";
import Table from "./components/Table";
import { months } from "./utils/Data";
import Filter from "./components/Filter";
import Container from "./components/Container";

import "./App.scss";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState([]);

  // Options
  const types = ["cases", "deaths", "recovered"];
  const [years, setYears] = useState([]);

  // Dropdown
  const [type, setType] = useState("cases");
  const [year, setYear] = useState("all");
  const [month, setMonth] = useState("all");

  const getAllData = async () => {
    try {
      const response = await getAll();
      setData(response.data);
    } catch (e) {
      setError(e);
      setIsLoaded(true);
    }
  };

  const getYears = (items) => {
    let allYears = [];

    items.forEach((obj) => {
      const y = obj.date.split("/")[2];
      if (!allYears.includes("20" + y)) {
        allYears.push("20" + y);
      }
    });
    setYears(allYears);
  };

  const filterData = (t, y, m) => {
    const array = Object.entries(data[t.toLowerCase()]).map(([key, value]) => ({
      date: key,
      people: value,
    }));

    getYears(array);

    let filtered = array;

    if (m !== "all") {
      filtered = filtered.filter((i) => i.date.split("/")[0] === m);
    }

    if (y !== "all") {
      filtered = filtered.filter((i) => i.date.split("/")[2] === y.slice(-2));
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    if (data) {
      filterData(type, year, month);
    }
  }, [data, type, year, month]);

  useEffect(() => {
    if (filteredData.length > 0) {
      setIsLoaded(true);
    }
  }, [filteredData]);

  if (!isLoaded) {
    return (
      <div className="min-w-screen my-font flex min-h-screen items-center justify-center text-[4rem] font-medium">
        Loading
      </div>
    );
  } else if (error) {
    return (
      <div className="min-w-screen my-font flex min-h-screen items-center justify-center text-[4rem] font-medium">
        {error.message}
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-[#F5F5F5]">
        <Container>
          <div className="flex flex-col items-center">
            <div>
              <div className="my-font text-[1.75rem] font-bold leading-[1]  2xs:text-[1.82rem] xs:text-[2.17rem] sm:text-[3.5rem] md:text-[4rem]">
                COVID-19 HISTORY
              </div>
              <div className="my-font text-end">By Disease.sh</div>
            </div>
          </div>
          <div className="items-cente grid grid-cols-6 gap-4 sm:gap-5 md:gap-6 xl:gap-10 3xl:gap-16">
            <div className="col-span-6 mt-8 xl:order-1 xl:col-span-4 xl:mt-0 2xl:col-span-3">
              <LineChart
                data={filteredData}
                years={years}
                year={year}
                month={month}
                type={type}
              />
            </div>
            <div className="xl:order-0 col-span-6 mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 md:gap-8 xl:mt-10">
              <Filter
                data={type}
                setData={setType}
                options={types}
                type="type"
              />
              <Filter
                data={month}
                setData={setMonth}
                options={months}
                type="month"
              />
              <Filter
                data={year}
                setData={setYear}
                options={years}
                type="year"
              />
            </div>
            <div className="col-span-6 mt-1 sm:mt-0 xl:order-2 xl:col-span-2 2xl:col-span-3">
              <Table data={filteredData} />
            </div>
          </div>
        </Container>
      </div>
    );
  }
};

export default App;
