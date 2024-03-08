import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'optimalist-optimalist-frontend-landing-feature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './optimalist-frontend-landing-feature.component.html',
  styleUrl: './optimalist-frontend-landing-feature.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptimalistFrontendLandingFeatureComponent {
  services = [
    {
      title: 'Data Architecture and Strategy',
      description:
        'Crafting the blueprint for your data landscape to align with business objectives.',
    },
    {
      title: 'Data Modelling',
      description:
        'Designing structured data models that facilitate in-depth analysis and insights.',
    },
    {
      title: 'ETL/ELT',
      description:
        'Efficiently extracting, transforming, and loading data for optimized warehousing.',
    },
    {
      title: 'Data Governance',
      description:
        'Implementing frameworks to ensure data quality, security, and compliance.',
    },
    {
      title: 'Data Engineering',
      description:
        'Building robust data pipelines for seamless data flow and integration.',
    },
    {
      title: 'Data Science',
      description:
        'Applying advanced analytics and machine learning to extract actionable insights.',
    },
  ];
}
