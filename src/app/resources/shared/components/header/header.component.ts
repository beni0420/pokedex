import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule, RouterLink, IconFieldModule, InputIcon],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {}
