import { Injectable } from '@angular/core';
import { data } from '../models/data';
import { Board, Card } from '../models/board.model';
import { Subject} from 'rxjs';

@Injectable()
export class BoardService {

  constructor() { }

  private data: Board = data;
  private modalState$ = new Subject();
  getBoard(): Board {
    return this.data;
  }

  addCard(listId, cardTitle, cardContent): void {
    let list = this.data.find(list => list.id == listId);
    list.cards = [{ id: Date.now(), title: cardTitle, content: cardContent}, ...list.cards];
  }

  deleteCard(listId, cardId): void {
    let list = this.data.find(list => list.id == listId);
    let card = list.cards.find(card => card.id == cardId);
    let index = list.cards.indexOf(card);
    list.cards.splice(index, 1);
  }

  updateCard(listIndex, cardIndex, newCard): void {
    this.data[listIndex].cards[cardIndex] = newCard;
  }

  addList(listName): void {
    this.data.push({ 'id': Date.now(), 'name': listName, 'cards': [] });
  }

  deleteList(listId): void {
    let list = this.data.find(list => list.id == listId);
    let index = this.data.indexOf(list);
    this.data.splice(index, 1);
  }

  setModalState(bool: boolean, card: Card): void {
    let state = {
      open: bool,
      card: card
    }
    this.modalState$.next(state)
  }

  getModalState() {
    return this.modalState$;
  }

}