export interface IUserInfo {
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

export interface IPosition {
    id: string;
    title: string;
}

export interface ICourseProgress {
    unitsDoneCount: number;
}
