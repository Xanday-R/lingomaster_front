import { Component } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-404',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './404.component.html',
  styleUrl: './404.component.scss'
})
export class PageIsNotFoundComponent {

}
