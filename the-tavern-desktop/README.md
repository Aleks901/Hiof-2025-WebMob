# Desktop / Database / API Quick start.
(This part is going to be in Norwegian because it'll be used in an exam..)
Velkommen! Ettersom denne delen skal brukes både for mobil programmering og web applikasjoner emnet så skal vi forsøke å gjøre en så kort og konsis quick start guide så du kan påbegynne vurdering smertefritt.

Start med å installere dependencies (Denne biten kan det hende man må gjøre uansett om prosjektet er strukturert som et monorepository ettersom det var over gjennomsnittet vanskelig å gjøre det ordentlig.)

```bash
pnpm install
```
Kjør igang serveren for at API og Database skal være tilgjengelig (Uansett om du vurderer mobil eller web app)
```bash
pnpm run dev
```
Åpne så en ny terminal i the-tavern-desktop. Herfra skal vi forsøke å sette igang databasen. Ettersom produksjons databasen shippes med repo når du kloner skal det i teorien fungere å bare migrate til dev.

```bash
pnpm run migrate:dev
```
Seed så databasen så du får testet med noe i tabellene.
```bash
pnpm run seed
```

Dersom du tester for mobil programmering kan du nå gå videre ved å hoppe over til the-tavern-mobile sin quick start. Ikke steng terminalen som kjører serveren til the-tavern-desktop da denne selvsagt brukes for å holde database / API aktivt.

(README WIP - Testing in progress..)






