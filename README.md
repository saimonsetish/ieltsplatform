# IELTS Hub (prototype)

Front-end demo of an IELTS practice platform. Data is saved in the browser (localStorage).

## Run
Open the folder in VS Code, install the Live Server extension, right-click `index.html` > Open with Live Server.

## Files
- `index.html`: page shell, loads everything below in order
- `css/styles.css`: all styles
- `js/state.js`: saved data (XP, attempts) and UI state
- `js/data.js`: test content (passage, audio script, questions, tips, IELTS criteria)
- `js/logic.js`: scoring, band conversion, XP, streaks, drills, grading
- `js/ui-student.js`: Dashboard, Mock tests, Profile and test results
- `js/practice.js`: daily set, topic practice, mistake review
- `js/lessons.js`: course, calendar, lesson page, homework, profile
- `js/guide.js`: IELTS format guide for beginners
- `js/ux.js`: onboarding, daily plan, timed test room, progress
- `js/ui-tutor.js`: review queue, grading, CRM
- `js/app.js`: screen router, runs the app

## Next
Move to Next.js + Supabase (accounts, shared database, tutor and student on different devices).
