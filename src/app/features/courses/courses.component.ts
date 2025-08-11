import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { Course } from '@app/shared/models/courseModels.interface';
import { UserStoreService } from '@app/user/services/user-store.service';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Author } from '@app/shared/models/authorModels.interface';
import { map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  isAdmin$: Observable<boolean>;

  constructor(
    private readonly coursesFacade: CoursesStateFacade,
    private readonly userStore: UserStoreService,
    private readonly coursesStore: CoursesStoreService,
    private readonly router: Router
  ) {
    this.courses$ = combineLatest([
      this.coursesFacade.courses$,
      this.coursesStore.getAllAuthors()
    ]).pipe(
      map(([courses, authors]) =>
        courses.map(course => ({
          ...course,
          authors: course.authors
            .map(authorId => authors.find(a => a.id === authorId)?.name || authorId)
        }))
      )
    );
    this.isAdmin$ = this.userStore.isAdmin$;
  }

  ngOnInit(): void {
    this.coursesFacade.getAllCourses();
  }

  onShow(course: Course): void {
    this.router.navigate(["/courses", course.id]);
  }

  onEdit(course: Course): void {
    this.router.navigate(["/courses/edit", course.id]);
  }

  onDelete(course: Course): void {
    this.coursesFacade.deleteCourse(course.id);
  }

  onAdd(): void {
    this.router.navigate(["/courses/add"]);
  }

  onSearch(searchValue: string): void {
    if (searchValue) {
      this.coursesFacade.getFilteredCourses(searchValue);
    } else {
      this.coursesFacade.getAllCourses();
    }
  }
}
