import { Component, OnInit } from '@angular/core';
import { Card } from '../card.model';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  cards: Card[] = [];  // All cards
  filteredCards: Card[] = [];  // Cards after filtering
  categories = ['All', 'Shopping', 'Travel', 'Fuel', 'Dining', 'Groceries', 'Other'];
  selectedCategory = 'All';
  searchText = '';

  constructor(private cardService: CardService) { }

  // Called when component loads
  ngOnInit() {
    this.loadCards();
  }

  // Load cards from backend
  loadCards() {
    this.cardService.getAllCards().subscribe({
      next: (cards) => {
        this.cards = cards;
        this.filteredCards = cards;
      },
      error: (error) => {
        console.error('Error loading cards:', error);
        // For testing, create sample data if backend is down
        this.cards = [
          {
            id: 1,
            cardName: 'Amazon ICICI',
            cardNumber: '1234567890123456',
            expiryDate: '12/25',
            cvv: '123',
            ownerName: 'John',
            ownerPhone: '9876543210',
            category: 'Shopping',
            whatsappLink: 'https://wa.me/9876543210'
          }
        ];
        this.filteredCards = this.cards;
      }
    });
  }

  // Filter cards based on category and search
  filterCards() {
    let filtered = this.cards;
    
    // Filter by category
    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(card => card.category === this.selectedCategory);
    }
    
    // Filter by search text
    if (this.searchText) {
      const search = this.searchText.toLowerCase();
      filtered = filtered.filter(card => 
        card.cardName.toLowerCase().includes(search) ||
        card.ownerName.toLowerCase().includes(search)
      );
    }
    
    this.filteredCards = filtered;
  }

  // Delete a card
  onDeleteCard(id: number) {
    this.cardService.deleteCard(id).subscribe({
      next: () => {
        this.loadCards();  // Reload cards after delete
      },
      error: (error) => {
        console.error('Error deleting card:', error);
      }
    });
  }

  // Count cards in a category
  getCategoryCount(category: string): number {
    return this.cards.filter(card => card.category === category).length;
  }
}