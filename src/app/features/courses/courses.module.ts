import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses.component';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [CoursesComponent, CoursesListComponent],
  imports: [CommonModule, SharedModule, CoursesRoutingModule],
})
export class CoursesModule {}