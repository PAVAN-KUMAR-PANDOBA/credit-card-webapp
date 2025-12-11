    // This defines what a card looks like
export interface Card {
  id?: number;              // Optional ID from database
  cardName: string;         // e.g., "Amazon ICICI"
  cardNumber: string;       // Full card number
  expiryDate: string;       // MM/YY format
  cvv: string;             // 3-4 digit CVV
  ownerName: string;       // Card owner's name
  ownerPhone: string;      // Owner's phone for WhatsApp
  category: string;        // Shopping, Travel, etc.
  whatsappLink: string;    // Generated WhatsApp link
  createdAt?: string;      // When card was added
}