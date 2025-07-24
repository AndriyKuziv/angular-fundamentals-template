import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CoursesService } from './courses.service';
import { finalize } from 'rxjs/operators';
import { Course, CreateCourseRequest, UpdateCourseRequest } from '@app/shared/models/courseModels.interface';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    private isLoading$$ = new BehaviorSubject<boolean>(false);
    public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

    private courses$$ = new BehaviorSubject<Course[]>([]);
    public courses$: Observable<Course[]> = this.courses$$.asObservable();

    constructor(private readonly coursesService: CoursesService) {}

    getAll() {
        this.isLoading$$.next(true);
        this.coursesService.getAll()
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe(courses => this.courses$$.next(courses));
    }

    createCourse(course: CreateCourseRequest) {
        this.isLoading$$.next(true);
        return this.coursesService.createCourse(course)
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe(newCourse => {
                if (newCourse) {
                    this.courses$$.next([...this.courses$$.value, newCourse]);
                }
            });
    }

    getCourse(id: string) {
        return this.coursesService.getCourse(id);
    }

    editCourse(id: string, course: UpdateCourseRequest) {
        this.isLoading$$.next(true);
        return this.coursesService.editCourse(id, course)
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe(updatedCourse => {
                if (updatedCourse) {
                    const updatedCourses = this.courses$$.value
                        .map(c => c.id === id ? updatedCourse : c);
                    this.courses$$.next(updatedCourses);
                }
            });
    }

    deleteCourse(id: string) {
        this.isLoading$$.next(true);
        this.coursesService.deleteCourse(id)
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe(success => {
                if (success) {
                    this.courses$$.next(this.courses$$.value.filter(c => c.id !== id));
                }
            });
    }

    filterCourses(value: string) {
        this.isLoading$$.next(true);
        this.coursesService.filterCourses(value)
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe(filteredCourses => this.courses$$.next(filteredCourses));
    }

    getAllAuthors() {
        return this.coursesService.getAllAuthors();
    }

    createAuthor(name: string) {
        return this.coursesService.createAuthor(name);
    }

    getAuthorById(id: string) {
        return this.coursesService.getAuthorById(id);
    }
}
