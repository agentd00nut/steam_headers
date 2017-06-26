# steam_headers
Download the header images for all your owned steam apps.

Uses [steam-user](https://github.com/DoctorMcKay/node-steam-user )

# How to use
`git clone https://github.com/agentd00nut/steam_headers.git`
`cd steam_headers`
`npm install`
Edit lines 8 and 9 with your steam login and password.
`node index.js`

The console may ask for a steam code... Check your steam email address as steam will view the program as a "new computer".
This will only happen once.

Any applications with valid headers that you own will appear in a `headers/` directory.

# TODO

1. Pull screenshots for the games into a `screenshots/[app_id]/` structure.
2. Include a viewing application.

