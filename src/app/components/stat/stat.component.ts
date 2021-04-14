import { Component, OnInit } from '@angular/core';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ActionEvent } from 'src/app/states/product.state';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {

  counter: number = 0;
  constructor(private eventDrivenService: EventDriverService) { }

  ngOnInit(): void {
    this.eventDrivenService.sourceEventSubjectObservable.subscribe((actionEvent: ActionEvent) =>{
      ++this.counter;
    });
  }

}
