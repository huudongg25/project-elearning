import React, {
  ChangeEvent,
  FocusEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import "./lesson.css";
import ReactPlayer from "react-player";
import { CourseService } from "../../../services/courses.service";
import { useDispatch } from "react-redux";
import { setLessons } from "../../../store/reducers/lessonsReducer";
import { useSelector } from "react-redux";
import {
  selectLessonId,
  setLessonId,
} from "../../../store/reducers/lessonIdReduce";
import { RegisteredCourseService } from "../../../services/registeredCourses.service";
import { LessonUserService } from "../../../services/lessonUsers.service";
import { CommentService } from "../../../services/comments.service";
import { useLocation } from "react-router-dom";
import formatDate from "../../../common/formatDate.common";
import { setDetailRegisteredCourse } from "../../../store/reducers/detailRegisteredCourse";
import Rates from "../../rate/rate";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ToastSuccess, ToastWarning } from "../../../common/toastify.common";
import { RateService } from "../../../services/rates.service";
import { setLessonState } from "../../../store/reducers/lessonState";

const Learning = () => {
  const [data, setData] = useState([]);
  const [isRate, setIsRate] = useState<boolean>(false);
  const [detailCourse, setDetailCourse] = useState<any>();
  const [detailRegisteredCourse, setDetailRegisteredCourses] = useState<any>();
  const dispatch = useDispatch();
  const location = useLocation();
  const endpoint = location.pathname.split("/");
  const courseId = endpoint[endpoint.length - 1];
  const courseService = new CourseService();
  const registeredCourseService = new RegisteredCourseService();
  const lessonUserService = new LessonUserService();
  const rateService = new RateService();
  // Get
  const getDetailCourse = async () => {
    const result = await courseService.getDetailCourse(Number(courseId));
    setDetailCourse(result);
  };
  const getDetailRegisteredCourseUser = async () => {
    const result = await registeredCourseService.getDetailRegisteredCourseUser(
      1,
      Number(courseId)
    );
    setDetailRegisteredCourses(result);
    dispatch(setDetailRegisteredCourse(result));
    if (result.completedLessons === result.totalLessons){
      const result = await rateService.getOneRate(1, Number(courseId));
      if (!result) {
        setIsRate(true);
      }
    }
  };
  useEffect(() => {
    getDetailCourse();
    getDetailRegisteredCourseUser();
  }, []);

  // Merge
  useMemo(() => {
    const mergeArray = detailCourse?.lessons?.reduce(
      (result: any, lesson: any) => {
        const stateLesson = detailRegisteredCourse?.LessonUsers?.find(
          (item: any) => item.lessonId === lesson.id
        );
        const merge = { ...lesson, ...stateLesson };
        return [...result, merge];
      },
      []
    );
    dispatch(setLessons(mergeArray));
    setData(mergeArray);
  }, [detailCourse?.lessons, detailRegisteredCourse?.LessonUsers]);
  const id = useSelector(selectLessonId);
  const lesson = detailCourse?.lessons.find((item: any) => item.id === id);

  // update
  const handlePlay = async () => {
    if (lesson) {
      await lessonUserService.createLessonUser(
        Number(lesson.id),
        Number(detailRegisteredCourse?.id)
      );
      getDetailRegisteredCourseUser();
    } else {
      await lessonUserService.createLessonUser(
        Number(detailCourse.lessons[0].id),
        Number(detailRegisteredCourse?.id)
      );
      getDetailRegisteredCourseUser();
    }
  };
  const handleEndVideo = async () => {
    if (id) {
      await lessonUserService.updateStateLessonUser(
        lesson.id,
        detailRegisteredCourse.id
      );
      const newId = id + 1;
      const newLesson = detailCourse?.lessons.find(
        (item: any) => item.id === newId
      );
      if (newLesson) {
        dispatch(setLessonId(newId));
        dispatch(setLessonState(newLesson));
      }
    } else {
      await lessonUserService.updateStateLessonUser(
        Number(detailCourse?.lessons[0].id),
        detailRegisteredCourse.id
      );
      const newId = Number(detailCourse?.lessons[0].id) + 1;
      const newLesson = detailCourse?.lessons.find(
        (item: any) => item.id === newId
      );
      dispatch(setLessonId(newId));
      dispatch(setLessonState(newLesson));
    }
    getDetailRegisteredCourseUser();
    if (
      detailRegisteredCourse.completedLessons <
      detailRegisteredCourse.totalLessons
    ) {
      const completedLessons = detailRegisteredCourse.completedLessons + 1
      await registeredCourseService.updateStateCourseUser(1, Number(courseId),completedLessons);
    }
    getDetailRegisteredCourseUser();
  };

  // Comment
  const commentService = new CommentService();
  const [countComments, setCountComments] = useState<number>(0);
  const [comments, setComments] = useState([]);
  const [isLoadComment, setIsLoadComment] = useState<boolean>(false);
  const [limit, setLimit] = useState(3);
  const getCountComments = async () => {
    const result = await commentService.getCountComment(Number(courseId));
    setCountComments(result);
  };
  const getComments = async () => {
    const result = await commentService.getComments(limit, Number(courseId));
    setComments(result);
  };
  useEffect(() => {
    getComments();
    getCountComments();
  }, []);
  const handleLoadComment = async () => {
    setLimit(limit + 3);
    setIsLoadComment(true);
    getComments();
    setIsLoadComment(false);
  };

  const handleFocusComment = (e: FocusEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;
    inputElement.style.borderBottom = "1px solid #000";
  };
  const handleBlurComment = (e: FocusEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;
    inputElement.style.borderBottom = "1px solid #ddd";
  };
  // Create comment
  const [createComment, setCreateComment] = useState<string>("");
  const changeComment = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateComment(e.target.value);
  };
  const handleCreateComment = async () => {
    if (createComment === "") {
    } else {
      await commentService.createComment(1, Number(courseId), createComment);
      setCreateComment("");
      // ToastWarning("Comment Success!");
      alert("Comment Success!");
      getComments();
      getCountComments();
    }
  };
  const offIsRate = () => {
    setIsRate(false);
  };
  return (
    <section id="learning">
      <ToastContainer />
      <div className="learning_video">
        <ReactPlayer
          url={id ? lesson.videoURL : detailCourse?.lessons[0].videoURL}
          width="100%"
          height={650}
          controls
          onEnded={handleEndVideo}
          onStart={handlePlay}
          playing={true}
        />
        <div className="learning_video_info">
          <h2>{id ? lesson.title : detailCourse?.lessons[0].title}</h2>
          <p>
            Cập nhật:{" "}
            {id
              ? formatDate(String(lesson.updatedAt))
              : formatDate(String(detailCourse?.lessons[0]?.updatedAt))}
          </p>
        </div>
      </div>
      <div className="learning_comments">
        <h3>{countComments} binh luan</h3>
        <div className="learning_comments_enters">
          <img src={detailRegisteredCourse?.user?.avatar} alt="" />
          <input
            value={createComment}
            onChange={changeComment}
            onBlur={handleBlurComment}
            onFocus={handleFocusComment}
            placeholder="Viet binh luan o day..."
            type="text"
          />
          <button
            onClick={handleCreateComment}
            className="learning_comments_btn"
          >
            Bình luận
          </button>
        </div>
        <ul className="learning_comments_contents">
          {comments.length > 0 &&
            comments.map((comment: any) => {
              return (
                <li>
                  <img src={comment.user?.avatar} alt="" />
                  <div className="learning_comments_contents_info">
                    <p>{comment.user?.lastName}</p>
                    <p>{comment.content}</p>
                    <span>{formatDate(comment.createdAt)}</span>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      {countComments === 0 || countComments === comments.length ? null : (
        <div className="learning_more">
          {isLoadComment ? (
            <img
              src="../../../../wired-gradient-213-arrow-2-rounded.apng"
              alt=""
            />
          ) : (
            <p onClick={handleLoadComment} className="learning_more_btn">
              Xem Thêm
            </p>
          )}
        </div>
      )}
      {isRate ? (
        <Rates offIsRate={offIsRate} course={detailRegisteredCourse} />
      ) : null}
    </section>
  );
};

export default Learning;
