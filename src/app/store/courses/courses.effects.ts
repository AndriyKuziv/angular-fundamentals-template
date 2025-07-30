import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CoursesActions from './courses.actions';
import { CoursesService } from '@app/services/courses.service';
import { CoursesStateFacade } from './courses.facade';
import { catchError, map, mergeMap, of, withLatestFrom, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class CoursesEffects {
    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private coursesStateFacade: CoursesStateFacade,
        private router: Router
    ) {}

    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestAllCourses),
            mergeMap(() =>
                this.coursesService.getAll().pipe(
                    map(courses => CoursesActions.requestAllCoursesSuccess({ courses })),
                    catchError(error => of(CoursesActions.requestAllCoursesFail({ error })))
                )
            )
        )
    );

    filteredCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestFilteredCourses),
            withLatestFrom(this.coursesStateFacade.allCourses$),
            map(([action, allCourses]) => {
                const searchValue = action.title?.toLowerCase() || '';
                const courses = allCourses.filter(course =>
                    course.title.toLowerCase().includes(searchValue)
                );
                return CoursesActions.requestFilteredCoursesSuccess({ courses });
            })
        )
    );

    getSpecificCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestSingleCourse),
            mergeMap(action =>
                this.coursesService.getCourse(action.id).pipe(
                    map(course => {
                        if (course) {
                            return CoursesActions.requestSingleCourseSuccess({ course });
                        } else {
                            return CoursesActions.requestSingleCourseFail({ error: 'Course not found' });
                        }
                    }),
                    catchError(error => of(CoursesActions.requestSingleCourseFail({ error })))
                )
            )
        )
    );

    deleteCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestDeleteCourse),
            mergeMap(action =>
                this.coursesService.deleteCourse(action.id).pipe(
                    map(() => CoursesActions.requestAllCourses()),
                    catchError(error => of(CoursesActions.requestDeleteCourseFail({ error })))
                )
            )
        )
    );

    editCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestEditCourse),
            mergeMap(action =>
                this.coursesService.editCourse(action.id, action.course).pipe(
                    map(course => {
                        if (course) {
                            return CoursesActions.requestEditCourseSuccess({ course });
                        } else {
                            return CoursesActions.requestEditCourseFail({ error: 'Edit failed' });
                        }
                    }),
                    catchError(error => of(CoursesActions.requestEditCourseFail({ error })))
                )
            )
        )
    );

    createCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestCreateCourse),
            mergeMap(action =>
                this.coursesService.createCourse(action.course).pipe(
                    map(course => {
                        if (course) {
                            return CoursesActions.requestCreateCourseSuccess({ course });
                        } else {
                            return CoursesActions.requestCreateCourseFail({ error: 'Create failed' });
                        }
                    }),
                    catchError(error => of(CoursesActions.requestCreateCourseFail({ error })))
                )
            )
        )
    );

    redirectToTheCoursesPage$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    CoursesActions.requestCreateCourseSuccess,
                    CoursesActions.requestEditCourseSuccess,
                    CoursesActions.requestSingleCourseFail
                ),
                tap(() => {
                    this.router.navigate(['/courses']);
                })
            ),
        { dispatch: false }
    );
}
