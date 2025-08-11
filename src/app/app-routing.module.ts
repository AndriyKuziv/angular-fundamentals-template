import { Routes } from '@angular/router';
import { CourseFormComponent, LoginFormComponent, RegistrationFormComponent } from './shared/components';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { AdminGuard } from './user/guards/admin.guard';

export const routes: Routes = [
    { path: "", redirectTo: "courses", pathMatch: "full" },
    { path: "courses", loadChildren: () => import("./features/courses/courses.module").then((m) => m.CoursesModule), canLoad: [AuthorizedGuard] },
    { path: "courses/add", component: CourseFormComponent, canActivate: [AdminGuard], canLoad: [AuthorizedGuard] },
    { path: "courses/edit/:id", component: CourseFormComponent, canActivate: [AdminGuard], canLoad: [AuthorizedGuard] },
    { path: "courses/:id", loadChildren: () => import("./features/course-info/course-info.module").then((m) => m.CourseInfoModule), canLoad: [AuthorizedGuard] },
    { path: "login", component: LoginFormComponent, canActivate: [NotAuthorizedGuard] },
    { path: "register", component: RegistrationFormComponent, canActivate: [NotAuthorizedGuard] },
    { path: "**", redirectTo: "courses", pathMatch: "full" }
];
