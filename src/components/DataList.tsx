import { useState } from "react";
import Container from "react-bootstrap/Container";

import Table from "react-bootstrap/Table";

import useStockData from "../hooks/useStockData";

interface Props {
  symbol: string;
  startDate: string;
  endDate: string;
  heading: string;
}
function DataList({ symbol, startDate, endDate, heading }: Props) {
  const stockData = useStockData({ symbol, startDate, endDate });
  console.log(stockData);
  return (
    <>
      <h1>{heading}</h1>
      {!stockData && <p>No items found</p>}
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>high</th>
            <th>low</th>
            <th>current</th>
            <th>datetime</th>
          </tr>
        </thead>
        <tbody>
          {stockData?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.high}</td>
              <td>{item.low}</td>
              <td>{item.current}</td>
              <td>{item.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default DataList;
