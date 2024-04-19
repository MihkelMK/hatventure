# hatventure

Tool for TTRPGs. Players and DM can add good and bad outcomes of a choice or situation. One is chosen at random. 

## Development

### Prerequsites

Before starting the development server, run postgreSQL with `docker-compose up -d`

You'll need a `.env` with a valid `DATABASE_URL` for the app to be able to connect.\
Example:
```env
POSTGRES_PASS="loorap321"
POSTGRES_DB="encounters"
DATABASE_URL="postgresql://postgres:loorap321@127.0.0.1:5432/encounters"
```

### Starting the dev server

Install dependencies with `npm install` / `pnpm install` / `yarn install` / `bun install`

Run the dev server (port 5173) with `npm run dev`

## Production

WIP

## Roadmap

- User auth (atleast predefined DM password)
- Give DM possibility of adding either outcome seperately
- Archive page for players
- Get feedback from DMs and players, prolly lots of small things need fixin'
- Add feedback to form errors
