import { Component, HostListener, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  menuItems = [
    {
      title: 'Home',
      icon: 'home',
      path: '/'
    },
    {
      title: 'OCR',
      icon: 'logo-codepen',
      path: '/ocr'
    },
    {
      title: 'PDF',
      icon: 'document',
      path: '/pdf'
    },
    {
      title: 'About',
      icon: 'information',
      path: '/about'
    }
  ];

  title = 'Home';
  constructor(private menuCtrl: MenuController, private plt: Platform) { }

  ngOnInit() {
    const width = this.plt.width();
    this.toggleMenu(width);
  }

  setTitle(title){
    this.title=title;
  }

  toggleMenu(width){
    if(width>768){
      this.menuCtrl.enable(false,'myMenu');
    }
    else{
      this.menuCtrl.enable(true,'myMenu');
    }
  }
  @HostListener('window:resize',['$event'])
  private onResize(event) {
    const newWidth = event.target.innerWidth;
    this.toggleMenu(newWidth);
  }
  

}
