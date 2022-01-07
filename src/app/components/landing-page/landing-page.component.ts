import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  title: string = "Mock E-Commerce App"
  subtitle: string = "Using Angular + FakeStoreAPI + Angular Material";
  statement: string = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut voluptate quibusdam vero beatae itaque praesentium soluta aperiam vel ab maiores labore quia nulla debitis commodi perferendis expedita, asperiores excepturi alias.'


  ngOnInit(): void {
  }

}
