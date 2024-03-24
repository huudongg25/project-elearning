<<<<<<< Updated upstream:elearning-client/src/components/course/courseLesson/lesson.tsx
import React from "react";
import "./lesson.css";
const CourseLesson = () => {
  return (
    <div className="lesson_container">
      <iframe
        frameBorder="0"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        title="1. Giới Thiệu khóa học C++"
        width="100%"
        height="500px"
        src="https://www.youtube.com/embed/Da1tpV9TMU0?autoplay=1&amp;mute=0&amp;controls=1&amp;origin=https%3A%2F%2Ffullstack.edu.vn&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1&amp;widgetid=5"
        id="widget6"
      ></iframe>
      <div className="lesson_title">
        <h2>Giới thiệu khóa học</h2>
=======
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./learning.css";
import ReactPlayer from "react-player";
import { CourseService } from "../../../services/courses.service";
import { useDispatch } from "react-redux";
import { setLessons } from "../../../store/reducers/lessonsReducer";
import { useSelector } from "react-redux";
import { selectLessonId } from "../../../store/reducers/lessonIdReduce";
import { RegisteredCourseService } from "../../../services/registeredCourses.service";
import { LessonUserService } from "../../../services/lessonUsers.service";
import { setLessonState } from "../../../store/reducers/lessonState";
import { CommentService } from "../../../services/comments.service";
import { useLocation } from "react-router-dom";
import formatDate from "../../../common/formatDate.common";

const Learning = () => {
  const [data, setData] = useState([]);
  const [detailCourse, setDetailCourse] = useState<any>();
  const [detailRegisteredCourse, setDetailRegisteredCourse] = useState<any>();
  const dispatch = useDispatch();
  const location = useLocation();
  const endpoint = location.pathname.split("/");
  const courseId = endpoint[endpoint.length - 1];
  const courseService = new CourseService();
  const registeredCourseService = new RegisteredCourseService();
  const lessonUserService = new LessonUserService();

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
    setDetailRegisteredCourse(result);
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
    }
  };
  const handleEndVideo = async () => {
    await registeredCourseService.updateStateCourseUser(1, 1);
    await lessonUserService.updateStateLessonUser(
      lesson.id,
      detailRegisteredCourse.id
    );
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
  console.log(countComments, comments.length);

  return (
    <section id="learning">
      <div className="learning_video">
        <ReactPlayer
          url={id ? lesson.videoURL : detailCourse?.lessons[0].videoURL}
          width="100%"
          height={650}
          controls
          onEnded={handleEndVideo}
          onStart={handlePlay}
        />
        <div className="learning_video_info">
          <h2>{id ? lesson.title : detailCourse?.lessons[0].title}</h2>
          <p>{id ? formatDate(String(lesson.updatedAt)) : formatDate(String(detailCourse?.lessons[0]?.updatedAt))}</p>
        </div>
>>>>>>> Stashed changes:elearning-client/src/components/course/courseLearning/learning.tsx
      </div>
      <div className="learning_comments">
        <h3>{countComments} binh luan</h3>
        <div className="learning_comments_enters">
          <img src={detailRegisteredCourse?.user?.avatar} alt="" />
          <input placeholder="Viet binh luan o day..." type="text" />
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
    </section>
  );
};

export default CourseLesson;
