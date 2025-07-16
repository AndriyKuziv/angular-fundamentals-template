import { Routes } from '@angular/router';
import { CourseInfoComponent } from './features/course-info/course-info.component';
import { CoursesComponent } from './features/courses/courses.component';
import { LoginFormComponent, RegistrationFormComponent } from './shared/components';

export const routes: Routes = [
    { path: '', redirectTo: 'courses', pathMatch: 'full' },
    { path: 'courses', component: CoursesComponent },
    { path: 'courses/:id', component: CourseInfoComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'register', component: RegistrationFormComponent }
];
