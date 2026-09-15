import type { ProjectTask, Resource } from '../types'

// Pulled from Brandesign Studio's Asana workspace on 2026-09-15: near-term
// (through ~2026-09-30) work for 7 team members. Skill levels are inferred
// placeholders from task-title patterns (all defaulted around 6/10) since
// Asana has no skills data — correct them in the Team tab.

export const seedResources: Resource[] = [
  {
    id: 'r1',
    name: 'Jennifer Rocha',
    role: 'Designer',
    skills: [
      { name: 'Brand Identity', level: 6 },
      { name: 'Social Media Design', level: 6 },
      { name: 'Print Design', level: 6 },
      { name: 'Presentation Design', level: 6 },
    ],
    growthAreas: [],
    capacityHoursPerWeek: 40,
    allocatedHoursPerWeek: 30,
    color: '#aa3bff',
  },
  {
    id: 'r2',
    name: 'Jack Stead',
    role: 'Designer',
    skills: [
      { name: 'Brand Identity', level: 6 },
      { name: 'Print Design', level: 6 },
      { name: 'Art Direction', level: 6 },
    ],
    growthAreas: [],
    capacityHoursPerWeek: 40,
    allocatedHoursPerWeek: 39,
    color: '#2dd4bf',
  },
  {
    id: 'r3',
    name: 'Matthew Rossouw',
    role: 'Designer',
    skills: [
      { name: 'Web Design', level: 6 },
      { name: 'Brand Identity', level: 6 },
      { name: 'Art Direction', level: 6 },
    ],
    growthAreas: [],
    capacityHoursPerWeek: 40,
    allocatedHoursPerWeek: 38,
    color: '#f59e0b',
  },
  {
    id: 'r4',
    name: 'Dylan Jepthas',
    role: 'Designer',
    skills: [
      { name: 'Brand Identity', level: 6 },
      { name: 'Web Design', level: 6 },
      { name: 'Print Design', level: 6 },
      { name: 'Social Media Design', level: 6 },
    ],
    growthAreas: [],
    capacityHoursPerWeek: 40,
    allocatedHoursPerWeek: 40,
    color: '#60a5fa',
  },
  {
    id: 'r5',
    name: 'Usama Gierdien',
    role: 'Web Developer',
    skills: [
      { name: 'Web Development', level: 7 },
      { name: 'SEO', level: 6 },
      { name: 'WordPress', level: 6 },
    ],
    growthAreas: [],
    capacityHoursPerWeek: 40,
    allocatedHoursPerWeek: 40,
    color: '#f472b6',
  },
  {
    id: 'r6',
    name: 'Chloe Smith',
    role: 'Web Developer / SEO Specialist',
    skills: [
      { name: 'SEO', level: 7 },
      { name: 'Web Development', level: 6 },
      { name: 'WordPress', level: 6 },
    ],
    growthAreas: [],
    capacityHoursPerWeek: 40,
    allocatedHoursPerWeek: 40,
    color: '#84cc16',
  },
  {
    id: 'r7',
    name: 'TK',
    role: 'Web Developer',
    skills: [
      { name: 'Web Development', level: 6 },
      { name: 'SEO', level: 6 },
      { name: 'WordPress', level: 6 },
    ],
    growthAreas: [],
    capacityHoursPerWeek: 40,
    allocatedHoursPerWeek: 35,
    color: '#fb7185',
  },
]

export const seedTasks: ProjectTask[] = [
  {
    id: 't1',
    name: '165739 Spear Interim Results Presentation 2026',
    client: 'Spear REIT',
    requiredSkills: [
      { name: 'Presentation Design', importance: 9 },
      { name: 'Brand Identity', importance: 5 },
    ],
    growthTags: [],
    estimatedHours: 12,
    deadline: '2026-09-18',
  },
  {
    id: 't2',
    name: '165491 FBC Brand Guide Update',
    client: 'FBC',
    requiredSkills: [
      { name: 'Brand Identity', importance: 9 },
      { name: 'Print Design', importance: 7 },
      { name: 'Art Direction', importance: 6 },
    ],
    growthTags: [],
    estimatedHours: 24,
    deadline: '2026-09-24',
  },
  {
    id: 't3',
    name: '7849 Jacana Group Website Refresh',
    client: 'Jacana Group',
    requiredSkills: [
      { name: 'Web Design', importance: 9 },
      { name: 'Art Direction', importance: 6 },
    ],
    growthTags: [],
    estimatedHours: 24,
    deadline: '2026-09-22',
  },
  {
    id: 't4',
    name: 'Real Beds - October Birthday Campaign',
    client: 'Real Beds',
    requiredSkills: [
      { name: 'Social Media Design', importance: 8 },
      { name: 'Brand Identity', importance: 6 },
      { name: 'Print Design', importance: 5 },
    ],
    growthTags: [],
    estimatedHours: 24,
    deadline: '2026-09-23',
  },
  {
    id: 't5',
    name: 'Sweet Valley - New Website Coding',
    client: 'Sweet Valley',
    requiredSkills: [
      { name: 'Web Development', importance: 9 },
      { name: 'WordPress', importance: 6 },
    ],
    growthTags: [],
    estimatedHours: 24,
    deadline: '2026-09-30',
  },
  {
    id: 't6',
    name: '165336 AFRICALLI Website - Coding',
    client: 'AFRICALLI',
    requiredSkills: [
      { name: 'Web Development', importance: 8 },
      { name: 'WordPress', importance: 6 },
    ],
    growthTags: [],
    estimatedHours: 20,
    deadline: '2026-09-18',
  },
  {
    id: 't7',
    name: '7279 CAN Website - Coding',
    client: 'CAN',
    requiredSkills: [
      { name: 'Web Development', importance: 8 },
      { name: 'WordPress', importance: 6 },
    ],
    growthTags: [],
    estimatedHours: 16,
    deadline: '2026-09-17',
  },
]
