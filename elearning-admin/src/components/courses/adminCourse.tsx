import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import "./adminCourse.css";

interface DataType {
  key: React.Key;
  name: string;
  lesson: number;
  note: string;
  description: string;
}

const columns: TableColumnsType<DataType> = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Lesson", dataIndex: "lesson", key: "lesson" },
  { title: "Note", dataIndex: "note", key: "note" },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    render: () => <a>Delete</a>,
  },
];

const data: DataType[] = [
  {
    key: 1,
    name: "Bài 1",
    lesson: 32,
    note: "Cần cập nhật",
    description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  },
  {
    key: 2,
    name: "Bài 2",
    lesson: 42,
    note: "Thêm bài mới",
    description:
      "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
  },
  {
    key: 3,
    name: "Bài 3",
    lesson: 29,
    note: "Chỉnh sửa lại",
    description: "This not expandable",
  },
  {
    key: 4,
    name: "Bài 4",
    lesson: 32,
    note: "Thêm bài tập",
    description:
      "My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.",
  },
];

const AdminCourse: React.FC = () => (
  <>
    <h2>COURSES</h2>
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <p style={{ margin: 0 }}>{record.description}</p>
        ),
        rowExpandable: (record) => record.name !== "Not Expandable",
      }}
      dataSource={data}
    />
  </>
);

export default AdminCourse;
