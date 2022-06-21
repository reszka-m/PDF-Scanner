import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logo = "assets/Logo.png";
  mateusz = "assets/ja.jpg";
  michal = "assets/michal.png";
  wojtek = "assets/wojtek.jpg"
}
