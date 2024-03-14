import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListComponent } from '@nexanode/optimalist-frontend-services-feature';

@Component({
  selector: 'optimalist-optimalist-frontend-landing-feature',
  standalone: true,
  imports: [ListComponent],
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
      icon: 'assets/data-architecture.svg',
    },
    {
      title: 'Data Modelling',
      description:
        'Designing structured data models that facilitate in-depth analysis and insights.',
      icon: 'assets/data-modelling.svg',
    },
    {
      title: 'ETL/ELT',
      description:
        'Efficiently extracting, transforming, and loading data for optimized warehousing.',
      icon: 'assets/elt.svg',
    },
    {
      title: 'Data Governance',
      description:
        'Implementing frameworks to ensure data quality, security, and compliance.',
      icon: 'assets/data-governance.svg',
    },
    {
      title: 'Data Engineering',
      description:
        'Building robust data pipelines for seamless data flow and integration.',
      icon: 'assets/data-engineering.svg',
    },
    {
      title: 'Data Science',
      description:
        'Applying advanced analytics and machine learning to extract actionable insights.',
      icon: 'assets/data-science.svg',
    },
  ];
}
