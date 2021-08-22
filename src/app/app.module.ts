import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CardModalComponent } from './card-modal/card-modal.component';
import { BoardService } from './services/board.service';
import { BoardComponent } from './board/board.component';
import { RoutingModule } from './routing.module';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, DragDropModule, RoutingModule, ModalModule],
  declarations: [AppComponent, CardModalComponent, BoardComponent],
  bootstrap: [AppComponent],
  providers: [ BoardService, BsModalService]
})
export class AppModule { }
