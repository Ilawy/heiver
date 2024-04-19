echo $1
npx dotenv-cli -e $1 npx drizzle-kit generate:sqlite
npx dotenv-cli -e $1.local npx drizzle-kit push:sqlite
npx dotenv-cli -e $1 npx tsx ./lib/db/migrate.ts
