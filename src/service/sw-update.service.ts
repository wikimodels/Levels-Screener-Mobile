import { Injectable, NgZone } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class SwUpdateService {
  constructor(private swUpdate: SwUpdate, private ngZone: NgZone) {}

  init() {
    // Check if service workers are enabled
    if (!this.swUpdate.isEnabled) {
      console.log('Service workers are not enabled.');
      return;
    }

    // Listen for updates
    this.swUpdate.available.subscribe((event) => {
      console.log('New version available:', event);
      // Log the current and available versions
      console.log('Current version:', event.current);
      console.log('Available version:', event.available);
      // Prompt the user to reload with a timeout fallback
      const timeout = setTimeout(() => {
        if (confirm('A new version is available. Reload now?')) {
          this.activateUpdate();
        } else {
          this.activateUpdate(); // Force reload after timeout
        }
      }, 10000); // 10 seconds

      // Clear the timeout if the user reloads manually
      window.addEventListener('beforeunload', () => clearTimeout(timeout));
    });

    // Log when the update is activated
    this.swUpdate.activated.subscribe((event) => {
      console.log('New version activated:', event);
    });
  }

  activateUpdate() {
    // Activate the update and reload the page
    this.ngZone.runOutsideAngular(() => {
      window.location.reload();
    });
  }
}
