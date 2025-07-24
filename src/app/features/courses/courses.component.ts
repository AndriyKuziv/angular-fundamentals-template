import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Course } from '@app/shared/models/courseModels.interface';
import { UserStoreService } from '@app/user/services/user-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  isAdmin$: Observable<boolean>;

  constructor(
    private readonly coursesStore: CoursesStoreService,
    private readonly userStore: UserStoreService,
    private readonly router: Router
  ) {
    this.courses$ = this.coursesStore.courses$;
    this.isAdmin$ = this.userStore.isAdmin$;
  }

  ngOnInit(): void {
    this.coursesStore.getAll();
    this.userStore.getUser().subscribe();
  }

  onShow(course: Course): void {
    this.router.navigate(["/courses", course.id]);
  }

  onEdit(course: Course): void {
    this.router.navigate(["/courses/edit", course.id]);
  }

  onAdd(): void {
    this.router.navigate(["/courses/add"]);
  }

  onSearch(searchValue: string): void {
    if (searchValue) {
      this.coursesStore.filterCourses(searchValue);
    }
    else {
      this.coursesStore.getAll();
    }
  }
}
