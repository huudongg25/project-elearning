export interface IRegister {
    firstName: string
    lastName: string
    email: string
    password: string
}
export interface ICourse {
    categoryId:number
    level:number
    courseName:string
    description:string
    completedContent:string
    image:string
    price:number
}

export interface ILesson {
    courseId:number
    title:string
    position:number
    duration:number
    videoURL:string
}