import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router'; // Import Router

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'projekt';

  constructor(private router: Router) {} // Inject Router

  ngOnInit() {
    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
