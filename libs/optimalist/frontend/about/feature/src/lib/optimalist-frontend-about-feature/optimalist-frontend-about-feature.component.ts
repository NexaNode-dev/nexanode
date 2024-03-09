import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  bootstrapEnvelopeAt,
  bootstrapGithub,
  bootstrapLinkedin,
  bootstrapTwitterX,
} from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'optimalist-optimalist-frontend-about-feature',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './optimalist-frontend-about-feature.component.html',
  styleUrl: './optimalist-frontend-about-feature.component.css',
  viewProviders: [
    provideIcons({
      bootstrapLinkedin,
      bootstrapGithub,
      bootstrapTwitterX,
      bootstrapEnvelopeAt,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptimalistFrontendAboutFeatureComponent {
  sections = [
    {
      title: 'Empowering Data Architecture & Strategy',
      description: `Johan Vrolix, a seasoned data architect, brings over 19 years of
      experience to the forefront of data warehousing and architecture.
      With a career spanning small businesses to large enterprises,
      Johan's expertise encompasses a wide range of implementations. He
      excels in transforming complex data challenges into streamlined,
      efficient solutions, driving strategic decision-making and
      operational efficiency across industries.`,
    },
    {
      title: 'Expertise Across the Spectrum',
      description: `From data modeling and ETL/ELT development to advanced data
      governance and engineering, Johan's skill set is both broad and
      deep. His proficiency with leading data platforms and modeling
      techniques is matched by his knowledge of programming, scripting,
      and automation tools. A proponent of Agile and Scrum
      methodologies, Johan ensures projects are delivered with precision
      and agility.`,
    },
    {
      title: 'A Record of Excellence',
      description: `Johan's career is a testament to his ability to lead technical
      projects, manage stakeholders, and deliver value. His technical
      prowess is underpinned by certifications and a solid educational
      foundation, positioning him as a valuable asset to any data-driven
      initiative.`,
    },
    {
      title: 'Contact',
      description: `For consultancy inquiries or to learn more about how Johan can
      elevate your data infrastructure, contact johan@optimalist.me.`,
    },
  ];

  socialLinks = [
    {
      name: 'Email',
      url: 'mailto:johan@optimalist.me',
      icon: 'bootstrapEnvelopeAt',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/johanvrolix/',
      icon: 'bootstrapLinkedin',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/vrxj81',
      icon: 'bootstrapGithub',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/vrxj81',
      icon: 'bootstrapTwitterX',
    },
  ];
}
