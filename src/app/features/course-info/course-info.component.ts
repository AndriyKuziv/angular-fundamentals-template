import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { Course } from '@app/shared/models/courseModels.interface';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  course: Course | null = null;

  constructor(
    readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly coursesFacade: CoursesStateFacade
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');

    if (courseId) {
      this.coursesFacade.getSingleCourse(courseId);
      this.coursesFacade.course$.subscribe(course => {
        this.course = course;
      });
    }
  }
}
