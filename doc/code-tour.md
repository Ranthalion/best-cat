# Code Tour

- We have the normal boilerplate for an Angular app.
- The app folder has files for the template and app component.
  - The component has some housekeeping variables
  - On load, it sets the title of the page, loads 2 cat pictures, and gets the current vote count.
  - Loading cats calls an api service to get the images and handles errors
  - Loading the vote count is very similar
  - Submitting a vote makes sure the data is valid, then calls the api service to process the vote, and finally gets a new set of images and updated vote count.  
  - Overall, a very simple component
- The template is similarly simple.
  - We've got a header and the main content that displays once loading is complete.
  - The form is straightforward, with a couple of radio buttons, a validation message, a submit button, the vote count, and a spot to show an error message.
- The api service just makes a few api calls.  One to an external api, and a couple to a local api.
- We have 2 environment files, development and production.  We define the api endpoints here.

[Next Page: Add Mock Service Worker](implementation-steps.md)