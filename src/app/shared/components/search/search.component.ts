import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() placeholder: string = "Input text";
  @Output() search = new EventEmitter<string>();

  searchValue: string = "";

  onSearch() {
    this.search.emit(this.searchValue.trim());
  }
}

