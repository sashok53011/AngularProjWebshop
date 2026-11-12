# Angular Webshop — „Mein e-shop"

Ein учебный E-Shop (Lernprojekt), entwickelt mit **Angular 20** und **Angular Material**. Das Projekt begleitet Kapitel eines Angular-Lehrbuchs (HTTP-Anfragen, Routing, Formulare, Error Handling, Angular Material) und zieht seine Produktdaten von der öffentlichen Test-API [fakestoreapi.com](https://fakestoreapi.com).

---

## 1. Inhaltsverzeichnis

1. [Überblick](#1-überblick)
2. [Technischer Stack](#2-technischer-stack)
3. [Schnellstart](#3-schnellstart)
4. [Projektstruktur](#4-projektstruktur)
5. [Routen der Anwendung](#5-routen-der-anwendung)
6. [Bestehende Funktionen im Detail](#6-bestehende-funktionen-im-detail)
7. [Durchgeführte Korrekturen und Verbesserungen](#7-durchgeführte-korrekturen-und-verbesserungen)
8. [Tests](#8-tests)
9. [Build und Konfiguration](#9-build-und-konfiguration)

---

## 1. Überblick

Der Webshop bietet folgende Kernfunktionen:

- **Produktkatalog** mit Laden per HTTP (Resolver-Prefetching) und Sortierung
- **Produktdetails** mit Preis ändern (PATCH), Löschen (DELETE) und „In den Warenkorb legen"
- **Produkt anlegen** über ein reaktives Formular mit eigenem Preis-Validator
- **Warenkorb** mit Mengen-Formular (`FormArray`), Zugang nur nach Login
- **Authentifizierung** über einen Zugriffstoken (Signals: `signal` / `computed`)
- **Guard-Mechanismen** für Routen (`canActivate`, `canMatch`, `canDeactivate`)
- **Lazy Loading** der Profil-Seite
- **Globaler Error Handler** für HTTP- und Anwendungsfehler
- **UI mit Angular Material**: Toolbar, Tabelle, Cards, Dialog, Snackbar, Badge

## 2. Technischer Stack

| Komponente | Version |
|---|---|
| Angular | 20.3 |
| Angular Material / CDK | 20.2 |
| `@angular/animations` | 20.3 |
| RxJS | 7.8 |
| TypeScript | 5.9 |
| zone.js | 0.15 |
| Testframework | Karma + Jasmine |
| Build-Tool | `@angular/build` (Application Builder) |
| API | `https://fakestoreapi.com` |

## 3. Schnellstart

### Variante 1: Windows-Skripte (Doppelklick)

Im Projektstamm liegen drei Startskripte:

| Datei | Aufgabe |
|---|---|
| `start.bat` | Startet den Dev-Server (`ng serve`) auf http://localhost:4200/ |
| `test.bat` | Führt die Unit-Tests aus (`ng test`, Karma + Jasmine) |
| `build.bat` | Erstellt den Produktions-Build (`ng build`) nach `dist/` |

Alle Skripte führen bei Bedarf automatisch `npm install` aus, stellen die UTF-8-Kodierung (`chcp 65001`) sicher und pausieren bei Fehlern, damit die Fehlermeldung lesbar bleibt.

### Variante 2: Kommandozeile

```bash
# Abhängigkeiten installieren
npm install

# Dev-Server (http://localhost:4200/)
npm start

# Unit-Tests
npm test

# Produktions-Build (Artefakte in dist/)
npm run build
```

## 4. Projektstruktur

```
src/app/
├── app.ts / app.html / app.css        # Shell: Toolbar, Navigation, Footer
├── app.routes.ts                      # Routenkonfiguration
├── app.config.ts                      # Provider (Router, HTTP, Settings, ErrorHandler)
├── app.setting.ts                     # InjectionToken APP_SETTINGS (title, version, apiUrl)
├── app-error-handler.ts               # Globaler ErrorHandler
│
├── products.ts                        # Produkt-Service (CRUD + lokaler Cache)
├── product.ts                         # Interface Product
├── products-resolver.ts               # Resolver für Prefetching der Produktliste
├── auth.ts                            # Auth-Service (Signals + localStorage)
├── auth-guard.ts                      # Guard: canActivate / canMatch
├── checkout-guard.ts                  # Guard: canDeactivate (Dialog beim Verlassen)
├── cart-serv.ts                       # Warenkorb-Service (POST/PUT via defer)
├── cart-int.ts                        # Interface CartInt
│
├── product-list/                      # Produktliste (Cards / Tabelle)
├── product-detail/                    # Produktdetails (Preis, Löschen, Warenkorb)
├── product-create/                    # Formular zum Anlegen eines Produkts
├── cart/                              # Warenkorb (FormArray für Mengen)
├── checkout/                          # Bestätigungs-Dialog (MatDialog)
├── auth-comp/                         # Login/Logout-Buttons
├── user/ + user.routes.ts             # Profil (Lazy Route)
├── key-logger/                        # Demo: Tastatur-Events (fromEvent + RxJS)
│
├── sort-pipe.ts                       # Pipe zum Sortieren der Produkte
├── price-maximum.validator.ts         # Eigener Preis-Validator
├── price-maximum.ts                   # Direktive als Wrapper (NG_VALIDATORS)
├── copyright.ts                       # Direktive für den Footer
```

## 5. Routen der Anwendung

| Pfad | Komponente | Zugriff / Besonderheit |
|---|---|---|
| `/products` | Produktliste | öffentlich, Daten via `productsResolver` |
| `/products/new` | Produkt anlegen | öffentlich |
| `/products/:id` | Produktdetails | öffentlich, dynamischer Parameter `:id` |
| `/cart` | Warenkorb | `authGuard` (canActivate) + `checkoutGuard` (canDeactivate) |
| `/user` | Profil | Lazy Loading (`loadChildren`) + `authGuard` (canMatch) |
| `""` | Redirect → `/products` | `pathMatch: 'full'` |
| `**` | Wildcard → `/products` | muss letzte Route sein |

## 6. Bestehende Funktionen im Detail

### 6.1 Produktliste (`product-list`)

- Daten kommen über einen **Resolver** (`productsResolver`), der *vor* Aktivierung der Route lädt (Prefetching) → schnellere Anzeige.
- Der Resolver liest den Query-Parameter `limit` und begrenzt die Anzahl der geladenen Produkte.
- Anzeige als Kartenansicht (`mat-card`) oder Tabelle (`mat-table`) umschaltbar über `mat-button-toggle-group`.
- Sortierung über die eigene Pipe `SortPipe` (`keyof Product`, standardmäßig `price`); das Original-Array wird kopiert, nicht verändert.
- Der Button „+" navigiert auf `/products/new`.

### 6.2 Produktdetails (`product-detail`)

- Laden der Details per `switchMap` über `route.paramMap` — bei Parameterwechsel wird automatisch neu geladen.
- **Preis ändern**: reaktives Eingabefeld mit `ngModel`, Validierung `required`, `min="1` und eigener Direktive `appPriceMaximum threshold="500"`; Speichern per HTTP `PATCH /products/:id`.
- **Löschen**: HTTP `DELETE /products/:id`, danach Navigation zurück zur Liste.
- **In den Warenkorb**: nur sichtbar, wenn `isLoggedIn()` (Signal) `true` ist; danach Snackbar-Nachricht (`MatSnackBar`, 3 Sekunden).
- Alternative Implementierung per `input()`-Binding ist als Kommentar im Code dokumentiert.

### 6.3 Produkt anlegen (`product-create`)

- Reaktives Formular (`FormGroup`) mit den Feldern `title`, `price`, `category`.
- Validatoren: `Validators.required`, `Validators.min(1)` und der **eigene Validator** `priceMaximumValidator(1000)` (Preis darf 1000 nicht überschreiten).
- Bei Wechsel der Kategorie wird das Preisfeld zurückgesetzt (`valueChanges`).
- Speichern per HTTP `POST /products`, danach Navigation zur Liste.

### 6.4 Warenkorb (`cart` + `cart-serv`)

- `CartServ.addProduct(id)` nutzt den RxJS-Operator **`defer`** als „if/else" für Observables:
  - kein Warenkorb vorhanden → `POST /carts` (neuer Warenkorb),
  - Warenkorb vorhanden → `PUT /carts/:id` mit den Produkten.
- Das Formular verwendet ein **`FormArray<FormControl<number>>`** für die Mengen; pro Produkt entsteht ein Control mit Anfangswert 1.
- Badge mit Artikelanzahl in der Toolbar (`matBadge`).
- **`checkoutGuard` (`canDeactivate`)**: Beim Verlassen der Seite mit gefülltem Warenkorb öffnet sich ein **MatDialog** (`Checkout`) mit der Artikelanzahl statt der nativen `confirm()`-Funktion; die Navigation wird fortgesetzt, sobald der Dialog geschlossen wird (`afterClosed()`).

### 6.5 Authentifizierung (`auth`, `auth-guard`, `auth-comp`)

- `Auth.login()` sendet `POST /auth/login` mit Benutzername und Passwort und speichert den Zugriffstoken.
- Zustand über **Signals**: `accessToken = signal(...)`, `isLoggedIn = computed(() => ...)`.
- `authGuard` ist eine **funktionale Guard-Funktion** (`CanActivateFn | CanMatchFn`) mit `inject()`; bei nicht eingeloggtem Benutzer Redirect auf `/`.
- Die Reihenfolge der Guards in `canActivate: [...]` ist wichtig: fällt ein Guard aus, werden die folgenden nicht ausgeführt.

### 6.6 Profil (`user`, lazy)

- Route `user` lädt das Modul per `loadChildren: () => import('./user.routes')` (Lazy Loading) und ist über `canMatch: [authGuard]` geschützt.
- `user.routes.ts` exportiert einen **Default-Export** — das ist Voraussetzung für Lazy Loading.

### 6.7 Produkt-Service (`products.ts`)

- Lokaler **Cache** (`products: Product[]`): `getProducts()` ruft die API nur auf, wenn der Cache leer ist.
- `handleError()` unterscheidet HTTP-Statuscodes (`0` = Client-Fehler, `500` = Server, `400` = Request) und gibt den Fehler mit `throwError` weiter.
- Vollständiges CRUD: `GET`, `POST` (neues Produkt landet im Cache), `PATCH` (Preis), `DELETE` (entfernt das Element aus dem Cache via `splice`).

### 6.8 Konfiguration und Fehlerbehandlung

- **`APP_SETTINGS`** ist ein `InjectionToken` mit `title`, `version` und `apiUrl` — die URL wird in allen Services per `inject(APP_SETTINGS)` aufgelöst (kein Hardcoding).
- **`AppErrorHandler`** implementiert das globale `ErrorHandler`-Interface, erkennt `HttpErrorResponse` und loggt typisierte Meldungen (besser als Fehlerbehandlung pro Service).
- Provider in `app.config.ts`: `provideRouter(routes, withComponentInputBinding())`, `provideHttpClient()`, `provideAnimationsAsync()`, `provideZoneChangeDetection({ eventCoalescing: true })`.

### 6.9 Direktiven und Pipes

- **`Copyright`** (`[appCopyright]`): schreibt „Copyright © \<Jahr\> Alle Rechte vorbehalten." in das Footer-Element.
- **`PriceMaximum`** (`[appPriceMaximum]`): Direktive als Wrapper um `priceMaximumValidator`, registriert über `NG_VALIDATORS`; nutzt `input()` mit `alias: 'threshold'` und `transform: numberAttribute`.
- **`SortPipe`** (`name: 'sort'`): sortiert Produkt-Arrays unveränderlich nach einem Schlüssel.
- **`KeyLogger`** (Demo): `fromEvent` + `map`/`filter`/`tap` zeichnet Tastendrücke auf, optional nur Ziffern (`numeric`-Input).

## 7. Durchgeführte Korrekturen und Verbesserungen

Alle Korrekturen wurden vor dem Push in Commit `96d887c` zusammengefasst (28 Dateien, +372/−97).

### 7.1 `getProduct()` lieferte `undefined` (products.ts)

**Vorher:** `return of(product!)` — wenn das Produkt nicht im Cache war, wurde `undefined` mit Non-Null-Assertion zurückgegeben (typisiert als `Product`), die HTTP-Anfrage war auskommentiert.

**Jetzt:** Cache-Treffer wird direkt zurückgegeben, sonst lädt `GET /products/:id` das Produkt von der API und legt es im Cache ab (`tap` + `catchError`). Damit funktioniert die Direktnavigation zur Detailseite auch ohne vorherigen Aufruf der Liste.

### 7.2 Duplicados im Warenkorb (cart-serv.ts)

**Vorher:** `PUT` sandte `[...this.cart.products, cartProduct]` — ein bereits vorhandenes Produkt wurde als zweiter Eintrag eingefügt.

**Jetzt:** Vor dem Senden werden Einträge nach `productId` zusammengeführt; bei Vorhandensein wird `quantity` um 1 erhöht. `CartInt` wurde um `quantity?: number` erweitert.

### 7.3 Token ging bei Reload verloren (auth.ts)

**Vorher:** `accessToken = signal('')` — nur im Speicher, ein Neuladen der Seite beendete die Sitzung.

**Jetzt:** Der Token wird in `localStorage` persistiert: beim Start wiederhergestellt, bei `login()` gespeichert, bei `logout()` entfernt.

### 7.4 Cache-Invalidierung (products.ts + products-resolver.ts)

**Vorher:** Der Produkt-Cache lebte für die gesamte App-Lifetime; ein anderer `limit`-Parameter lieferte veraltete Daten.

**Jetzt:**
- neues Flag `getProducts(limit?, force = false)` — `force = true` umgeht den Cache;
- neues **`refresh()`** zum expliziten Leeren des Caches;
- der Resolver setzt `force = true`, wenn ein `limit`-Query-Parameter in der URL steht.

### 7.5 Falscher Import im Guard (checkout-guard.ts)

**Vorher:** `import { inject } from '@angular/core/primitives/di'` (interner, inoffizieller Pfad).

**Jetzt:** `import { inject } from '@angular/core'`.

### 7.6 Warenkorb-Formular wurde zu früh gebaut (cart.ts)

**Vorher:** `ngOnInit` rief `getProducts()` (asynchron) und direkt danach `buildForm()` auf — `products` war noch leer, das `FormArray` blieb ohne Controls.

**Jetzt:** `buildForm()` wird innerhalb des `subscribe` *nach* dem Empfang der Produkte aufgerufen.

### 7.7 Fehlende Abhängigkeit `@angular/animations` (package.json)

**Vorher:** Der Build schlug mit `Could not resolve "@angular/animations/browser"` fehl — `provideAnimationsAsync()` benötigt das Paket, es fehlte aber in den Dependencies (nur als optionale Peer-Dependency).

**Jetzt:** `@angular/animations@20.3.16` wurde als Abhängigkeit ergänzt; der Build ist grün.

### 7 Alle Unit-Tests repariert (19/19 bestanden)

**Vorher:** Die Tests kompilierten überhaupt nicht (4 Typfehler in generierten Specs), danach fielen 12 von 19 Tests.

Behobene Probleme:

| Problem | Lösung |
|---|---|
| `new Copyright()` ohne `ElementRef` | `TestBed.runInInjectionContext(...)` bzw. Argument ergänzt |
| `productsResolver.spec` mit falschem Typ `ResolveFn<boolean>` | korrekt zu `ResolveFn<Product[]>` geändert |
| `authGuard.spec` — Union-Typ `CanActivateFn \| CanMatchFn` nicht aufrufbar | expliziter Cast auf `CanActivateFn` |
| `checkoutGuard.spec` — `CanDeactivateFn<unknown>` passte nicht zu `Cart` | Typ auf `CanDeactivateFn<Cart>` gesetzt |
| Fehlende Provider in den TestBed-Modulen | `provideHttpClient()`, `provideHttpClientTesting()`, `provideRouter([])`, `provideNoopAnimations()`, `{ provide: APP_SETTINGS, ... }`, `MAT_DIALOG_DATA` ergänzt |
| `PriceMaximum` — `input()` außerhalb eines Injection-Kontexts | `TestBed.runInInjectionContext(() => new PriceMaximum())` |
| `App`-Test erwartete `<h1>` „Hello, my-app" | angepasst an `<h2>` mit `appSettings.title` („Mein e-shop") |

**Ergebnis: `TOTAL: 19 SUCCESS`.**

### 7.9 Weitere Artefakte

- **`README.md`** wurde vollständig auf Deutsch neu geschrieben (dieses Dokument).
- **Windows-Skripte** `start.bat`, `test.bat`, `build.bat` hinzugefügt (Doppelklick-Start, Auto-`install`, UTF-8, Pause bei Fehlern).
- **Push:** Wegen fehlender Schreibrechte wurde ein Fork unter `sashok53011` angelegt — der Stand liegt in `96d887c` auf dem Fork bereit.

## 8. Tests

```bash
npm test            # oder Doppelklick auf test.bat
```

- Framework: **Karma + Jasmine**, Ausführung headless möglich über:
  ```bash
  npx ng test --watch=false --browsers=ChromeHeadless
  ```
- Für jeden Service, jede Komponente, Direktive, Pipe und Guard existiert eine `*.spec.ts`.
- Stand: **19 von 19 Tests bestanden.**

## 9. Build und Konfiguration

```bash
npm run build       # oder Doppelklick auf build.bat → dist/
```

- Builder: `@angular/build:application`, Einstieg `src/main.ts`, Polyfills `zone.js`.
- Globale Styles: `src/custom-theme.scss` + `src/styles.css`.
- Produktions-Budgets: initial 500 kB (Warnung) / 1 MB (Fehler), pro Komponenten-Style 4 kB / 8 kB.
- Bekannte, unkritische Build-Warnungen:
  - `NG8113`: `MatError` wird im Template von `Cart` nicht verwendet (überflüssiger Import);
  - Das initiale Bundle liegt aktuell bei ~811 kB (Angular Material verursacht das) und überschreitet das Warn-Budget.
- **Prettier** ist in `package.json` konfiguriert (`printWidth: 100`, `singleQuote`, Angular-Parser für HTML).
- Nützliche CLI-Befehle:
  ```bash
  ng generate component component-name   # neuer Komponent
  ng generate service service-name       # neuer Service
  ng build --watch --configuration development
  ```
