import React, { ChangeEvent, useEffect, useState } from "react";
import type { TableColumnsType } from "antd";
import { Popconfirm, Table } from "antd";
import "./adminCourse.css";
import { IntfCourse } from "../../types/interface";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import formatPrice from "../../common/formatPrice.common";
import CourseService from "../../services/course.service";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import LessonService from "../../services/lesson.service";
import ModalAdd from "../modalAddCourse/modalAdd";
import ModalEdit from "../modalEditCourse/modalEdit";
import { update } from "../../store/reducers/update";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const AdminCourse: React.FC = () => {
  const courseService = new CourseService();
  const lessonService = new LessonService();
  const [courses, setCourse] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<IntfCourse>();
  const [FreeCourse, setFreeCourse] = useState<boolean>(false);
  const [expandedLessons, setExpandedLessons] = useState<any[]>([]); // Trạng thái mới
  const updateStatus = useSelector((state: any) => state.update);
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState<string>("");
  const getCourse = async () => {
    const result = await courseService.getAllCourses();
    setCourse(result);
  };
  const getLesson = async () => {
    const result = await lessonService.getAllLessons();
    setLessons(result);
  };
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const handleTableChange: any = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<IntfCourse>
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setCourse([]);
    }
  };
  const columns: TableColumnsType<IntfCourse> = [
    {
      key: "courseName",
      title: "Name",
      dataIndex: "courseName",
      render: (dataIndex, record: any) => <span>{dataIndex}</span>,
    },
    {
      key: "Category",
      title: "Category",
      dataIndex: "categoryId",
      render: (dataIndex, record: any) => <span>{dataIndex}</span>,
    },
    {
      key: "image",
      title: "Image",
      dataIndex: "image",
      render: (dataIndex, record: any) => (
        <img
          style={
            record.isDelete === 1
              ? {
                  height: "135px",
                  width: "135px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }
              : {
                  borderRadius: "10px",
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  opacity: 0.3,
                }
          }
          src={dataIndex}
          alt="ảnh chương trình học"
        />
      ),
      width: "10%",
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
      render: (dataIndex, record: any) => <span>{dataIndex}</span>,
    },
    {
      key: "completedContent",
      title: "Completed Content",
      dataIndex: "completedContent",
      render: (dataIndex, record: any) => <span>{dataIndex}</span>,
    },
    {
      key: "price",
      title: "Price",
      dataIndex: "price",
      render: (dataIndex, record: any) => (
        <span
          style={
            record.isDelete === 2
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
        >
          {formatPrice(dataIndex)}
        </span>
      ),
      width: "15%",
      sorter: (a: any, b: any) => Number(a.price) - Number(b.price),
    },
    {
      key: "key",
      title: "Action",
      dataIndex: "",
      render: (dataIndex: number, record: any) => (
        <div className="course_action_button">
          <Popconfirm
            title="Delete this Products"
            description="Are you sure to delete it?"
            onConfirm={() => handleDeleteConfirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <button>Delete</button>
          </Popconfirm>
          <button>Edit</button>
          <button>Add Lesson</button>
        </div>
      ),
    },
  ];
  const fetchData = async () => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: courses.length,
      },
    });
  };
  const offModalEdit = () => {
    setModalEdit(false);
  };
  const offModalAdd = () => {
    setModalAdd(false);
  };
  const handleGetDataEdit = (record: IntfCourse) => {
    setDataEdit(record);
  };
  const handleDeleteConfirm = (id: number) => {
    console.log("Confirmed to delete ID:", id);
    handleIsDelete(id);
  };
  const handleIsDelete = async (id: number) => {
    await courseService.deleteCourse(id);
  };
  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    if (newValue !== "") {
      const searchString = newValue.toLowerCase();
      const coursesAfterFilter = courses.filter((course) =>
        course.courseName.toLowerCase().includes(searchString)
      );
      setCourse(coursesAfterFilter);
    } else {
      getCourse();
    }
  };
  const handleShowCourse = () => {
    setFreeCourse(!FreeCourse);
  };

  useEffect(() => {
    fetchData();
    getCourse();
    getLesson();
  }, [JSON.stringify(tableParams), updateStatus]);
  const filterLessonsByCourseId = (courseId: string) => {
    return lessons.filter((lesson) => lesson.courseId === courseId);
  };
  const handleRowExpand = async (expanded: boolean, record: any) => {
    if (expanded) {
      const lessonsForExpandedCourse = filterLessonsByCourseId(record.id);
      setExpandedLessons(lessonsForExpandedCourse);
    } else {
      setExpandedLessons([]);
    }
  };
  const renderExpandedRow = (record: any) => {
    const lessonsForCurrentCourse = lessons.filter(
      (lesson) => lesson.courseId === Number(record.id)
    );
    console.log(lessonsForCurrentCourse);

    return (
      <div className="admin_course_lesson_detail_container">
        <Table
          columns={[
            { title: "Title", dataIndex: "title", key: "title" },
            {
              title: "Position",
              dataIndex: "position",
              key: "position",
            },
            {
              title: "Duration",
              dataIndex: "duration",
              key: "duration",
            },
            {
              title: "Video Url",
              dataIndex: "videoURL",
              key: "videoURL",
              render: (videoUrl: string) => <a href={videoUrl}>{videoUrl}</a>,
            },
            {
              key: "key",
              title: "Action",
              dataIndex: "",
              render: () => (
                <div className="admin_lesson_action_button">
                  <button>Delete</button>
                  <button onClick={() => setModalEdit(true)}>Edit</button>
                </div>
              ),
            },
          ]}
          dataSource={lessonsForCurrentCourse}
          // pagination={true}
        />
      </div>
    );
  };

  return (
    <>
      <div className="admin_course_page_container">
        <div className="admin_course_page_header">
          <h2>COURSES :</h2>
          <div className="search_course">
            <IoIosSearch className="search_icon" />
            <input
              onChange={handleChangeSearch}
              value={searchValue}
              autoFocus
              type="text"
              placeholder="Tìm kiếm ..."
              className="search_bar"
            />
          </div>
          <button onClick={handleShowCourse} className="admin_course_button">
            {FreeCourse ? "Show Pay Course" : "Show Free Course"}
          </button>
          <button
            className="admin_course_button"
            onClick={() => setModalAdd(true)}
          >
            Add Course
          </button>
        </div>
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: renderExpandedRow,
            onExpand: handleRowExpand,
            rowExpandable: (record) => record.courseName !== "Not Expandable",
          }}
          dataSource={courses.filter((item) =>
            FreeCourse ? item.price === 0 : item.price !== 0
          )}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
        />
      </div>
      {modalEdit ? (
        <ModalEdit dataEdit={dataEdit} offModalEdit={offModalEdit} />
      ) : null}
      {modalAdd ? <ModalAdd offModalAdd={offModalAdd} /> : null}
    </>
  );
};

export default AdminCourse;
