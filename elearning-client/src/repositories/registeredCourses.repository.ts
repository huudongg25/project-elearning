import Api from "../apis/api";

export class RegisteredCourseRepository {
  private _api: Api;
  constructor() {
    this._api = new Api();
  }

  async getDetailRegisteredCourseUser(form: any) {
    return await this._api.Get("/register-courses/get-detail-registered", form);
  }

  async updateStateCourseUser(form: any) {
    await this._api.Patch('/register-courses/finished-lessons',form)
  }
}
