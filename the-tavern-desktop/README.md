# Info

For å bruke denne må du ha docker installert lokalt.

Se [docker sin hjemmeside](https://www.docker.com/get-started/) for installasjonsinstruksjoner

Hvis på Mac så anbefales det å bruke [orbstack](https://orbstack.dev/) som er en lettere og raskere versjon av docker desktop

Når docker er installert, så kan du starte prosjektet med

```bash
docker compose up --build
```

Hvis du vil kjøre i bakgrunnen kan du legge til `-d` flagget

```bash
docker compose up --build -d
```

Hvis du vil stoppe serveren kan du bruke

```bash
docker compose down
```

Hvis denne feiler så kan det hende du først må slette node_modules og lock filen. Deretter installere og prøve å starte serveren med uten docker. Dette for å få laget ".wrangler" mappen.

Med pnpm:

```bash
pnpm install
pnpm run dev
```

Med npm:

```bash
npm install
npm run dev
```

Deretter prøver å starte med docker igjen.

```bash
docker compose up --build
```

I fremtiden kan du bare bruke `docker compose up` for å starte serveren igjen

# Database
Når du har fått satt opp Docker containeren så vil du være nødt til å gjøre følgende commands for å sette opp / Seede databasen

```bash
pnpm run migrate:dev
```
Dette vil fungere ettersom vi for øyeblikket har produksjons databasen liggende under "0000_previous_hercules"

Så må du gå til følgende endepunkt for å seede databasen:

```
http://localhost:5173/api/seed
```
Du vil da forhåpentligvis ha fått en success melding. Gå så til roten av localhost så vil du kunne se at du har en bruker i databasen.





