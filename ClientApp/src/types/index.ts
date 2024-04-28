export interface IUserInfo {
    id: string;
    lastName: string;
    firstName: string;
    middleName: string;
    email?: string;
    position: IPosition;
}

export interface IChangeUserRequest {
    firstName: string;
    lastName: string;
    middleName: string;
    email?: string;
}

export interface ICoursesResponse {
    courses: ICourseShortInfo[];
}

export interface ICourseShortInfo {
    id: string;
    title: string;
    previewImageUrl: string;
    unitsCount: number;
    position: IPosition;
    progress?: ICourseProgress;
}

export interface IGetCourseRequest {
    courseId: string;
    userId?: string;
}

export interface ICourseInfo extends ICourseShortInfo {
    units: IUnit[];
}

export interface IUnit {
    id: string;
    title: string;
    order: number;
    progress: IUserUnitProgress;
}

export interface IUserUnitProgress {
    status: UserUnitStatus;
}

export enum UserUnitStatus {
    InProgress = 'InProgress',
    Done = 'Done'
}

export interface ILecture {
    id: string;
    title: string;
    content: string;
}

export interface IQuiz {
    quizId: string;
    title: string;
    questions: IQuestion[];
}

export interface IQuestion {
    id: string;
    content: string;
    order: number;
    answerType: AnswerType;
    answers: IAnswer[];
}

export interface IQuestionWithAnswer extends IQuestion {
    answer: string[];
    isCorrectAnswer: boolean;
    incorrectAnswerIds: string[]
}

export interface IQuizAttempt {
    quizId: string;
    title: string;
    questionsWithAnswers: IQuestionWithAnswer[];
    isCorrect?: boolean;
}

export interface IAnswerAttempt {
    questionId: string;
    answer: string[];
}

export interface IAnswerAttemptWithResult extends IAnswerAttempt {
    isCorrect: boolean;
    incorrectAnswerIds: string[];
}

export interface ISubmitQuizRequest {
    quizId: string;
    answers: IAnswerAttempt[];
}

export interface ISubmitQuizResponse {
    quizId: string;
    answers: IAnswerAttemptWithResult[];
    isCorrect: boolean;
}

export enum AnswerType {
    SingleCorrect = 'SingleCorrect',
    ManyCorrect = 'ManyCorrect'
}

export interface IAnswer {
    id: string;
    content: string;
    order: number;
}

export interface IPosition {
    id: string;
    title: string;
}

export interface ICourseProgress {
    unitsDoneCount: number;
}

export interface IPositionsResponse {
    positions: IPosition[];
}

export interface ISaveCourseRequest {
    id?: string;
    title: string;
    previewImageUrl: string;
    positionId: string;
}

export interface ISaveCourseResponse {
    id: string;
    title: string;
    previewImageUrl: string;
    position: IPosition;
}
