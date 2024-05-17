import React from "react";
import {
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

function Home() {
  const data = [
    {
      name: "January",
      product1: 4000,
      product2: 2400,
    },
    {
      name: "February",
      product1: 3000,
      product2: 1398,
    },
    {
      name: "March",
      product1: 2000,
      product2: 9800,
    },
    {
      name: "April",
      product1: 2780,
      product2: 3908,
    },
    {
      name: "May",
      product1: 1890,
      product2: 4800,
    },
    {
      name: "June",
      product1: 2390,
      product2: 3800,
    },
    {
      name: "July",
      product1: 3490,
      product2: 4300,
    },
    {
      name: "August",
      product1: 3490,
      product2: 4300,
    },
    {
      name: "September",
      product1: 3490,
      product2: 4300,
    },
    {
      name: "October",
      product1: 3490,
      product2: 4300,
    },
    {
      name: "November",
      product1: 3490,
      product2: 4300,
    },
    {
      name: "December",
      product1: 3490,
      product2: 4300,
    },
  ];

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>SERVICES</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>2</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>33</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>ALERTS</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>10</h1>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="product1" fill="#8884d8" />
            <Bar dataKey="product2" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="product1"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="product1" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
