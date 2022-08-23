import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/', icon: 'mail' },
    { title: 'Questionari', url: '/area-selection', icon: 'paper-plane' },
    { title: 'Completato', url: '/', icon: 'heart' },
    { title: 'Feedback', url: '/', icon: 'archive' },
    { title: 'Richiedi test DNA', url: '/', icon: 'trash' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
