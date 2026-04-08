# PinDate

PinDate is a wall-calendar inspired planning web application that combines a visual monthly calendar, color-coded notes, pinned reminders, popup note previews, and smooth page-turn month navigation into one interactive experience.

## Overview

PinDate is designed to feel more engaging than a traditional digital calendar by combining a hanging wall-calendar aesthetic with modern note management and smooth UI interactions.

It allows users to:
- View and navigate monthly calendars
- Add notes to a single date or date range
- Organize notes using different colors
- See multiple note colors on the same date
- Preview notes in popups without needing to scroll
- Move between months with a smooth page-turn effect

## Features

- Wall-calendar inspired UI
- Hanging calendar design with month image banner
- Color-coded notes for better visual organization
- Multiple note colors visible on the same date
- Popup note editor for quick note creation and editing
- Instant note preview popup after saving
- Smooth previous/next month navigation
- Page-turn transition effect between months
- Pinned notes side panel for persistent visibility
- Date and date-range note support
- Responsive and interactive design

## Problem Statement

Traditional calendar apps are often functional but visually plain, and many separate note management from calendar interaction in a way that feels disconnected.

PinDate solves this by creating a more visual and tactile planning experience where notes, reminders, and monthly navigation all feel connected inside a wall-calendar style interface.

## How It Works

### 1. Open a month
Users enter a calendar view that displays the month, year, image banner, and all dates in a wall-calendar format.

### 2. Select a date or date range
Users can click one date or choose a date range to create a note.

### 3. Add a note
A popup note editor opens, allowing the user to enter:
- Title
- Description
- Color
- Start date
- End date

### 4. View notes instantly
Once a note is saved, it can appear in a popup preview so the user does not need to scroll to the notes panel.

### 5. Identify notes by color
If multiple notes of different colors exist on the same date, the day cell shows all the relevant color indicators.

### 6. Navigate smoothly
Users can move to the previous or next month directly from the calendar view using a smooth animated page-turn transition.

## UI Highlights

- Hanging wall-calendar appearance
- Month cover image for a more visual experience
- Smooth animations using Framer Motion
- Clean and interactive note editor popup
- Side panel styled like pinned reminder cards
- Color dots/markers directly visible on date cells

## Tech Stack

- React
- TypeScript
- Framer Motion
- Lucide React
- Tailwind CSS

## Project Structure

```text
src/
├── components/
│   ├── workspace/
│   │   ├── SceneContainer.tsx
│   │   ├── WallCalendar.tsx
│   │   ├── SidePanel.tsx
│   │   ├── CalendarView.tsx
│   │   ├── CalendarGrid.tsx
│   │   ├── DayCell.tsx
│   │   ├── NoteEditor.tsx
│   │   └── NotesList.tsx
├── hooks/
│   └── useNotes.ts
├── lib/
│   ├── monthImages.ts
│   └── types.ts
└── pages/
    └── Index.tsx
```

## Main Components

### `CalendarView.tsx`
Handles the monthly calendar screen, navigation between months, month image display, note popups, and integration of the grid and notes panel.

### `CalendarGrid.tsx`
Builds the monthly calendar structure and sends date-based note data into each day cell.

### `DayCell.tsx`
Displays each day in the calendar and shows note color indicators when notes exist for that date.

### `NoteEditor.tsx`
Provides a popup-based form for creating and editing notes.

### `NotesList.tsx`
Displays active and completed notes in the side panel.

### `SceneContainer.tsx`
Creates the scene atmosphere and motion/parallax-based visual effects for the app.

### `SidePanel.tsx`
Shows the notes in a pinned-card style layout beside the main calendar.

## Installation

```bash
git clone https://github.com/Veedushi2101/PinDate-Calendar-Application.git
cd pindate
npm install
npm run dev
```

## Usage

1. Open the project in the browser
2. Select a date or date range
3. Click **Add Note**
4. Enter note details
5. Choose a note color
6. Save the note
7. View the note instantly in popup preview or from the notes side panel
8. Navigate to other months using the previous/next controls

## Use Cases

- Personal planning
- Academic deadline management
- Project scheduling
- Event reminders
- Color-based task categorization
- Monthly visual planning

## Why This Project Stands Out

PinDate is more than a basic calendar app. It combines productivity with a visually distinctive and interactive experience.

What makes it stand out:
- A wall-calendar inspired design instead of a plain grid
- Smooth page-turn month transitions
- Note popups that reduce unnecessary scrolling
- Multiple note colors visible on the same date
- A pinned reminder board style side panel
- A more tactile and engaging way to manage schedules

## Future Improvements

- Recurring notes and reminders
- Drag-and-drop note interactions
- User authentication
- Cloud sync
- Export and sharing options
- Search and filter by note color
- Mobile gesture-based page flipping
- Reminder notifications

## Author

Developed as a visually interactive wall-calendar planning application focused on note management, smooth navigation, and engaging UI/UX.