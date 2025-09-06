
<img width="1440" height="745" alt="Screen Shot 2025-09-06 at 10 10 15 AM" src="https://github.com/user-attachments/assets/f6897c8b-227b-4f92-9b35-586084f351f5" />

## Clinical Trials Research Tool

- A simple web application that helps Sarah (and other users) search, filter, and explore clinical trials for competitive research.
- This project provides a dashboard-style UI with:

- Search by trial title or sponsor
- Filtering by recruitment status
- Sortable table columns (NCT ID, Title, Status, Sponsor, Start Date)
- Pagination with page info
- Clean, responsive UI with Tailwind CSS

## Features
### Search
 - Type a keyword (title, sponsor, or keyword match) into the search bar.
 - Press Enter to trigger search.
 - Results update automatically with pagination reset to page 1.

### Filters
- Dropdown to filter by trial recruitment status:
- Recruiting
- Completed
- Active, not recruiting
- Not yet recruiting
- All (default)

### Table
- Results displayed in a responsive table.
- Columns: NCT ID, Title, Status, Sponsor, Start Date.
- Long text (title/sponsor) is truncated with a tooltip for readability.
- Click on column headers to sort ascending/descending.
- Status badges with clear color coding:
    - Recruiting
    - Completed
    - Active, not recruiting
    - Not yet recruiting

### Pagination
- Shows current page and total pages.
- "Previous" and "Next" buttons with disabled states.

### UI / UX Enhancements
- Tailwind CSS used for modern styling.
- Clean empty state when no trials match search.
- Loading spinner when fetching data.
- Error handling with friendly message if API fails.

### Project Structure 
```bash
/app
  /api
    trials/route.ts   → API endpoint with filtering, sorting, pagination
  /dashboard
    page.tsx          → React client-side dashboard UI
/lib
  mockTrials.ts       → Mock trial data in ClinicalTrials.gov format

```
## Getting Started

First, run the development server:

```bash
git clone git@github.com:sharmishthavirgo/Clinical-trials.git
cd Clinical-trials
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000/dashbaord](http://localhost:3000/dashbaord) with your browser to see the result.

### API Endpoint
- GET /api/trials
- Supports query params:
    - page (number)
    - limit (number)
    - search (string)
    - status (string)
    - sort_by (nctId, title, status, sponsor, startDate)
    - sort_direction (asc | desc)
- Example 
```bash
    /api/trials?page=1&limit=10&search=heart&status=Recruiting&sort_by=startDate&sort_direction=asc
```
