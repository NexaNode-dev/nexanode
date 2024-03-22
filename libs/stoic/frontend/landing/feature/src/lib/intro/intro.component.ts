import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'stoic-intro',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent {
  introductionText = `Het Stoïcisme, een filosofische stroming die ontstond in het oude Griekenland, biedt ons krachtige tools voor persoonlijke groei en veerkracht. Deze filosofie leert ons hoe we een deugdzaam leven kunnen leiden door ons te richten op wat binnen onze controle ligt en hoe we ons kunnen bevrijden van onnodige zorgen en emoties. In onze hedendaagse wereld, vol uitdagingen en onzekerheden, biedt het Stoïcisme praktische wijsheden die ons helpen bij het navigeren door het leven, het verbeteren van onze relaties, en het cultiveren van innerlijke rust en tevredenheid.`;
}
