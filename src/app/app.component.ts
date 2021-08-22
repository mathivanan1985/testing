import { Component } from '@angular/core';
import { BoardService } from './services/board.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  constructor(private boardService:BoardService) {}


}
