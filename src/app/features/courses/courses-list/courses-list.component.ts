import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  @Input() courses: any[] = [];
  @Input() isEditable = false;

  @Output() showCourse = new EventEmitter<any>();

  onShow(course: any) {
    this.showCourse.emit(course);
  }
}
