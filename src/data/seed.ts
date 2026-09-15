import type { ProjectTask, Resource } from '../types'

function daysFromNow(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export const seedResources: Resource[] = [
  {
    id: 'r1',
    name: 'Maya Chen',
    role: 'Senior Brand Designer',
    skills: [
      { name: 'Brand Identity', level: 9 },
      { name: 'Typography', level: 8 },
      { name: 'Illustration', level: 6 },
      { name: 'Figma', level: 9 },
    ],
    growthAreas: ['Motion Design', 'Art Direction'],
    capacityHoursPerWeek: 32,
    allocatedHoursPerWeek: 18,
    color: '#aa3bff',
  },
  {
    id: 'r2',
    name: 'Jordan Reyes',
    role: 'Motion Designer',
    skills: [
      { name: 'Motion Design', level: 9 },
      { name: 'Illustration', level: 7 },
      { name: 'Video Editing', level: 8 },
      { name: 'Figma', level: 5 },
    ],
    growthAreas: ['Brand Identity', '3D'],
    capacityHoursPerWeek: 30,
    allocatedHoursPerWeek: 26,
    color: '#2dd4bf',
  },
  {
    id: 'r3',
    name: 'Priya Nair',
    role: 'Brand Strategist',
    skills: [
      { name: 'Brand Strategy', level: 9 },
      { name: 'Copywriting', level: 7 },
      { name: 'Market Research', level: 8 },
      { name: 'Brand Identity', level: 5 },
    ],
    growthAreas: ['Art Direction', 'Typography'],
    capacityHoursPerWeek: 35,
    allocatedHoursPerWeek: 10,
    color: '#f59e0b',
  },
  {
    id: 'r4',
    name: 'Sam Okafor',
    role: 'Junior Designer',
    skills: [
      { name: 'Figma', level: 7 },
      { name: 'Typography', level: 5 },
      { name: 'Illustration', level: 6 },
      { name: 'Brand Identity', level: 3 },
    ],
    growthAreas: ['Brand Identity', 'Art Direction'],
    capacityHoursPerWeek: 35,
    allocatedHoursPerWeek: 8,
    color: '#60a5fa',
  },
]

export const seedTasks: ProjectTask[] = [
  {
    id: 't1',
    name: 'Aster Cafe Rebrand',
    client: 'Aster Cafe',
    requiredSkills: [
      { name: 'Brand Identity', importance: 10 },
      { name: 'Typography', importance: 7 },
      { name: 'Figma', importance: 5 },
    ],
    growthTags: ['Art Direction'],
    estimatedHours: 40,
    deadline: daysFromNow(21),
  },
  {
    id: 't2',
    name: 'Nimbus App Launch Video',
    client: 'Nimbus',
    requiredSkills: [
      { name: 'Motion Design', importance: 9 },
      { name: 'Video Editing', importance: 6 },
    ],
    growthTags: ['3D'],
    estimatedHours: 24,
    deadline: daysFromNow(10),
  },
  {
    id: 't3',
    name: 'Solstice Positioning Workshop',
    client: 'Solstice Goods',
    requiredSkills: [
      { name: 'Brand Strategy', importance: 10 },
      { name: 'Market Research', importance: 6 },
      { name: 'Copywriting', importance: 4 },
    ],
    growthTags: [],
    estimatedHours: 16,
    deadline: daysFromNow(14),
  },
]
