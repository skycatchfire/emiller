# emiller
A customizable responsive popup to encourage Mailchimp subscriptions. The modal will fade in 5 seconds after the page loads.

[View the demo](https://skycatchfire.github.io/emiller/demo/demo.html)

## Modifying 
- Download this repo as zip, open the demo.html file in the demo folder and go nuts.
- All the contents of this folder and jQuery are required.
- Make sure you set a destination url for the button. (line 27)
- Change offer and content but be sure to make the same changes for screen readers. These elements will have the class="sr-only".

*Cookies will not work through a file://*

## Clearing cookies
The pop up will store a cookie based on the users response.

You may need to clear your cookies when making edits to view the modal.

## Develop

1. Clone this repo

```
  $ git clone https://github.com/skycatchfire/emiller emiller
```

2. Change directories

```
  $ cd emiller
```

3. Install npm packages

```
  $ npm install
```

4. Run debug

```
  $ npm run debug
```
