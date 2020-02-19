import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Force } from './data/force.model';
import { ForceTreeService } from './force-tree/force-tree.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [ ForceTreeService ]
})

export class AppComponent {
  title = 'treed';
  data: Observable<Force>;
  constructor(private forceService: ForceTreeService) {
    this.data = this.forceService.getForceData();
  }
}