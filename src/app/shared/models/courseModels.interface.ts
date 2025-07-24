export interface Course {
    title: string,
    description: string,
    creationDate: string,
    duration: number,
    authors: string[],
    id: string
}

export interface CreateCourseRequest {
    title: string,
    description: string,
    duration: number,
    authors: string[]
}

export interface UpdateCourseRequest {
    title: string,
    description: string,
    duration: number,
    authors: string[]
}