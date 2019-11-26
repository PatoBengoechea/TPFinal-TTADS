import { Component } from '@angular/core';
import { ThrowStmt } from '../../node_modules/@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'app';
  option = 0;

  constructor(){
    const key="afbc1995a41f72f35622f748d82068dc";
  }

  setOption(opt: number){
    this.option = opt;
  }
}
