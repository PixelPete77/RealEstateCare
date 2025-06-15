# RealEstateCare

This project is developed using [Vue.js](https://vuejs.org/), as part of the final assignment of the module 'Front-end frameworks' from the course 'HBO-programma Front-end developer' by LOI.

I enjoyed working on this project a lot. Especially the fact that you start working on what will be the final assignment from the start of the module.

## Security, usability and accessibility

A router guard has been implemented to check if a user is allowed to access certain pages. When they are not authenticated, they will be redirected to the login page.
I tried to emulate a token based authentication system. No user data is stored in localStorage, only a token (stored for 14 days). This token is then used to remember the user when they use the application again.
We are using a mock database, which contains unhashed passwords. This is not secure at all, but only contains fake users and data. This is only used for demonstration purposes.


## ToDo

There are a few things I haven't gotten around to, or could be improved:
- Sometimes the inspection page doesn't load properly after clicking on an inspection in either the scheduled- or completed inspections page. No errors are thrown and it does load after refreshing the page.
- When a user makes changes to an inspection and leaves the page, we could show a warning that there are unsaved changes.
- The user can't add photos to an inspection yet. I was looking at the [Capacitor Camera API](https://ionicframework.com/docs/vue/your-first-app/taking-photos) from the Ionic framework, but didn't have time to implement it.
- A user should be able to change their password.


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
