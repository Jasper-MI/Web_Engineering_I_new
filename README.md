# Webanwendung zur Nutzerverwaltung

Dieses Projekt ist eine robuste und benutzerfreundliche Webanwendung zur Verwaltung von Benutzern, entwickelt im Rahmen meines Studiums. Es demonstriert fundierte Kenntnisse in der Webentwicklung, einschließlich Frontend-Design, Backend-API-Implementierung und der Strukturierung von TypeScript-Anwendungen.


## Über das Projekt
Die Nutzerverwaltungsanwendung bietet eine zentrale Plattform für die Registrierung, Anmeldung, Anzeige, Bearbeitung und Löschung von Benutzerkonten. Sie ist modular aufgebaut, um Wartbarkeit und Skalierbarkeit zu gewährleisten, und verwendet moderne Webtechnologien für eine reaktionsschnelle und interaktive Benutzererfahrung. Der Fokus lag auf der Implementierung einer klaren Trennung von Frontend-Logik (Page Object Models) und Backend-Diensten (RESTful API).

## Funktionen    
- Benutzerregistrierung: Neue Benutzer können sich mit einem eindeutigen Benutzernamen, Vor- und Nachnamen sowie einem Passwort registrieren.
- Benutzeranmeldung: Bestehende Benutzer können sich sicher mit ihren Anmeldeinformationen anmelden.
- Benutzerübersicht: Angemeldete Benutzer können eine Liste aller registrierten Benutzer einsehen (abhängig von Berechtigungen).
- Benutzerbearbeitung: Administratoren (oder der angemeldete Benutzer selbst) können Benutzerdaten aktualisieren.
- Benutzerlöschung: Benutzer können aus dem System entfernt werden.
- Toast-Benachrichtigungen: Visuelles Feedback für Benutzeraktionen (z.B. erfolgreiche Anmeldung, Fehler).
- Responsive Design: Die Anwendung ist für verschiedene Bildschirmgrößen optimiert.
- In-Memory Datenspeicherung: Das Backend verwaltet Benutzerdaten in einer temporären In-Memory-Liste.

## Technologien
Die Anwendung wurde mit folgenden Technologien entwickelt:

**Frontend:**
- HTML5: Strukturierung der Webseiten.
- CSS3 (Bootstrap): Styling und responsives Layout.
- TypeScript: Typisierte JavaScript-Entwicklung für robuste und wartbare Frontend-Logik.
- Page Object Model (POM) Pattern: Für eine saubere Trennung der UI-Interaktionen und zur Verbesserung der Testbarkeit.

**Backend:**

- Node.js: Laufzeitumgebung für den Server.

- Express.js: Web-Framework für die Erstellung der RESTful API.

- body-parser: Middleware zum Parsen von HTTP-Anfragekörpern.

- In-Memory Map: Temporäre Speicherung der Benutzerdaten (für Demonstrationszwecke).

**Entwicklungstools:**

- TypeScript Compiler (tsc): Kompilierung von TypeScript nach JavaScript.

- npm: Paketmanager für Node.js.

## Projektstruktur
Das Projekt ist logisch in Frontend- und Backend-Komponenten unterteilt:
```
.
├── public/
│   ├── html/                   # HTML-Seiten der Anwendung
│   │   ├── ImpressumLogedOut.html
│   │   ├── ImpressumPage.html
│   │   ├── landingPage.html
│   │   ├── startingPage.html
│   │   └── userManagement.html
│   └── js/                     # Kompilierte JavaScript-Dateien (aus TypeScript)
│       ├── ApplicationLoader.js
│       ├── ApplicationManager.js
│       ├── domain/
│       │   └── User.js
│       └── pages/
│           ├── LandingPagePOM.js
│           ├── StartPagePOM.js
│           ├── UserManagementPagePOM.js
│           ├── abstractPOM.js
│           ├── impressumLogedOutPOM.js
│           └── impressumPOM.js
├── src/
│   ├── ApplicationLoader.ts    # Initialisiert die Anwendung
│   ├── ApplicationManager.ts   # Verwaltet den Anwendungsstatus und Seitenwechsel
│   ├── domain/
│   │   └── User.ts             # Definition der User-Klasse
│   └── pages/                  # Page Object Models für jede Seite
│       ├── LandingPagePOM.ts
│       ├── StartPagePOM.ts
│       ├── UserManagementPagePOM.ts
│       ├── abstractPOM.ts
│       ├── impressumLogedOutPOM.ts
│       └── impressumPOM.ts
├── server.js                   # Backend-Server mit REST-API
├── package                     # Projekt-Metadaten und Abhängigkeiten
├── package-lock.json           # Genaue Abhängigkeiten
└── tsconfig.json               # TypeScript-Konfigurationsdatei
```

## Installation und Ausführung

Um das Projekt lokal einzurichten und auszuführen, folgen Sie diesen Schritten

1. Repository klonen:
```
git clone https://github.com/Jasper-MI/Web_Engineering_I.git
cd Web_Engineering_I
```
2. Abhängigkeiten installieren:
```
npm install
```
3. TypeScript kompilieren:
```
npx tsc -p tsconfig.json
```
4. Server starten:
```
npm start
```
5. Anwendung im Browser öffnen:
Öffnen Sie Ihren Webbrowser und navigieren Sie zu `http://localhost:80`.

## API-Endpunkte
Der Backend-Server stellt folgende RESTful API-Endpunkte bereit:
- `GET /api/login`: Authentifiziert einen Benutzer. Erfordert Authorization: `Basic <base64(username:password)>` Header.

- `POST /api/users`: Registriert einen neuen Benutzer. Erfordert JSON-Body mit `userID`, `password`, `firstName` (optional), `lastName` (optional).

- `GET /api/users`: Ruft eine Liste aller registrierten Benutzer ab.

- `GET /api/users/count`: Ruft die Anzahl der registrierten Benutzer ab.

- `GET /api/users/:id`: Ruft Details eines spezifischen Benutzers ab.

- `PUT /api/users/:id`: Aktualisiert die Daten eines bestehenden Benutzers. Erfordert JSON-Body mit `userID`, `password` und optional `firstName`, `lastName`.

- `DELETE /api/users/:id`: Löscht einen Benutzer.
