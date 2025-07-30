import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CoursesActions from './courses.actions';
import * as CoursesSelectors from './courses.selectors';
import { UpdateCourseRequest, CreateCourseRequest } from '@app/shared/models/courseModels.interface';

@Injectable({
    providedIn: 'root'
})
export class CoursesStateFacade {
    public isAllCoursesLoading$ = this.store.select(CoursesSelectors.isAllCoursesLoadingSelector);
    public isSingleCourseLoading$ = this.store.select(CoursesSelectors.isSingleCourseLoadingSelector);
    public isSearchingState$ = this.store.select(CoursesSelectors.isSearchingStateSelector);
    public courses$ = this.store.select(CoursesSelectors.getCourses);
    public allCourses$ = this.store.select(CoursesSelectors.getAllCourses);
    public course$ = this.store.select(CoursesSelectors.getCourse);
    public errorMessage$ = this.store.select(CoursesSelectors.getErrorMessage);

    constructor(private store: Store) {}

    getAllCourses() {
        this.store.dispatch(CoursesActions.requestAllCourses());
    }

    getSingleCourse(id: string) {
        this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
    }

    getFilteredCourses(searchValue: string) {
        this.store.dispatch(CoursesActions.requestFilteredCourses({ title: searchValue }));
    }

    editCourse(id: string, body: UpdateCourseRequest) {
        this.store.dispatch(CoursesActions.requestEditCourse({ id, course: body }));
    }

    createCourse(body: CreateCourseRequest) {
        this.store.dispatch(CoursesActions.requestCreateCourse({ course: body }));
    }

    deleteCourse(id: string) {
        this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
    }
}
