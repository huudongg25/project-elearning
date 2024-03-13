import { Admin } from "./admins.entity"
import { CommentCourse } from "./commentCourse.entity"
import { Course } from "./courses.entity"
import { Lesson } from "./lessons.entity"
import { RatingCourse } from "./ratingCourse.entity"
import { RegisteredCourse } from "./registeredCourse.entity"
import { User } from "./users.entity"

export const createEntity = () => {
    Admin.sync().then(() => console.log("Created Admin"))
    User.sync().then(() => console.log("Created User"))
    Course.sync().then(() => console.log("Created Course"))
    Lesson.sync().then(() => console.log("Created Lesson"))
    RatingCourse.sync().then(() => console.log("Created Rating Course"))
    CommentCourse.sync().then(() => console.log("Created Comment Course"))
    RegisteredCourse.sync().then(() => console.log("Created Registered Course"))
}