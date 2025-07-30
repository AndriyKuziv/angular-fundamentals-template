import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
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
    private readonly coursesFacade: CoursesStateFacade,
    private readonly userStore: UserStoreService,
    private readonly router: Router
  ) {
    this.courses$ = this.coursesFacade.courses$;
    this.isAdmin$ = this.userStore.isAdmin$;
  }

  ngOnInit(): void {
    this.coursesFacade.getAllCourses();
    this.userStore.getUser().subscribe();
  }

  onShow(course: Course): void {
    this.router.navigate(["/courses", course.id]);
  }

  onEdit(course: Course): void {
    this.router.navigate(["/courses/edit", course.id]);
  }

  onDelete(course: Course): void {
    console.warn(`Clicked course '${course.title}' for deletion.`);
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
