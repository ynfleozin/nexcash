import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  readonly productPoints = [
    'Corporate Expenses',
    'User Portal',
    'Manager Dashboard',
  ];

  readonly productSnapshot = [
    {
      title: 'Total Volume',
      note: 'Track the full expense flow.',
    },
    {
      title: 'Approved',
      note: 'Keep the review status visible.',
    },
    {
      title: 'Pending Review',
      note: 'Follow the approval queue.',
    },
  ];
}
