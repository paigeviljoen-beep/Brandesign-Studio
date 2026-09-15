export interface Skill {
  name: string
  level: number // 0-10 proficiency
}

export interface Resource {
  id: string
  name: string
  role: string
  skills: Skill[]
  growthAreas: string[] // skills/areas this person wants to develop
  capacityHoursPerWeek: number // total working hours available per week
  allocatedHoursPerWeek: number // hours already committed to other work
  color: string
}

export interface RequiredSkill {
  name: string
  importance: number // 1-10, how critical this skill is to the task
}

export interface ProjectTask {
  id: string
  name: string
  client: string
  requiredSkills: RequiredSkill[]
  growthTags: string[] // areas this task offers growth/stretch opportunity in
  estimatedHours: number // total hours of work required
  deadline: string // ISO date
}

export interface CategoryScore {
  skills: number
  growth: number
  capacity: number
  deadline: number
}

export type CategoryWeights = CategoryScore

export const DEFAULT_WEIGHTS: CategoryWeights = {
  skills: 5,
  capacity: 4,
  deadline: 2,
  growth: 1,
}

export interface ResourceScore {
  resource: Resource
  scores: CategoryScore
  total: number // average of the 4 categories, out of 10
  freeHoursPerWeek: number
  weeksUntilDeadline: number
  requiredWeeks: number
  feasible: boolean
}
