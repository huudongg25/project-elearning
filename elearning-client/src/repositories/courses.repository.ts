import Api from "../apis/api";

export class courseRepository {
    private _api: Api
    constructor() {
        this._api = new Api();
    }

    async getDetailCourse(courseId:number){
        return this._api.GetById('/courses/detail',courseId)
    }
}