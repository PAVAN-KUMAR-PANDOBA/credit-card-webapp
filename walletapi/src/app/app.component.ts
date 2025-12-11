import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Card Pool App';
   onButtonClick() {
    console.log('Button clicked!');
  }
  
  // Refresh card list when new card is added
  refreshCards() {
    // This will be called by child component
    console.log('Card added - refresh list if needed');
  }
}