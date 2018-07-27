import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css']
})
export class GooglemapComponent implements OnInit {
  lat: number = 19.115692;
  lng: number = 72.893689;
  constructor() { }

  ngOnInit() {
  }

}
