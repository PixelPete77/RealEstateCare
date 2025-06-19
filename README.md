# RealEstateCare

This project is developed using [Vue.js](https://vuejs.org/), as part of the final assignment of the module 'Front-end frameworks' from the course 'HBO-programma Front-end developer' by LOI.

I enjoyed working on this project a lot. Especially the fact that you start working on what will be the final assignment from the start of the module.

## Users

To be able to log in to the application, a few fictional 'inspectors' have been added:

- Inspector 1  
    Username: inspector1@realestatecare.com  
    Password: Inspector1  
- Inspector 2  
    Username: inspector2@realestatecare.com  
    Password: Inspector2
- Inspector 3  
    Username: inspector3@realestatecare.com  
    Password: Inspector3

The security code for all three users is: 123456.


## Security, usability and accessibility

A router guard has been implemented to check if a user is allowed to access certain pages. When they are not authenticated, they will be redirected to the login page.
I tried to emulate a token based authentication system. No user data is stored in localStorage, only a token (stored for 14 days). This token is then used to remember the user when they use the application again.
We are using a mock database, which contains unhashed passwords. This is not secure at all, but only contains fake users and data. This is only used for demonstration purposes.

The application is responsive, and useable on all devices. 
Important: due to using a mock database changes are not saved. When reloading the application, all data will revert back to their original values.

ToDo: how the application adheres to Jakob Nielsen's heuristics.

ToDo: accessibility in more detail
- Logo has invisible text.
- Not used Ionic's implementation of theming: instead of choosing light or dark, the application looks at system setting.  
Theme setting is saved to local storage, for future visits.
- Ionic form elements used, keyboard can be used to interact with the entire app.
- Loading animation doesn't run if user prefers reduced motion. Page transitions still animate, they could potentially be removed since they don't add much.
- I did not test the app with a screen reader.



## ToDo

There is a pretty big bug I haven't been able to fix yet: when making a change to an inspection, and the navigating to another inspection, the wrong data is displayed.

Besides this, there are a few things I haven't gotten around to, or could be improved:
- The user should be able to complete an inspection. This could be done by adding the current date (in the correct format) to the inspection data.
- An option should be added to also delete an inspection item that was added.
- When a user makes changes to an inspection and leaves the page without saving, we could show a warning that there are unsaved changes.
- The user can't add photos to an inspection yet. I was looking at the [Capacitor Camera API](https://ionicframework.com/docs/vue/your-first-app/taking-photos) from the Ionic framework, but didn't have time to implement it.
- A user should be able to change their password.
- The Knowledge base is a bit simple. The styling could be improved. Also, I wanted to display the filesize. Due to time limitations this page did not get as much attention.


---

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).


## Project Setup

```sh
npm  install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
