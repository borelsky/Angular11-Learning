import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Action } from "rxjs/internal/scheduler/Action";
import { ActionEvent } from "../states/product.state";

@Injectable({providedIn:"root"})
export class EventDriverService {

  sourceEventSubject: Subject<ActionEvent> = new Subject<ActionEvent>();
  sourceEventSubjectObservable = this.sourceEventSubject.asObservable();
  sourceEventSubject2: Subject<ActionEvent> = new Subject<ActionEvent>();
  sourceEventSubjectObservable2 = this.sourceEventSubject2.asObservable();

  publishEvent($event:ActionEvent){

    this.sourceEventSubject.next($event);

  }
}
