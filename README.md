# Hiof-2025-WebMob
Repository for the web applications and mobile programming courses respectively at Østfold University College.

# Til sensor
Dette repo'et skal være et monorepo for både Web applikasjoner emnet og Mobil programmering emnet. Dette er mest for å spare tid på deler av koden som er lik i begge emnene, men også fordi deler av funksjonaliteten vi vil få fra WebApp prosjektet skal tas i bruk i Mobil appen. Her på github skrives alle commits / issues / pull requests og annen relevant tekst på engelsk slik at prosjektet kan være til bruk i fremtidig jobb søk.

# Quick start (This part will be in Norwegian for exam purposes.)
0. Dersom du ikke enda har pnpm vil du være nødt til å installere det først.
   ```bash
   npm install -g pnpm
   ```
1. Åpne terminal i roten av prosjektet.
   ```bash
   pnpm install
   ```
3. Hvis du tester for mobil vil du være nødt til å kjøre igang serveren i web applikasjoner prosjektet the-tavern-desktop. Så gå videre ved å kjøre quick starten som ligger i det prosjektets README.md
4. Hvis du tester for Web applikasjoner kan du nå gå rett til the-tavern-desktop å gjøre quick starten derfra.

# The Tavern
## Project description
The Tavern is a chatroom service not unlike discord. The goal of this project is to create a functional chat / social media esque service to test our ability to write proper mobile and desktop applications.

## Workflow / How to contribute
*This part is specifically for the group members working on the project, we will not be taking contributions from people outside the course at this time*
### Creating an issue
An "Issue" is like our backlog of unfinished jobs. To create one you navigate to the "Issues" tab, press the "New Issue" button and write a fitting title / description of the job.
- For any issues related to the mobile application, add the ![Static Badge](https://img.shields.io/badge/Mobile-%233138bc?style=plastic) tag.
- For any issues related to the desktop application, add the ![Static Badge](https://img.shields.io/badge/Desktop-%2303eeb8?style=plastic) tag.
- For quick fixes, not necessarily a bug but just something to be fixed on the go such as a typo or other smaller issues use the ![Static Badge](https://img.shields.io/badge/Hotfix-%23a54357?style=plastic) tag.
- For any issues related specifically to the frontend of either application, use the ![Static Badge](https://img.shields.io/badge/Frontend-%23ee16ff?style=plastic) tag.
- For any issues related specifically to the backend of either application, use the ![Static Badge](https://img.shields.io/badge/Backend-%23933e19?style=plastic) tag.
- For additions to the project that add a feature, use the ![Static Badge](https://img.shields.io/badge/Enhancement-%23a2eeef?style=plastic) tag.
- For changes in the file structure or work environment in general, use the ![Static Badge](https://img.shields.io/badge/Environment-%23d8c414?style=plastic) tag.
- There are other tags for other issues, add them as necessary, but these are the most essential ones.
### Adding a branch
Once you've made the issue or found the issue and decided you want to work on it, assign yourself to the issue and make a branch. To do this navigate to the "Development" part and click "Create a branch".
You'll be prompted with a window where you get to name the branch, it might look something like this:
- ``` 1-ExampleIssue-blablabla ```
<br>  Rename this by adding the job description in front of the branch name so that we can easily go back and see what branch was used for what.
- ``` feature/1-ExampleIssue-blablabla ```
- ``` hotfix/1-ExampleIssue-blablabla ```
- ``` bugfix/1-ExampleIssue-blablabla ```
### Comitting changes
When comitting a change in your branch, preferably you'll add the issue number to the commit summary so that it's referenced in the issue itself.
<br> Example: 
<br> ``` Example Summary of what you did (#<Id of the issue you're working on>) ```
### Pull requests
When creating a pull request you'll have to add at least 1 reviewer to check your code. Once you've done that add any necessary tags that define the work your commit has covered. (Likely just the same as in the issue, however if you've only solved part of a problem you should only add tags for what you did.
### Merging
When all is said and done, you've comitted, been reviewed etc.. merge and delete the branch if you solved the issue.
