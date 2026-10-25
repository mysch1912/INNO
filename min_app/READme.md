# LåneApp

LåneApp er en mobilapplikation udviklet i React Native med Expo i forbindelse med Godkendelsesopgave 2 i faget Innovation og Ny Teknologi.

Formålet med appen er at gøre det nemmere for privatpersoner at låne og udlåne ting til hinanden frem for at købe produkter, som de måske kun har brug for i en kort periode.

Appen er særligt tænkt som en løsning til eksempelvis andelsboligforeninger, hvor beboere kan dele værktøj og andre genstande med hinanden.

## Funktioner

- Opret en brugerprofil og log ind
- Opret egne ting til udlån
- Søg efter ting, som andre brugere har oprettet
- Se information om tingene, herunder navn og placering
- Send låneanmodninger til andre brugere
- Accepter eller afvis låneanmodninger
- Se egne ting og låneanmodninger på profilsiden
- Gem og hent brugeroplysninger, ting og låneanmodninger via Firebase

Søgefunktionen er desuden blevet forbedret på baggrund af brugerfeedback, så brugerne ikke længere får vist deres egne ting blandt søgeresultaterne.

## Teknologier

- React Native
- Expo SDK 58
- React Navigation
- Firebase Authentication
- Firebase Realtime Database

Firebase Authentication anvendes til brugeroprettelse og login, mens Firebase Realtime Database anvendes til at gemme og hente information om brugere, ting og låneanmodninger.

Der er desuden opsat sikkerhedsregler i Firebase, som blandt andet begrænser adgangen til brugeroplysninger og bestemmer, hvem der kan oprette ting og ændre status på låneanmodninger.

## Installation og opstart

Projektet afleveres uden `node_modules`, da de nødvendige pakker kan installeres ud fra projektets `package.json` og `package-lock.json`.

For at starte applikationen skal man have Node.js og npm installeret på computeren.

**1. Åbn projektmappen**

Åbn en terminal i mappen `min_app`, hvor appens `package.json` ligger.

**2. Installer afhængigheder**

```bash
npm ci
```

**3. Start applikationen**

```bash
npx expo start
```

Når Expo er startet, vises en QR-kode i terminalen. Denne kan scannes med Expo Go på en mobiltelefon. Appen kan også åbnes i en kompatibel simulator.

Hvis der opstår problemer med forbindelsen mellem computeren og telefonen, kan man alternativt starte appen med:

```bash
npx expo start --tunnel
```

Appen kræver en internetforbindelse, da den anvender Firebase til brugerlogin og lagring af data.

**Bemærk:** Projektet anvender Expo SDK 58 og skal derfor åbnes med en kompatibel version af Expo Go.

## Projektstruktur

```text
min_app/
├── assets/             Billeder og øvrige ressourcer
├── components/         Genbrugelige komponenter
├── database/           Firebase-konfiguration
├── screens/            Appens forskellige skærme
├── styles/             Fælles styling
├── App.js              Navigation og app-struktur
├── app.json            Expo-konfiguration
├── index.js            Appens startfil
├── package.json        Projektets afhængigheder
├── package-lock.json   Fastlåste pakkeversioner
└── README.md           Projektbeskrivelse og vejledning
```

## Brugerinddragelse og videreudvikling

I forbindelse med udviklingen blev der gennemført to kvalitative interviews med potentielle brugere fra en andelsboligforening.

Interviewene viste blandt andet, at begge brugere kunne se en fordel ved en separat platform til udlån, men også at de oplevede udfordringer med appens overblik og søgefunktion.

På baggrund af deres feedback blev søgefunktionen ændret, så egne ting ikke længere vises i søgeresultaterne. Appens visuelle udtryk og visningen af ting blev desuden forbedret.

Efter ændringerne blev der gennemført en anden brugerevaluering med de samme to personer. Begge oplevede, at søgefunktionen var blevet mere overskuelig.

Denne proces har været inspireret af Build-Measure-Learn fra Eric Ries' *The Lean Startup* (2011), hvor brugerfeedback anvendes til løbende at forbedre et produkt.

## Arbejdsfordeling

LåneApp er udviklet i fællesskab af **Amra og My**.

Vi har arbejdet tæt sammen om størstedelen af applikationen, herunder idéudvikling, programmering, test og fejlfinding. Begge har derfor bidraget til koden på tværs af projektets forskellige filer, og en stor del af arbejdet er foregået på samme computer.

Vores primære fokusområder har dog været lidt forskellige:

- **My:** Har især haft fokus på appens funktionalitet, herunder Firebase, brugerhåndtering, søgefunktionen og låneanmodninger.
- **Amra:** Har især haft fokus på appens visuelle udtryk, styling, brugeroplevelse og de afsluttende designmæssige justeringer.

Vi har desuden samarbejdet om brugerinddragelsen og forbedringerne af appen på baggrund af feedback.

Selvom applikationen er udviklet i fællesskab, er de skriftlige rapporter udarbejdet individuelt.

## Demovideo

Demovideoen viser LåneApps funktioner og brugeroplevelse.

[Se demovideoen på YouTube](https://youtube.com/shorts/_ftmyn2zMNw)

## GitHub

Projektets kildekode findes på GitHub:

[GitHub – INNO / LåneApp](https://github.com/mysch1912/INNO/tree/main/min_app)

## Aflevering

Projektet afleveres som en ZIP-fil med kildekoden og de nødvendige projektfiler.

Mapperne `node_modules` og `.expo` er udeladt fra ZIP-filen. De nødvendige afhængigheder kan installeres igen ved at køre `npm ci` fra mappen `min_app`.