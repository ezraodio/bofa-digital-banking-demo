import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserProfile } from '../../models/account.model';

export interface NavItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
  children?: NavItem[];
}

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.scss'],
})
export class NavSidebarComponent {
  @Input() user: UserProfile | null = null;
  @Input() collapsed = false;

  @Output() navigate = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();
  @Output() toggleCollapse = new EventEmitter<void>();

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Accounts', icon: 'account_balance', route: '/accounts', badge: 3 },
    { label: 'Transfers', icon: 'swap_horiz', route: '/transfers' },
    { label: 'Bill Pay', icon: 'receipt', route: '/bill-pay' },
    { label: 'Investments', icon: 'trending_up', route: '/investments' },
    { label: 'Retirement', icon: 'beach_access', route: '/retirement' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
  ];

  get userInitials(): string {
    if (!this.user) return '?';
    return `${this.user.firstName.charAt(0)}${this.user.lastName.charAt(0)}`;
  }

  get userFullName(): string {
    if (!this.user) return 'Guest';
    return `${this.user.firstName} ${this.user.lastName}`;
  }

  onNavigate(route: string): void {
    this.navigate.emit(route);
  }

  onLogout(): void {
    this.logout.emit();
  }

  onToggleCollapse(): void {
    this.toggleCollapse.emit();
  }
}
