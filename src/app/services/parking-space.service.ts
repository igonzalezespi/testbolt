import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingSpaceService {
  private apiUrl = 'https://your-api-url.com/parking-spaces'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getParkingSpaces(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  markSpaceAvailable(position: { latitude: number; longitude: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/available`, position);
  }

  markSpaceOccupied(position: { latitude: number; longitude: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/occupied`, position);
  }

  rateSpace(spaceId: string, rating: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${spaceId}/rate`, { rating });
  }
}