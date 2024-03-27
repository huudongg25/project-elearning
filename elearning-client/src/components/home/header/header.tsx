import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import "./header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IntfCourse } from "../../../types/entities.type";
import UserService from "../../../services/user.service";
import { RiLogoutBoxRLine } from "react-icons/ri";
import CoursesService from "../../../services/course.service";
const Header = () => {
  const [char, setChar] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const idUser = localStorage.getItem("idUser") as string;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userService = new UserService();
  const coursesService = new CoursesService();
  const status = useSelector((state: any) => state.update);
  const [search, setSearch] = useState<string>("");
  const token = localStorage.getItem("token");
  const [coursesData, setCoursesData] = useState<IntfCourse[]>([]);
  const [sup, setSup] = useState<boolean>(false);
  const userString = localStorage.getItem("user") as string;
  const location = useLocation();
  const user = JSON.parse(userString);
  const [info, setUserInfo] = useState<any>();
  let goToDetail = useNavigate();
  const toDetails = (id: number | undefined): void => {
    goToDetail("/courses/learning/" + id);
    setSearch("");
  };
  const autoLogin = () => {
    if (!token && location.pathname === "/") {
    }
  };
  useEffect(() => {
    const getUser = async () => {
      if (idUser) {
        const data: any = await userService.getUserInfo(Number(idUser));
        let firstName: any = data.data.firstName;
        let character: string = firstName.charAt(0);
        setChar(character);
      }
    };
    getUser();
  }, [status, idUser]);
  const handleLogout = async () => {
    await userService.logout();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setSup(!sup);
    navigate("/", { state: "logout" });
  };
  // Lấy thông tin render
  const updateProfiles = useSelector((state: any) => state.updateProfile);
  useEffect(() => {
    const getUserInfo = async () => {
      const data = await userService.getUserInfo(user?.id);
      // console.log(data);
      setUserInfo(data);
    };
    if (token) {
      getUserInfo();
    }
    // return () => {
    //   setUserInfo(undefined);
    // }
  }, [updateProfiles]);
  // const handleOk = () => {
  //   dispatch(logout());
  //   navigate("/", { state: "logout" });
  // };

  const handleSearch = async (e: any) => {
    if (e.target.value !== "") {
      setSearch(e.target.value);
    } else {
      setSearch("");
    }
  };
  useEffect(() => {
    const getCoursesSearch = async () => {
      const coursesSearch = await coursesService.onSearch(search);
      setCoursesData(coursesSearch);
    };
    getCoursesSearch();
  }, [search]);
  return (
    <header className="header">
      <section className="header_container">
        <div className="header_logo">
          <Link to={"/"}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-shop-gundam.appspot.com/o/newProject%2Fz5273279306118_0eb35430aec0b692f52db2650bd90933.jpg?alt=media&token=ce4fb59b-2b53-4cf9-bc37-2787c86a2eab"
              alt="phoenix logo"
            />
          </Link>
          <h4>Học lập trình để đi làm</h4>
        </div>
        <div className="header_search_container">
          <div className="header_search">
            <IoIosSearch className="header_search_icon" />
            <input
              type="text"
              placeholder="Tìm kiếm bài học..."
              className="header_search_bar"
              id="search_feature"
              onChange={handleSearch}
              value={search}
            />
          </div>
          {search.length > 0 ? (
            <div className="search_list_detail">
              <ul id="searchList">
                {coursesData.length > 0 ? (
                  coursesData.map((item: any) => (
                    <li
                      className="course_search_name"
                      onClick={() => toDetails(item.id)}
                    >
                      {item.courseName}
                    </li>
                  ))
                ) : (
                  <li className="product_search_none">
                    Bài học này không tồn tại, xin hãy thử lại !
                  </li>
                )}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>

        {!idUser ? (
          <div className="header_button">
            {/* <button className="header_button_login">Đăng nhập</button> */}
            <Link to={"/login"}>
              <button className="header_button_register">Đăng ký</button>
            </Link>
          </div>
        ) : (
          <div className="header_user_services">
            <div className="header_border" />
            <div className="header_user toolTip" id="user_avatar">
              <Link to={"/profile"} className="user_avatar_box">
                {char}
              </Link>
            </div>
            <div className="header_user toolTip" id="logout_btn">
              <RiLogoutBoxRLine />
              <span className="toolTipText" style={{ marginTop: 17 }}>
                Logout
              </span>
            </div>
          </div>
        )}
      </section>
    </header>
  );
};

export default Header;
