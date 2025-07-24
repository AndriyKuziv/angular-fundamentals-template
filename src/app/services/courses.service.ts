import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseBase } from '@app/shared/models/responseBase.interface';
import * as apiConstants from '@app/shared/constants/api.constants';
import { map } from 'rxjs/operators';
import { Author } from '@app/shared/models/authorModels.interface';
import { Course, CreateCourseRequest, UpdateCourseRequest } from '@app/shared/models/courseModels.interface';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    constructor(private readonly http: HttpClient) {}

    getAll(){
        return this.http.get<ResponseBase>(apiConstants.baseUrl + apiConstants.coursesEndpointBase
            + apiConstants.coursesAllEndpoint)
        .pipe(
            map(response => {
                console.log(response);

                if(!response.successful || typeof(response.result as Course[]) === "undefined"){
                    return [];
                }

                return response.result as Course[];
            })
        );
    }

    createCourse(course: CreateCourseRequest) { 
        return this.http.post<ResponseBase>(apiConstants.baseUrl + apiConstants.coursesEndpointBase
            + apiConstants.coursesAddEndpoint, course)
        .pipe(
            map(response => {
                console.log(response);
                
                if (!response.successful || typeof(response.result as Course) === "undefined"){
                    return null;
                }

                return response.result as Course;
            })
        );
    }

    getCourse(id: string) {
        return this.http.get<ResponseBase>(apiConstants.baseUrl + apiConstants.coursesEndpointBase
            + "/" + id)
        .pipe(
            map(response => {
                console.log(response);

                if(!response.successful || typeof(response.result as Course) === "undefined"){
                    return null;
                }

                return response.result as Course;
            })
        );
    }

    editCourse(id: string, course: UpdateCourseRequest) {
        return this.http.put<ResponseBase>(apiConstants.baseUrl + apiConstants.coursesEndpointBase
            + "/" + id, course)
        .pipe(
            map(response => {
                console.log(response);
                
                if (!response.successful || typeof(response.result as Course) === "undefined"){
                    return null;
                }

                return response.result as Course;
            })
        );
    }

    deleteCourse(id: string) {
        return this.http.delete<ResponseBase>(apiConstants.baseUrl + apiConstants.coursesEndpointBase
            + "/" + id)
        .pipe(
            map(response => {
                console.log(response);
                
                return response.successful;
            })
        );
    }

    filterCourses(value: string) {
        return this.http.get<ResponseBase>(apiConstants.baseUrl + apiConstants.coursesEndpointBase
            + apiConstants.coursesFilterEndpoint + "?" + value)
        .pipe(
            map(response => {
                console.log(response);

                if(!response.successful || typeof(response.result as Course[]) === "undefined"){
                    return [];
                }

                return response.result as Course[];
            })
        );
    }

    getAllAuthors() {
        return this.http.get<ResponseBase>(apiConstants.baseUrl + apiConstants.authorsEndpointBase
            + apiConstants.coursesAllEndpoint)
        .pipe(
            map(response => {
                console.log(response);

                if(!response.successful || typeof(response.result as Author[]) === "undefined"){
                    return [];
                }

                return response.result as Author[];
            })
        );
    }

    createAuthor(name: string) {
        const author = { name: name };

        return this.http.post<ResponseBase>(apiConstants.baseUrl + apiConstants.authorsAddEndpoint, author)
        .pipe(
            map(response => {
                console.log(response);

                if(!response.successful || typeof(response.result as Author) === "undefined"){
                    return null;
                }

                return response.result as Author;
            })
        );
    }

    getAuthorById(id: string) {
        return this.http.get<ResponseBase>(apiConstants.baseUrl + apiConstants.authorsEndpointBase
            + "/" + id)
        .pipe(
            map(response => {
                console.log(response);

                if(!response.successful || typeof(response.result as Author) === "undefined"){
                    return null;
                }

                return response.result as Author;
            })
        );
    }
}
