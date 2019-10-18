import { Component, OnInit, Input, Directive } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  
})

@Directive({
  selector:'[status]'
})
export class ChildComponent implements OnInit {
test:any;
  @Input() set status(k){
this.test = k;
  };

  sendData:any='non'
  // event:new EventEmitter

  @Output() valueChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
   console.log("this.test",this.test)
  }

  child()
  {
this.sendData = "check value";

  }
}
