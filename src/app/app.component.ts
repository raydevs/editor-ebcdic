import { Component } from '@angular/core';
import { ToolbarService } from './shared/services/toolbar.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedFont = 16;
  fonts = [10, 12, 14, 16, 18, 20];

  fillerNav = Array.from({ length: 5 }, (_, i) => `Nav Item ${i + 1}`);

  constructor(private toolbarService: ToolbarService) { }

  onFileChange(file: File) {
    this.toolbarService.newFileSelected(file);
  }

}
