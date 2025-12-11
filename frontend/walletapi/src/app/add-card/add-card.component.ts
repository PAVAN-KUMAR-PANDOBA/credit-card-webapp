import { Component, EventEmitter, Output } from '@angular/core';
import { Card } from '../card.model';
import { CardService } from '../card.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent {
  @Output() cardAdded = new EventEmitter<void>();  // Tells parent when card is added
  
  // New card object
  card: Card = {
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    ownerName: '',
    ownerPhone: '',
    category: '',
    whatsappLink: ''
  };

  // Available categories
  categories = ['Shopping', 'Travel', 'Fuel', 'Dining', 'Groceries', 'Other'];

  // Success/Error messages
  message = '';
  isError = false;

  constructor(private cardService: CardService) { }

  // Called when form is submitted
  onSubmit() {
    // Basic validation
    if (!this.card.cardName || !this.card.cardNumber || !this.card.expiryDate || 
        !this.card.cvv || !this.card.ownerName || !this.card.category) {
      this.showMessage('Please fill all required fields', true);
      return;
    }

    // Send card to backend
    this.cardService.addCard(this.card).subscribe({
      next: (response) => {
        this.showMessage('Card added successfully!');
        this.resetForm();
        this.cardAdded.emit();  // Notify parent
      },
      error: (error) => {
        console.error('Error:', error);
        this.showMessage('Failed to add card. Please try again.', true);
      }
    });
  }

  // Reset form after submission
  resetForm() {
    this.card = {
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      ownerName: '',
      ownerPhone: '',
      category: '',
      whatsappLink: ''
    };
  }

  // Show message to user
  showMessage(text: string, isError = false) {
    this.message = text;
    this.isError = isError;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  // Generate WhatsApp link
  generateWhatsAppLink() {
    if (this.card.ownerPhone) {
      // Clean phone number (remove spaces, +, etc)
      const phone = this.card.ownerPhone.replace(/\D/g, '');
      
      // Create message
      const message = `Hi! I need to use your ${this.card.cardName} card. Please approve with CVV.`;
      
      // Generate WhatsApp link
      this.card.whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      this.showMessage('WhatsApp link generated!');
    } else {
      this.showMessage('Please enter phone number first', true);
    }
  }
}