import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { CourseInfoComponent } from './course-info.component';
import { CourseInfoRoutingModule } from './course-info-routing.module';

@NgModule({
  declarations: [CourseInfoComponent],
  imports: [CommonModule, SharedModule, CourseInfoRoutingModule],
})
export class CourseInfoModule {}