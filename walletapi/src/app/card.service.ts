    import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from './card.model';

@Injectable({
  providedIn: 'root'  // Makes service available everywhere
})
export class CardService {
  // Backend API URL - change this if your backend runs on different port
  private apiUrl = 'http://localhost:8080/api/cards';

  constructor(private http: HttpClient) { }

  // Get all cards from backend
  getAllCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.apiUrl);
  }

  // Add new card to backend
  addCard(card: Card): Observable<Card> {
    return this.http.post<Card>(this.apiUrl, card);
  }

  // Update existing card
  updateCard(id: number, card: Card): Observable<Card> {
    return this.http.put<Card>(`${this.apiUrl}/${id}`, card);
  }

  // Delete a card
  deleteCard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get cards by category
  getCardsByCategory(category: string): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.apiUrl}/category/${category}`);
  }
}