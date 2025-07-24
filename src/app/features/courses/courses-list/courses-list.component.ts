import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '@app/shared/models/courseModels.interface';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  @Input() courses: Course[] | null = [];
  @Input() isEditable: boolean | null = false;

  @Output() showCourse = new EventEmitter<Course>();
  @Output() editCourse = new EventEmitter<Course>();

  onShow(course: Course) {
    this.showCourse.emit(course);
  }

  onEdit(course: Course) {
    this.editCourse.emit(course);
  }
}
