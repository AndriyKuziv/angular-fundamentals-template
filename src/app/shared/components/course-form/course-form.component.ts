import { Component } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators, FormArray
} from '@angular/forms';
import { mockedAuthorsList } from '@app/shared/mocks/mocks';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

interface Author {
  id: string;
  name: string;
}

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  courseForm!: FormGroup;
  allAuthors: Author[] = mockedAuthorsList;
  courseAuthors: Author[] = [];
  submitted = false;
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.

  ngOnInit(): void {
    // Example initial authors
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      duration: [0, [Validators.required, Validators.min(0)]],
      authors: this.fb.array([]),
      author: ['', [ Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9\s]+$/) ] ]
    });
  }
  
  get title() { return this.courseForm.get('title'); }
  get description() { return this.courseForm.get('description'); }
  get duration() { return this.courseForm.get('duration'); }
  get authorsArray(): FormArray { return this.courseForm.get('authors') as FormArray; }
  get author() { return this.courseForm.get("author"); }

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
      const newAuthor: Author = {
        id: uuidv4(),
        name: this.author?.value
      };
      this.allAuthors.push(newAuthor);
      this.author?.reset();
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.courseForm.valid) {
      console.log('Course:', this.courseForm.value);
    }
  }
}
