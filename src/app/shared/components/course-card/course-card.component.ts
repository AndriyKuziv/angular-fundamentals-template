import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() creationDate!: Date | string;
  @Input() duration!: number;
  @Input() authors: string[] = [];

  @Input() isEditable: boolean = false;

  @Output() clickOnShow = new EventEmitter<void>();
  @Output() clickOnEdit = new EventEmitter<void>();
  @Output() clickOnDelete = new EventEmitter<void>();

  onShow(): void {
    this.clickOnShow.emit();
  }

  onEdit(): void {
    this.clickOnEdit.emit();
  }

  onDelete(): void {
    this.clickOnDelete.emit();
  }
}
