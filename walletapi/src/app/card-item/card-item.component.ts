import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../card.model';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent {
  @Input() card!: Card;  // Card data from parent
  @Output() delete = new EventEmitter<number>();  // Emit when delete clicked
  
  showCVV = false;  // Toggle CVV visibility

  // Get category color
  getCategoryClass(category: string): string {
    switch(category) {
      case 'Shopping': return 'bg-danger';
      case 'Travel': return 'bg-warning';
      case 'Fuel': return 'bg-info';
      case 'Dining': return 'bg-success';
      case 'Groceries': return 'bg-primary';
      default: return 'bg-secondary';
    }
  }

  // Format card number (hide middle digits)
  formatCardNumber(cardNumber: string): string {
    if (cardNumber.length >= 16) {
      const lastFour = cardNumber.slice(-4);
      return `****-****-****-${lastFour}`;
    }
    return cardNumber;
  }

  // Copy text to clipboard
  copyText(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  }

  // Toggle CVV visibility
  toggleCVV() {
    this.showCVV = !this.showCVV;
  }

  // Delete this card
  onDelete() {
    if (confirm('Delete this card?')) {
      this.delete.emit(this.card.id);
    }
  }
}