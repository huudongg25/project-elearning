import { LessonRepository } from "../repositories/lessons.repository";
import { ILesson } from "../types";

export class LessonService {
    private _lessonRepository: LessonRepository;
    constructor(){
        this._lessonRepository = new LessonRepository();
    } 

    async createLesson(formLesson: ILesson): Promise<void> {
        await this._lessonRepository.createLesson(formLesson);
    }

    async deleteLesson(id: number): Promise<void> {
        await this._lessonRepository.deleteLesson(id);
    }

    async updateLesson(id: number, formLesson: any): Promise<void> {
        await this._lessonRepository.updateLesson(id, formLesson);
    }
}