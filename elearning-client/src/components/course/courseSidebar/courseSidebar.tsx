import React, { useState } from "react";
import "./courseSidebar.css";
import { ImFilm } from "react-icons/im";
import { useSelector } from "react-redux";
import { selectLessons } from "../../../store/reducers/lessonsReducer";
import { useDispatch } from "react-redux";
import { setLessonId } from "../../../store/reducers/lessonIdReduce";
import { formatDuration } from "../../../common/formatDuration.common";
const CourseSidebar = (): JSX.Element => {
  const [position, setPosition] = useState<boolean>(true);
  const [animationPlay, setAnimationPlay] = useState<number>(0);
  const dispatch = useDispatch();
  const lessons = useSelector(selectLessons);
  const handlePlay = (id: number) => {
    dispatch(setLessonId(id));
    setAnimationPlay(id);
    setPosition(false);
  };
  return (
    <section className="sidebar_course">
      <h1>Nội Dung Bài Học</h1>
      <ul>
        {lessons?.length > 0 &&
          lessons
            .slice()
            .sort((a: any, b: any) => a.position - b.position)
            .map((lesson: any) => {
              return (
                <li
                  onClick={() => handlePlay(lesson.id)}
                  key={lesson.id}
                  style={
                    (lesson.isFinished && lesson.isFinished === 1) ||
                    animationPlay === lesson.id ||
                    (lesson.position === 1 && position)
                      ? { backgroundColor: "#fff" }
                      : { backgroundColor: "#f0f0f0" }
                  }
                >
                  <div className="sidebar_course_item">
                    <p>
                      <span>{lesson.position}. </span> {lesson.title}
                    </p>
                    <p className="sidebar_course_item_duration">
                      {animationPlay === lesson.id ||
                      (lesson.position === 1 && position) ? (
                        <img
                          src="../../../../wired-gradient-62-film.apng"
                          alt=""
                        />
                      ) : (
                        <ImFilm
                          style={{ width: 21, height: 21, paddingLeft: 2 }}
                        />
                      )}

                      {formatDuration(lesson.duration)}
                    </p>
                  </div>
                  {lesson.isFinished && lesson.isFinished === 1 ? (
                    <img
                      src="../../../../wired-gradient-37-approve-checked-simple.apng"
                      alt=""
                    />
                  ) : (
                    <img
                      src="../../../../wired-gradient-742-code.apng"
                      alt=""
                    />
                  )}
                </li>
              );
            })}
      </ul>
    </section>
  );
};

export default CourseSidebar;
