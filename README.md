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
- `js/ui-student.js`: Dashboard, Mock tests, Profile, test results and My work feedback
- `js/practice.js`: daily set, topic practice, mistake review
- `js/lessons.js`: course, calendar, lesson page, homework, profile
- `js/guide.js`: IELTS format guide for beginners
- `js/ux.js`: onboarding, daily plan, timed test room, progress
- `js/ui-tutor.js`: review queue, learner overview, rubric grading and revision requests
- `js/app.js`: screen router, runs the app

## Learner and tutor workflow

See [PRODUCT_FLOW.md](PRODUCT_FLOW.md) for the core submission, review, feedback and revision flow. The prototype demonstrates these roles in one browser using local storage. It does not provide separate accounts, cross-device sharing, or production privacy controls.

## Next
Move to Next.js + Supabase (accounts, shared database, tutor and student on different devices).
