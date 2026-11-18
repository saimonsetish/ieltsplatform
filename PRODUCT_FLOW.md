# IELTS Hub: learner and tutor workflow

## Product promise

Help a learner always know what to do next, and help a tutor quickly see what needs attention and give feedback the learner can act on.

## Core loop

1. The learner opens **Practice** to choose a Writing or Speaking task, or opens **My work** to check earlier submissions and feedback.
2. The learner writes a response; it autosaves in this browser as a draft until submission.
3. The tutor sees the submission in **Review queue**, with the learner, skill, submission time, and current status.
4. The tutor opens the work, reads or listens to the response, scores the relevant IELTS criteria, and writes feedback.
5. The tutor either sends the feedback or requests a revision with a clear reason.
6. The learner sees the result and next step in **My work**. A requested revision can be edited and resubmitted; the previous attempt remains in the history.

## Submission states

| State | Learner sees | Tutor sees | Available action |
|---|---|---|---|
| Draft | Work in progress | Not in queue | Continue or submit |
| Submitted | Waiting for review | New item in queue | Tutor starts review |
| In review | Tutor is reviewing | Draftable review form | Save draft or continue |
| Revision requested | Tutor feedback and requested changes | Awaiting learner | Learner edits and resubmits |
| Reviewed | Scores and feedback | Completed item/history | Learner reviews feedback |

## Tutor review rules

- Show only skills the learner actually submitted.
- Keep scores in the IELTS 0–9 range at 0.5 increments and validate them before saving.
- Save review input as a draft while the tutor works.
- Do not mark a submission reviewed until its required scores are valid and the tutor explicitly sends feedback.
- A revision request must include actionable feedback.
- Keep earlier attempts and reviews visible after resubmission.

## Learner view rules

- Use plain-language status labels and make the next action explicit.
- Keep submitted work, tutor feedback, and revision history together.
- Distinguish a tutor's rubric scores from an official IELTS result; this prototype is practice feedback.
- Keep the learner's next action short and visible: continue, wait, read feedback, or revise.

## Prototype scope and production boundary

This browser-only prototype simulates the workflow using one browser's local storage. Learner and tutor views therefore share the same demo data in that browser. Learner responses and tutor scoring/comments autosave locally. Speaking is still represented as typed text. Separate accounts, cross-device synchronization, private access, notifications, and real audio uploads require a backend and are not represented as production features here.

## Validate before expanding

Test the workflow with learners and tutors. Ask a learner to submit a response, switch to the tutor role and review it, request a revision, then return to the learner role and resubmit. Observe whether each person understands the status and next action without coaching. Adjust the flow before adding secondary features such as a larger CRM, automated recommendations, or complex reporting.
