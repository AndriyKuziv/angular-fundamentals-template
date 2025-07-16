import { Component, Input, Output, EventEmitter } from '@angular/core';
import { mockedCoursesList } from '@app/shared/mocks/mocks';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  @Input() courses: any[] = mockedCoursesList;
  @Input() isEditable = false;

  @Output() showCourse = new EventEmitter<any>();

  onShow(course: any): void {
    this.showCourse.emit(course);
  }

  onAdd(): void {
    this.showCourse.emit(null!);
  }

  onSearch(searchValue: string): void {
    console.log("Search:", searchValue);
  }
}
