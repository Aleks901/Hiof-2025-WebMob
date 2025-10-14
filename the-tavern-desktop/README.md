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

