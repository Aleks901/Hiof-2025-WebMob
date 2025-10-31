# Desktop / Database / API Quick start.
Velkommen! Ettersom denne delen skal brukes både for mobil programmering og web applikasjoner emnet så skal vi forsøke å gjøre en så kort og konsis quick start guide så du kan påbegynne vurdering smertefritt.

### I teorien så skal monorepository strukturen sørge for at alt av dependencies blir installert fra rot, dersom noe feiler derimot så fall tilbake til dette steget.
```bash
pnpm install
```
### Kjør igang serveren for at API og Database skal være tilgjengelig (Uansett om du vurderer mobil eller web app)
```bash
pnpm run dev
```
### Åpne så en ny terminal i the-tavern-desktop. Herfra må vi sørge for at databasen fylles med tabeller, de skal i teorien ligge klar i drizzle filen så det skal være så enkelt som å kjøre følgende command.
```bash
pnpm run migrate:dev
```
### Seed så databasen så du får testet med noe i tabellene.
```bash
pnpm run seed
```
## Videre for Mobil:
Dersom du tester for mobil programmering kan du nå gå videre ved å hoppe over til the-tavern-mobile sin quick start. Ikke steng terminalen som kjører serveren til the-tavern-desktop da denne selvsagt brukes for å holde database / API aktivt.







