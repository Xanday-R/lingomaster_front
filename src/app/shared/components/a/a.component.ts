import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-a',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './a.component.html',
  styleUrl: './a.component.scss'
})
export class AComponent {
  @Input() href:string[]  = [];
  @Input() color:string|undefined;
}
