import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { Author } from '@app/shared/models/authorModels.interface';
import { Course, CreateCourseRequest } from '@app/shared/models/courseModels.interface';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private readonly coursesStore: CoursesStoreService,
    private readonly coursesFacade: CoursesStateFacade,
    private readonly route: ActivatedRoute,
    private readonly router: Router) {
    library.addIconPacks(fas);
  }

  courseForm!: FormGroup;
  allAuthors: Author[] = [];
  courseAuthors: Author[] = [];
  submitted: boolean = false;
  isEditMode: boolean = false;
  courseId: string | null = null;

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      duration: [0, [Validators.required, Validators.min(0)]],
      authors: this.fb.array([]),
      author: ['', [ Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9\s]+$/) ] ]
    });

    this.coursesStore.getAllAuthors().subscribe(authors => {
      this.allAuthors = authors;

      this.route.paramMap.subscribe(params => {
      this.courseId = params.get("id");
      this.isEditMode = !!this.courseId;
      if (this.isEditMode && this.courseId) {
        this.coursesFacade.getSingleCourse(this.courseId);
        this.coursesFacade.course$.subscribe((course: Course | null) => {
          if (course) {
            this.courseForm.patchValue({
              title: course.title,
              description: course.description,
              duration: course.duration
            });
            
            this.courseAuthors = course.authors
              .map((id: string) => this.allAuthors.find(a => a.id === id))
              .filter((a): a is Author => !!a);

            this.allAuthors = this.allAuthors.filter(
              a => !course.authors.includes(a.id)
            );
            
            const authorsFormArray = this.fb.array(
              this.courseAuthors.map(author => this.fb.control({ id: author.id, name: author.name }))
            );

            this.courseForm.setControl("authors", authorsFormArray);
          }
        });
      }
    });
    });
  }
  
  get title() {
    return this.courseForm.get("title");
  }

  get description() {
    return this.courseForm.get("description");
  }

  get duration() {
    return this.courseForm.get("duration");
  }

  get authorsArray(): FormArray {
    return this.courseForm.get("authors") as FormArray;
  }

  get author() {
    return this.courseForm.get("author");
  }

  addAuthorToCourse(author: Author) {
    this.courseAuthors.push(author);
    this.allAuthors = this.allAuthors.filter(a => a.id !== author.id);
    this.authorsArray.push(this.fb.control({ id: author.id, name: author.name }));
  }

  removeAuthorFromCourse(author: Author, index: number) {
    this.allAuthors.push(author);
    this.courseAuthors = this.courseAuthors.filter(a => a.id !== author.id);
    this.authorsArray.removeAt(index);
  }

  createAuthor() {
    if (this.author?.valid) {
      const newAuthor = {
        id: uuidv4(),
        name: this.author?.value
      };
      this.coursesStore.createAuthor(newAuthor.name).subscribe(author => {
        if (author) {
          this.allAuthors.push(author);
        }
      });
      this.author?.reset();
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.courseForm.valid) {
      const courseModel = this.courseForm.value;

      const course: CreateCourseRequest = {
        title: courseModel.title,
        description: courseModel.description,
        duration: courseModel.duration,
        authors: courseModel.authors.map((author: Author) => author.id)
      };

      if (this.isEditMode && this.courseId) {
        this.coursesFacade.editCourse(this.courseId, course);
      }
      else {
        this.coursesFacade.createCourse(course);
      }
    }
  }

  onCancelClick(){
    this.router.navigate(["/courses"]);
  }
}
