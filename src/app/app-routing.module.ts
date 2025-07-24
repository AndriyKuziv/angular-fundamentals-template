import { Routes } from '@angular/router';
import { CourseInfoComponent } from './features/course-info/course-info.component';
import { CoursesComponent } from './features/courses/courses.component';
import { CourseFormComponent, LoginFormComponent, RegistrationFormComponent } from './shared/components';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { AdminGuard } from './user/guards/admin.guard';

export const routes: Routes = [
    { path: "", redirectTo: "courses", pathMatch: "full" },
    { path: "courses", component: CoursesComponent, canLoad: [AuthorizedGuard] },
    { path: "courses/add", component: CourseFormComponent, canActivate: [AdminGuard], canLoad: [AuthorizedGuard] },
    { path: "courses/edit/:id", component: CourseInfoComponent, canActivate: [AdminGuard], canLoad: [AuthorizedGuard] },
    { path: "courses/:id", component: CourseInfoComponent, canLoad: [AuthorizedGuard] },
    { path: "login", component: LoginFormComponent, canActivate: [NotAuthorizedGuard] },
    { path: "register", component: RegistrationFormComponent, canActivate: [NotAuthorizedGuard] },
    { path: "**", redirectTo: "courses", pathMatch: "full" }
];
