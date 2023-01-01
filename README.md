# Finalcheck

Two Githubs:

  Client: 
   > https://github.com/minniexp/packglist-client
  
  Server: 
   > https://github.com/minniexp/packinglist-server

## Description:

This website is to create and share personal packing list for different events, location, and occasions.

### HOW TO USE

1. Click on the list or search for the desired list
   Please note that in order to create new list, user needs to create a new category and task as well to fully upload to database.

2. Add, edit, or delete category and items

3. Click on the select item to toggle checkmark.

### Technology

This App uses React v18.0. Node, Express, and PostgresQL.

### Possible Improvements:

- Incorporate user account options to personalize the packing list (MyFavorites, Save checked items, etc.)
- Additional CSS upgrades - strike item text for completed items
- List to include icons or image that reflect the title

### Setup:

To run this project, install it locally using npm:

```
$ cd ../breakeven-client
$ npm install
$ npm start
```

```
$ cd ../breakeven-server
$ npm install express pg cors
$ npm install nodemon -D
$ npm run dev
```


### Acknowledgments:

- https://www.basefactor.com/react-how-to-display-a-loading-indicator-on-fetch-calls
