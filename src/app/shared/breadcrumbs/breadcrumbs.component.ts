import { Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';

export interface MenuItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'breadcrumbs',
  standalone: true,
  imports: [MatTooltipModule, RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
})
export class BreadcrumbsComponent {
  @Input() menuItems: MenuItem[] = [];
}
