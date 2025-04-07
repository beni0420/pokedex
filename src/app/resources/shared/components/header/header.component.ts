import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import 'primeflex/primeflex.scss';
import { CardModule } from 'primeng/card';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule, ButtonModule, CardModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {}
