# 💡 EMPA Form Challenge

## 💬 Description

This project addresses a front-end challenge focused on creating an efficient event form. The primary goal is to design and implement a form using Material UI components and react-hook-form to capture event details while ensuring a seamless display of the collected information.

## Challenge Requirements

- 🏗️ **Project Setup:**  

    The project is set up using Next.js, a widely recognized React framework.

- ☑️ **Form Components:**

    The form includes fields for Event Description, Type of Event, Event Date (featuring a date-time picker), and yearly recurrence (using checkboxes).

- 📝 **Form Submission:** 
    
    Upon submission, the entered data is saved into a state (an array object), and the event details are instantly displayed below the form.

- 📦 **Technologies:**

    Material UI is employed for styling, while react-hook-form is used for form handling.

## 👩‍💻 Functionality

- Users can provide event details via the form.
- Submitted data is instantly visible.
- The form resets to enable the smooth addition of more events.

## 💻 Code Overview

The project comprises two primary components: `EventForm` and `Index`.

- `EventForm`: This component manages form rendering, submission handling, and data display.

- `Index`: The application's main page, which maintains a list of events.


## 🛠️ Fixes and Future Improvements

- Ensuring that both Yearly Repetition checkboxes are automatically deselected after form submission.

- Enhancing the clock visualization within the date-time picker.



