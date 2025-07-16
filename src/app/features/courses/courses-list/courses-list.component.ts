import { Component, Input, Output, EventEmitter } from '@angular/core';
import { mockedAuthorsList } from '@app/shared/mocks/mocks';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  @Input() courses: any[] = mockedAuthorsList;
  @Input() isEditable = false;

  @Output() showCourse = new EventEmitter<any>();

  onShow(course: any) {
    this.showCourse.emit(course);
  }
}
