import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardService } from '../services/board.service';
import { Board, List, Card } from '../models/board.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  isModalOpen: boolean = false;
  cardObject !: Card;
  board !: Board;
  titleListEditor: boolean = false;
  editingListId !: number;
  modalRef: BsModalRef;
  selectedCard: any;
  newCard: any = {
    title: null,
    content: null
  };
  listId: number;
  isNewCard = false;
  list: any;
  isDeleteCard: boolean = false;
  constructor(private boardService: BoardService, private modalService: BsModalService) { }

  ngOnInit() {
    this.board = this.boardService.getBoard();
    this.boardService.getModalState().subscribe((state: any) => {
      console.log(state);
      this.isModalOpen = state.open;
      this.cardObject = state.card
    })
  }

  addCardAction(listId?: number, addCardTemp?, isCard?: boolean): void {
    this.listId = listId;
    this.isNewCard = (isCard === true) ? true : false;
    this.modalRef = this.modalService.show(addCardTemp);
  }

  addNewCard(card) {
    if (this.isNewCard === true) {
      if (card.title === undefined || card.title === null) {
        alert('title should not be empty');
        return;
      }
      else if (card.content === undefined || card.content === null) {
        alert('content should not be empty');
        return;
      }
      else {
        this.boardService.addCard(this.listId, card.title.trim(), card.content);
        this.newCard = {
          title: null,
          content: null
        };
        this.modalService.hide();
      }
    }
    else {
      if (card.title === undefined || card.title === null) {
        alert('title should not be empty');
        return;
      }
      else {
        this.addListAction(card.title);

      }
    }


  }

  deleteCardAction(event, listId: number, cardId: number, deleteTemp, isDelete, list): void {
    event.stopPropagation();
    if (isDelete === 1) {
      this.selectedCard = {
        listId: listId,
        cardId: cardId
      };
      this.isDeleteCard = true;
    }
    else {
      this.list = list;
      this.isDeleteCard = false;
    }

    this.modalRef = this.modalService.show(deleteTemp);
  }

  isSuccessdeleteCard() {
    if (this.isDeleteCard === true) {
      this.boardService.deleteCard(this.selectedCard.listId, this.selectedCard.cardId);
    }
    else {
      this.deleteListAction(this.list);
    }

    this.modalService.hide();
  }

  drop(event: CdkDragDrop<Card[]>, selectedCard) {
    if (selectedCard === 'card') {
      if (event.previousContainer === event.container) {
        
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        // move Card in Another List
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
    }

  }

  dropBoard(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  addListAction(title): void {
    this.boardService.addList(title);
    this.newCard = {
      title: null,
      content: null
    };
    this.modalService.hide();
  }

  editTitleList(list: List): void {
    this.editingListId = list.id;
    this.titleListEditor = true;
  }

  getTitleListOnKeyUp(titleListInput: string, list: List): void {
    list.name = titleListInput;
    this.editingListId = 0;
    this.titleListEditor = false;
  }

  deleteListAction(list) {
    // event.stopPropagation();    
      this.boardService.deleteList(list.id);
  }

  openModal(card, template) {
    console.log(card);
    this.isModalOpen = true;
    this.cardObject = card;
    this.modalRef = this.modalService.show(template);
    console.log(this.boardService.getBoard());
  }

  closeModal() {
    this.isModalOpen = false;
    this.modalService.hide();
    console.log(this.boardService.getBoard());
  }
}