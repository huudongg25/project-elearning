import React from "react";
import "./saleChart.css";
import { IoStatsChart } from "react-icons/io5";
import { FaBox } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
const SaleChart = () => {
  return (
    <div className="saleChart_container">
      <div className="saleChart_body">
        <h3>Info Summary</h3>
        <div className="saleChart_box">
          <div className="saleChart_box_detail_totalSales">
            <div className="saleChart_box_detail_icon_totalSales">
              <IoStatsChart className="saleChart_box_react_icon" />
            </div>
            <p className="saleChart_box_detail_number">0đ</p>
            <p className="saleChart_box_detail_name">Total Sales</p>
          </div>
          <div className="saleChart_box_detail_totalOrders">
            <div className="saleChart_box_detail_icon_totalOrders">
              <FaBox className="saleChart_box_react_icon" />
            </div>
            <p className="saleChart_box_detail_number">0</p>
            <p className="saleChart_box_detail_name">Total Orders</p>
          </div>
          <div className="saleChart_box_detail_totalUsers">
            <div className="saleChart_box_detail_icon_totalUsers">
              <FaUser className="saleChart_box_react_icon" />
            </div>
            <p className="saleChart_box_detail_number">0</p>
            <p className="saleChart_box_detail_name">Total Users</p>
          </div>
          <div className="saleChart_box_detail_totalProducts">
            <div className="saleChart_box_detail_icon_totalProducts">
              <FaBook className="saleChart_box_react_icon" />
            </div>
            <p className="saleChart_box_detail_number">0</p>
            <p className="saleChart_box_detail_name">Total Products</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleChart;
