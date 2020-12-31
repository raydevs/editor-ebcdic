import { MediaMatcher } from '@angular/cdk/layout';
import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ToolbarService } from './shared/services/toolbar.service';

export interface MenuItem {
  label: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  selectedFont = 16;
  fonts = [10, 12, 14, 16, 18, 20];

  searchInput = '';

  fillerNav = Array.from({ length: 5 }, (_, i) => `Nav Item ${i + 1}`);

  constructor(changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private toolbarService: ToolbarService) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onFileChange(file: File) {
    this.toolbarService.newFileSelected(file);
  }

  private _mobileQueryListener: () => void;

}
