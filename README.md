# Resource Allocator

A small React + TypeScript tool for deciding who to staff on a project. Add
your team and your projects, and for each project it scores every team
member across four categories — **Skills**, **Growth fit**, **Capacity**,
and **Deadline** feasibility — each out of 10. The resource with the
highest overall score is flagged as the **Recommended** pick.

## How the scoring works

For a given project/task and team member:

- **Skills** — weighted match between the person's skill levels and the
  project's required skills (weighted by how important each skill is to
  the project).
- **Growth** — how well the project's "growth tags" (stretch
  opportunities) line up with the areas the person wants to develop.
  Neutral (5) if the project has no growth tags.
- **Capacity** — how much free bandwidth the person currently has, as a
  percentage of their total weekly capacity.
- **Deadline** — whether the person's free hours per week are enough to
  finish the estimated work before the deadline.

The overall score is the average of the four category scores (out of 10).
Team members are ranked highest to lowest for the selected project, and
the top one is marked **Recommended**. A person is flagged **"At risk of
missing deadline"** when their free capacity isn't enough to finish the
work in time, regardless of their overall score.

Data (team members and projects) is kept in the browser's local storage,
so it persists across reloads without a backend.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. Use the **Team** and **Projects** tabs to
add your own people and work, and the **Allocation** tab to see ranked
recommendations per project.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build
- `npm run lint` — lint the source
