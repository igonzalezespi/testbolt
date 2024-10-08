import { Component, OnInit, NgZone } from '@angular/core';
import { getCurrentLocation } from '@nativescript/geolocation';
import { MapView, Marker, Position } from '@nativescript/google-maps';
import { ParkingSpaceService } from '../services/parking-space.service';
import { AuthService } from '../services/auth.service';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  mapView: MapView;
  userPosition: Position;
  parkingSpaces: any[] = [];

  constructor(
    private zone: NgZone,
    private parkingSpaceService: ParkingSpaceService,
    private authService: AuthService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.getUserLocation();
      this.loadParkingSpaces();
    } else {
      this.routerExtensions.navigate(['/auth'], { clearHistory: true });
    }
  }

  onMapReady(event: any) {
    this.mapView = event.object;
    this.showUserLocation();
  }

  async getUserLocation() {
    try {
      const location = await getCurrentLocation({});
      this.userPosition = {
        lat: location.latitude,
        lng: location.longitude,
      };
      this.showUserLocation();
    } catch (error) {
      console.error('Error getting location:', error);
    }
  }

  showUserLocation() {
    if (this.mapView && this.userPosition) {
      this.mapView.latitude = this.userPosition.lat;
      this.mapView.longitude = this.userPosition.lng;
      this.mapView.zoom = 15;
    }
  }

  async loadParkingSpaces() {
    try {
      this.parkingSpaces = await this.parkingSpaceService.getParkingSpaces().toPromise();
      this.showParkingSpaces();
    } catch (error) {
      console.error('Error loading parking spaces:', error);
    }
  }

  showParkingSpaces() {
    if (this.mapView) {
      this.parkingSpaces.forEach(space => {
        const marker = new Marker();
        marker.position = Position.positionFromLatLng(space.latitude, space.longitude);
        marker.title = space.status === 'available' ? 'Available' : 'Occupied';
        marker.color = space.status === 'available' ? 'green' : 'red';
        this.mapView.addMarker(marker);
      });
    }
  }

  markParkingSpaceAvailable() {
    if (this.userPosition) {
      this.parkingSpaceService.markSpaceAvailable(this.userPosition).subscribe(
        () => {
          console.log('Parking space marked as available');
          this.loadParkingSpaces();
        },
        error => console.error('Error marking parking space as available:', error)
      );
    }
  }

  markParkingSpaceOccupied() {
    if (this.userPosition) {
      this.parkingSpaceService.markSpaceOccupied(this.userPosition).subscribe(
        () => {
          console.log('Parking space marked as occupied');
          this.loadParkingSpaces();
        },
        error => console.error('Error marking parking space as occupied:', error)
      );
    }
  }
}