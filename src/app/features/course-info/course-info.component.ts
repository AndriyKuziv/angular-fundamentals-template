import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
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
    private readonly coursesStore: CoursesStoreService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.coursesStore.getCourse(id).subscribe(course => {
        this.course = course;
      });
    }
  }
}
