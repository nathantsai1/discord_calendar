# Discord Calendar App

## What is this?
<b>Simply put, it is a calendar that works in Discord.</b> Made with many, many hours of work, I made this to have a simple UI, specifically with simplistic ideas in mind - It does as it is supposed to do, and does not try to bombard the client with too many complicated options that don't make sense

## Why did I make this?
<b>I made this to help other people like me create more reminders and check that I did finish what I needed to finish by the end of the given date.</b> I like creating my own app because it was accustomed to my tastes and my preferences, as I hope it does yours. Specifically though, it was meant as an app to know when to exchange a shared item between me and my friend, where both of us can see when to do so. It works great for that!

## How to set up for your own use

### Disclaimer: To install this app in a server, you must have 'Manage Server' Permission

<b> There are two ways to set this up</b>

<b>1. Click this [link](https://discord.com/oauth2/authorize?client_id=1319082957063061524&permissions=929860487168&integration_type=0&scope=bot+applications.commands)</b>

    The program will work as shown [here][https://youtu.be/OuH8Q5D0jbE]

### Or:

<b>2a. Fork this repo to make your own</b>

<b>2b. Fill out the '.env.sample' file</b>

    Rename the '.env.sample' file to be a '.env' file
    Fill out the '.env' file correctly. DO NOT SHARE ANY OF THIS INFORMATION WITH ANYONE ELSE OR YOUR DATA WILL GET STOLEN - 
        a. Go to [Discord for Developers](https://discord.com/developers). Log in with your normal discord account or sign up for a new one. 
        b. Click 'New Application' and name your bot. Then, in the 'General Information' tab, copy your 'Application ID' and replace the CLIENT_ID in the '.env' file with it.
        c. Go to the 'Bot' tab, and click 'Add Bot'. Click 'Reset Token' and copy that. Paste it into the 'TOKEN' variable in the '.env' file
        d. Go to [NeonDB](https://neon.tech) and create an account.
        Fill out the details, and click on the 'Branches' tab, then the 'main' branch. Name your branch, and select the 'main' branch as the 'Parent Branch'
        e. A link containing sensitive information will be shown. Exit out of this, and go to the 'Tables' tab. Create a new table, and use the same names and types as the columns listed. 
        f. Go to the 'Dashboard' tab, click on 'Show Password' in the 'Connection Details' subpoint and copy the 'Connection String'. Make sure that the selected database has the same schema as the one above.
        g. Go to [Discord](discord.com/login) and turn on [Development Mode](https://www.howtogeek.com/714348/how-to-enable-or-disable-developer-mode-on-discord/). Then copy the server id(Double click on the server that you will be adding this to, and select 'Copy ID'). Add this to the 'GUILD_ID' variable in the'.env' file.

<b>2c. Download the libraries in the package.json</b>

    Run 'npm install' in the terminal to do so.

<b>2d. Run the program</b>

    Run 'nodemon' in the terminal to do so.

<b>2e. Add the app to your server/user apps</b>

    Go back to [Discord for Developers](https://discord.com/developers), open up your app, and go to the 'Installation' tab. First check the 'User Install' and 'Guild Install' at the top, then scroll to the bottom and click in the 'User Install' scope 'applications.commands'. In the 'Guild Install', select the scopes 'applications.commands' and 'bot'. Then, scroll down to check 'Administrator'. Copy the 'Discord Provided Link' above the 'Default Install Settings' and open it up in a new tab. Select either 'Add to my Apps' or 'Add to Server'. Agree to all the terms. To set this up for DMs, go back to the Developer site, and switch the Integration Type to 'User Install'. Open the link at the bottom and click add to server. Agree to all the terms.

## How to use

<b>Use the following three commands that are meant to add, delete, or see (to) your events:</b>

<b> /add_events </b>

    Add an event to the Calendar
    Accepts the required arguments: 
        1. 'event_name', which is the name of the events. It cannot be more than 30 characters
        2. 'event_date', which is the date of the events. It must be in the form of MM-DD-YYYY or MM-DD-YYYY HH where the date must be after right now, but before one year from today. The hour argument, if inputed, must be in military time
<b> /delete_event </b>

    Add an event to the Calendar
    Accepts the required arguments: 
        1. 'event_name', which is the name of the events. It must match an entry the Calendar currently stores
<b> /list_events </b>

    Lists all the events stored by the Calendar App - both the Event Name and the Event Time for each registered event

## What do the error codes mean?
The errors are seperated by every hundred interval, so that it is as easy as possible to identify them if you get an error

<b>000s:</b> generic errors These are the exceptions to the 'every hundred interval' rule, and these numbers are rounded to give a sense of generic errors

      500: generic internal error

<b>500s:</b> calendar_main information is wrong. Specifically, these errors would pop up during the 'add_event' command.

      501: wrong length of string
      502: wrong format of string
      503: invalid date

<b>600s:</b> issues with DB. These mostly pop up anytime there is an issue with overlapping events a discord user has. Since this is an issue with an external application, it may or may not be because of client error, my coding error, or just an issue with the DB itself

      601: user holds too many events
      602: error with deleting db
      603: DB is empty
      604: No associated events