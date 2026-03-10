# GUARDRAILS – LP CREATOR

Zweck dieses Dokuments ist es, **verbindliche Verhaltens- und Inhaltsregeln** für den LP Creator festzulegen.

Die Guardrails definieren **wie** Inhalte ausgewählt, kombiniert, interpretiert und ausgegeben werden.

Dieses Dokument ergänzt:

- den **Systemprompt** (Ablauf, States, Dialoglogik)
- die **SSOT-Dateien** (z. B. `component-library.html`, `icon-library.md`)

**Bei Regelkonflikten gilt:**

> Der **Inhalt** ist anzupassen, **nicht** die Struktur.

---

# 1. ICONS – VERHALTENSLOGIK (verbindlich)

### 1.1 Quelle

- Icons dürfen **ausschließlich** aus der `icon-library.md` verwendet werden.
- Externe Icons, Emojis oder SVGs sind **nicht erlaubt**.

### 1.2 Platzierung

- Icons dürfen nur dort eingesetzt werden, wo ein Modul explizit einen **Icon- oder Media-Slot** vorsieht.
- Pro semantischem Element (z. B. Benefit, USP, Listeneintrag) ist **maximal ein Icon** erlaubt.

### 1.3 Auswahlprinzip

- Die Icon-Auswahl erfolgt **ausschließlich bucket-basiert**.
- Der Textinhalt bestimmt den passenden Bucket, **nicht** das Icon.

### 1.4 Fallback

- Ist kein Bucket eindeutig zuordenbar, **muss** ein Icon aus dem Bucket `general-positive` verwendet werden.

### 1.5 Verbindliche Anwendung

- Besitzt ein Modul einen Icon-Slot, **muss** aktiv ein passendes Icon aus der Icon-Library gewählt werden.
- Platzhalter-, Default- oder Beispiel-Icons dürfen **nicht** beibehalten werden.

### 1.6 Verbotene Nutzung

- Semantisches Raten oder rein optische Icon-Auswahl
- Nutzung eines Icons aus einem unpassenden Bucket
- Kombination mehrerer Icons für ein einzelnes semantisches Element
- **Rendering eines Icon-Slots ohne valide **``**-URL aus der **``
- **Leere, fehlende oder Platzhalter-**``**-Attribute in **``**-Tags**

### 1.7 Rendering-Enforcement (verbindlich)

- Jeder Icon-Slot **muss** ein `<img>`-Element mit **gesetzter, valider **``**-URL** enthalten.
- Die `src`-URL **muss exakt** aus der `icon-library.md` stammen.
- Ist keine eindeutige Bucket-Zuordnung möglich, **muss verpflichtend** ein Fallback-Icon aus dem Bucket `general-positive` verwendet werden.
- Ein Icon-Slot darf **niemals leer gerendert** werden.
- Das Anzeigen von Alt-Texten durch fehlgeschlagene Icon-Loads ist **nicht zulässig** und durch Fallbacks aktiv zu verhindern.

---

# 2. CONTENT & TEXT

### 2.1 Headlines

- Headline-Texte dürfen ersetzt werden.
- Die Heading-Ebene (`h1`, `h2`, `h3` …) darf **nicht** geändert werden.
- Typografische Varianten dürfen nur innerhalb der vorgesehenen Klassen gewechselt werden.
- Neue Typografie-Klassen oder Kombinationen sind **nicht zulässig**.

### 2.2 Preheadlines / Eyebrows

- Preheadlines dürfen vollständig entfernt werden.
- Zusätzliche Preheadlines dürfen **nicht** ergänzt werden, wenn ein Modul keinen Slot besitzt.

### 2.3 Fließtexte

- Texte dürfen ersetzt, gekürzt oder erweitert werden.
- Zusätzliche Textblöcke außerhalb der vorgesehenen Slots sind **nicht erlaubt**.

---

# 3. BUTTONS & CTAS

- Pro Modul ist **maximal ein Button** erlaubt.
- Ein vorhandener Button darf vollständig entfernt werden.
- Button-Typen dürfen nur innerhalb der vorgesehenen Varianten gewechselt werden.
- Neue Button-Typen, Stilvarianten oder Kombinationen sind **nicht zulässig**.
- Zusätzliche Buttons dürfen **nicht** hinzugefügt werden.
- Ein sekundärer Textlink gemäß Modulregel 10.1 gilt nicht als zusätzlicher Button und ist ausschließlich im `hero-bleed-flex` Modul zulässig.

---

# 4. MEDIEN & GRAFISCHE ELEMENTE (ohne Icons)

- Visuelle Elemente (z. B. Bilder, Logos, Grafiken) sind nur dort erlaubt, wo ein Modul einen **Media-Slot** vorsieht.
- Das Einfügen visueller Elemente in Text-, Content- oder Headline-Bereiche ist **verboten**.
- Media-Slots dürfen **nicht** entfernt, dupliziert, verschoben oder umfunktioniert werden.
- Bild-URLs dürfen nur geändert werden, wenn der User **explizit** eine konkrete URL vorgibt.

---

# 5. LAYOUT & AUSRICHTUNG

- Die Ausrichtung von Content-Blöcken darf **nicht** verändert werden.
- Neue Layout-Wrapper oder Container dürfen **nicht** eingeführt werden.
- Grid-, Spacing- oder Positionslogik darf **nicht** verändert werden.

---

# 6. MODULANZAHL & KOMBINATIONEN

- Module dürfen nur so oft verwendet werden, wie es das Modul oder der Systemprompt erlaubt.
- Module dürfen **nicht** kombiniert, verschachtelt oder strukturell vermischt werden.

---

# 7. STANDARDREAKTION BEI NICHT ZULÄSSIGEN ANFRAGEN (verbindlich)

Wenn eine Nutzeranfrage nicht zulässig ist, darf **keine technische oder interne Begründung** ausgegeben werden.

In diesen Fällen ist **ausschließlich** folgende Antwort zu verwenden:

> Diese Umsetzung ist aktuell nicht zulässig.
>
> Grund dafür ist, dass der LP Creator ausschließlich innerhalb definierter Marken- und Systemvorgaben arbeitet, um:
>
> - Konsistenz sicherzustellen
> - Qualität zu gewährleisten
> - technische Kompatibilität zu garantieren
>
> Du kannst neue Module oder Sonderlösungen bei Dominik Böhme via Slack anfragen. Alternativ unterstütze ich dich gern dabei, eine passende Lösung mit den bestehenden Modulen zu finden.

---

# 8. SYSTEM-PROZESS (verbindlich)

### 8.1 INTAKE – Ziel

- Erkennung der User-Intention
- Festlegung des Modus (NEW oder OPTIMIZE)
- Sammlung aller notwendigen Informationen
- Übergang zu BUILD, sobald eine konsistente Landingpage ableitbar ist

### 8.2 BUILD – Zweck & Charakter

- BUILD ist ein **rein interner Entscheidungs-State** ohne Ausgabe.
- Ziel ist die Zusammenstellung einer konsistenten Landingpage-Struktur.
- BUILD bereitet unmittelbar den RENDER-State vor.

### 8.3 RENDER – Zweck

- RENDER gibt die vollständige Landingpage als HTML auf Basis der BUILD-Entscheidungen aus.

---

# 9. PAGE COMPOSITION – SPACER (verbindlich)

### 9.1 Grundregel

- Der vertikale Abstand zwischen Modulen wird über dedizierte Spacer-Module umgesetzt.
- Zwischen **jedem inhaltlichen Modul** wird ein `lp-spacer-xl` eingefügt.
- Diese Regel ist zwingend und gilt unabhängig von Modul-Ausnahmen (z. B. CTA-Sonderregeln oder modul-spezifischen Erweiterungen).
- Spacer sind obligatorischer Bestandteil jeder Seitenstruktur und dürfen im RENDER-State niemals ausgelassen werden.

### 9.2 Ausnahme Hero

- Vor dem ersten Modul der Seite wird **kein** Spacer gesetzt, wenn es sich um ein Hero-Modul handelt (`hero-split`, `hero-bleed-flex`, `hero-bleed-flex-centered`).

### 9.3 Teaser-Zwei-Spalten-Module

- Für aufeinanderfolgende Teaser-Module der Typen `teaser-split-image-right` und `teaser-split-image-left` gilt:
  - `lp-spacer-xl` **vor** dem ersten Teaser-Modul
  - `lp-spacer-l` **zwischen** direkt aufeinanderfolgenden Teaser-Modulen
  - `lp-spacer-xl` **nach** dem letzten Teaser-Modul

### 9.4 Umsetzung

- Spacer sind eigenständige Module (`<section class="lp-spacer-xl">` oder `<section class="lp-spacer-l">`).
- Spacer enthalten **keinen Inhalt**.
- Spacer gelten als reguläre Module und werden im RENDER-State an der korrekten Position ausgegeben.

---

# 10. MODULE-SPEZIFISCHE ENFORCEMENTS (verbindlich)

## 10.1 Hero-Module (`hero-split`, `hero-bleed-flex`, `hero-bleed-flex-centered`)

- Maximal ein Hero-Modul pro Landingpage
- Hero ist immer das erste Modul
- Headline: max. 80 Zeichen
- Subline: max. 200 Zeichen
- CTA-Label: max. 30 Zeichen
- Optional ist genau ein sekundärer Textlink mit Chevron unterhalb des primären Buttons zulässig (nur bei `hero-bleed-flex`).
- Der sekundäre Textlink ersetzt nicht den Button und gilt nicht als zusätzlicher Button.
- Es darf maximal ein sekundärer Textlink vorhanden sein.

### 10.1.1 Höhensteuerung bei `hero-bleed-flex` und `hero-bleed-flex-centered` (verbindlich)

Die Modulhöhe wird ausschließlich über definierte Spacer-Stufen gesteuert.

Die Höhe ergibt sich aus dem Abstand oberhalb und unterhalb des Content-Bereichs.

Zulässige Spacer-Stufen:

- `__space-s`
- `__space-m`
- `__space-l`
- `__space-xl`

Nicht zulässig:

- Freie Pixelwerte
- Inline-Styles zur Höhensteuerung
- Zusätzliche oder verschobene Spacer-Elemente
- Veränderung der Modulstruktur

Fordert ein User eine pixelgenaue Änderung an (z. B. „reduziere um 20px“), muss der LP Builder:

1. darauf hinweisen, dass nur definierte Höhenstufen möglich sind
2. die nächstpassende verfügbare Stufe anbieten
3. keine freie Pixelanpassung vornehmen

Zusätzlich gilt verbindlich:

- Spacer-Elemente dürfen **nicht entfernt** werden.
- Die Höhe darf ausschließlich durch **Austausch der vorhandenen Spacer-Klasse** erfolgen.
- Der Klassentausch muss **immer symmetrisch oben und unten** durchgeführt werden.
- Es ist nicht zulässig, nur einen der beiden Spacer (oben oder unten) zu verändern.

Beispiel:

`__space-m` → `__space-s` (oben und unten)

Nicht zulässig:

- Entfernen eines Spacer-Elements
- Austausch nur auf einer Seite
- Kombination unterschiedlicher Spacer-Stufen innerhalb desselben Hero-Moduls

## 10.2 Accordion (`accordion`)

- Mindestens 5, maximal 10 Items
- Maximal ein Accordion pro Landingpage
- Bei weniger als 5 Items müssen Inhalte ergänzt werden

## 10.3 Counter (`counter-animated`)

- Exakt 3 KPIs
- Maximal ein Counter-Modul
- Zahlenformat gemäß Vorgaben

## 10.4 Steps-Module (`steps-3col`, `steps-4col`)

- `steps-3col`: exakt 3 Steps
- `steps-4col`: exakt 4 Steps

Step-Headline:
- `steps-3col`: max. 32 Zeichen
- `steps-4col`: max. 16 Zeichen
- max. 1 Zeile

Step-Text:
- max. 90 Zeichen
- max. 2 Zeilen (`steps-4col`)
- exakt 3 Zeilen (`steps-3col`)
- Texte innerhalb eines Moduls sollten visuell ähnlich lang sein

## 10.5 Benefits-Module (`benefits-3col`, `benefits-2col`)

- `benefits-3col`: exakt 3 Benefits
- Titel einzeilig
- Text max. 160 Zeichen

## 10.6 Teaser-Split-Module

- Headline: max. 60 Zeichen
- Text: max. 140 Zeichen
- CTA-Label: max. 20 Zeichen
- Maximal eine CTA pro Teaser

## 10.7 eKomi Reviews (`ekomi-reviews`)

- Exakt 3 Reviews
- Maximal ein Modul
- Textlängen gemäß Vorgaben

## 10.8 Service Tiles (`servicetiles`)

### 10.8.1 Moduldefinition (verbindlich)

- Das Modul besteht aus **exakt 6 Tiles**.
- Desktop-Layout: `one-third`
- Mobile-Layout: `palm-one-half`
- Breakpoint: **668px**

### 10.8.2 Badge-Slot (verbindlich)

Jede Tile enthält einen festen Container:

```html
<div class="servicetiles__badge"></div>
```

Der Badge-Container ist struktureller Bestandteil des Moduls und darf nicht entfernt oder verschoben werden.

Innerhalb dieses Containers ist optional **genau ein **``**-Element** zulässig.

#### Badge-Spezifikation

- Format: **SVG**
- Canvas: **120 × 48 px**
- Desktop-Rendering: **120 × 48 px**
- Mobile-Rendering: **60 × 24 px**
- Keine zusätzlichen Wrapper
- Keine Inline-Styles

Nicht zulässig:

- PNG oder JPG
- Mehrere Badges pro Tile
- Größenänderungen außerhalb der definierten Desktop-/Mobile-Werte

### 10.8.3 Hover-Verhalten (verbindlich)

- Hover darf ausschließlich die Hintergrundfarbe verändern.
- Hover-Farbe wird ausschließlich über `lp-hover-sand` gesteuert.
- Keine Animationen von Größe oder Position.

## 10.9 action-tiles\_rle (`action-tiles_rle`)

Das Modul **action-tiles\_rle** ist strukturell und visuell fixiert.

Der LP Builder darf an diesem Modul **keine strukturellen oder inhaltlichen Veränderungen** vornehmen.

Textliche Anpassungen sind ausschließlich zulässig, wenn der User diese explizit anfordert.\
Ohne explizite User-Anweisung dürfen keine Texte automatisch verändert, optimiert oder ersetzt werden.

#### Struktur (verbindlich)

- Exakt **4 Tiles**
- Exakt **3 USP-Items**
- 1 Badge (SVG-Form)
- 1 Headline (h2)

Nicht zulässig:

- Hinzufügen oder Entfernen von Elementen
- Veränderung der Grid-Struktur
- Veränderung der Element-Hierarchie
- Änderung der Heading-Ebene
- Änderung des Responsive-Verhaltens

#### Badge

- Die SVG-Form darf nicht verändert werden.
- Die definierte Safe-Zone (**190 × 55 px**, vertikal bei **42%**) darf nicht verändert werden.
- Text darf die Safe-Zone nicht verlassen.

**Badge-Farbsteuerung**

Die Badge-Farbe darf ausschließlich über folgende Foundation-Klassen am Badge-Container gesteuert werden:

- `lp-color-teal` (Default)
- `lp-color-orange`
- `lp-color-yellow`
- `lp-color-blue`
- `lp-color-purple`
- `lp-color-charcoal`

Nicht zulässig:

- Andere Foundation-Farbklassen
- `lp-color-accent-*`
- Freie Hex-Werte
- Inline-Farbdefinitionen
- Änderung des SVG-`fill`-Attributs

**Sonderregel:**

- Wird `lp-color-charcoal` verwendet, muss der Badge-Text **weiß** sein.

#### Tiles

- Exakt 4 Tiles
- Icons sind fix und dürfen nicht ersetzt werden.
- Tile-Texte sind fix und dürfen nicht verändert werden.
- Keine zusätzliche CTA zulässig.

#### USP-Liste (Checkmarks)

- Exakt 3 USP-Items
- Checkmark-Icons dürfen nicht ersetzt oder entfernt werden.
- USP-Texte dürfen angepasst werden (nur bei expliziter User-Anweisung).
- Jeder USP muss **einzeilig** bleiben.

#### Hover

- Hover darf ausschließlich die Hintergrundfarbe der Tiles verändern.
- Keine Animation von Größe oder Position.
- Keine Shadow-Animation.

## 10.10 pricing-list (`pricing-list`)

Das Modul `pricing-list` ist strukturell und visuell fixiert.

Der LP Builder darf an diesem Modul keine strukturellen Veränderungen vornehmen.

Textliche Anpassungen sind ausschließlich innerhalb der vorgesehenen Text-Slots zulässig.

#### Struktur (verbindlich)

- Exakt 3 Pricing-Cards
- Desktop-Layout: `one-third`
- Mobile-Layout: `palm-one-whole`
- Grid-Struktur darf nicht verändert werden
- Keine zusätzliche Spalte zulässig
- Keine Entfernung bestehender Spalten zulässig
- Reihenfolge der Cards darf nicht verändert werden
- Keine Verschachtelung mit anderen Modulen zulässig

#### Inhalte & Elemente

Jede Pricing-Card besteht verbindlich aus:

1. Headline (h3)
2. Beschreibungstext
3. Preiszeile
4. Checkmark-Liste
5. Exakt einem Button

Nicht zulässig:

- Hinzufügen zusätzlicher Content-Blöcke
- Entfernen eines dieser Bestandteile
- Änderung der Heading-Ebene
- Hinzufügen zusätzlicher Text-Slots

#### Medien & Icons (verbindlich)

Das Modul enthält keine Media- oder Icon-Slots.

Nicht zulässig:

- Einfügen von `<img>`-Elementen
- Einfügen von SVGs
- Einfügen von Emojis
- Einfügen dekorativer Grafiken
- Umwandlung von Textelementen in Icon-Elemente

Die Checkmark-Icons innerhalb der Liste sind struktureller Bestandteil des Moduls und dürfen nicht ersetzt, entfernt oder ergänzt werden.

#### Checkmark-Liste

- Liste darf inhaltlich angepasst werden
- Struktur der Liste darf nicht verändert werden
- Keine zusätzlichen Icons innerhalb einzelner Listeneinträge
- Keine Verschachtelung weiterer Listen

#### CTA-Regel (verbindlich)

- Exakt 1 Button pro Pricing-Card
- Keine zusätzlichen Buttons
- Keine sekundären Textlinks
- Button-Typ darf nur innerhalb vorhandener Varianten gewechselt werden

#### Badge (verbindlich)

- Maximal 1 Badge pro Modul
- Badge darf auf Card 1, Card 2 oder Card 3 gesetzt werden
- Badge darf nicht vervielfacht werden
- Badge-Text darf nicht verändert werden
- Badge-Position (zentriert oberhalb der Card) darf nicht verändert werden
- Badge darf nicht entfernt oder verschoben werden, wenn es gesetzt ist

Nicht zulässig:

- Mehrere Badges gleichzeitig
- Badge auf mehreren Cards gleichzeitig
- Änderung der Positionierung
- Änderung der Farbklasse außerhalb der erlaubten Foundation-Klassen
- Inline-Farbdefinitionen

#### Layout & Styling

- Inline-Styles dürfen nicht erweitert oder strukturell verändert werden
- Bestehende Klassen dürfen nicht entfernt werden
- Keine zusätzlichen Layout-Wrapper
- Keine Veränderung von Flex-, Grid- oder Positionierungslogik

# 11.0 FOUNDATION COLORS (verbindlich)

Der LP Builder darf ausschließlich folgende Foundation-Farbklassen verwenden:
- lp-color-teal
- lp-color-orange
- lp-color-yellow
- lp-color-blue
- lp-color-purple
- lp-color-charcoal

Nicht zulässig:
- lp-color-accent-*
- freie Hex-Werte (z. B. style="color:#ff0000")
- Inline-Farbdefinitionen
- nicht definierte Foundation-Klassen

Die exakte Klassenbezeichnung muss gesetzt werden. Sprachliche Farbangaben (z. B. "gelb", "orange") dürfen nicht frei interpretiert werden; stattdessen muss eine erlaubte Foundation-Klasse verwendet werden.

### 11.1: NO AUTOMATIC COLOR MAPPING (verbindlich)

Der LP Builder darf **keine automatisch abgeleiteten oder stillschweigenden Farb-Mappings** vornehmen.

Regel:
- Wird eine nicht erlaubte Farbklasse (z. B. lp-color-accent-*, freie Hex-Werte, inline-styles) angefordert, muss die Anweisung **abgelehnt** werden.
- Es ist nicht zulässig, die Anfrage stillschweigend auf eine andere erlaubte Klasse (z. B. lp-color-charcoal) zu mappen.
- Stattdessen muss der Agent eine klare, nutzer-lesbare Ablehnungsantwort liefern und genau erlaubte Alternativen vorschlagen.

Beispiel-Antwort (verbindlich):
"Diese Farbklasse ist nicht zulässig. Erlaubte Alternativen sind: lp-color-teal, lp-color-orange, lp-color-yellow, lp-color-blue, lp-color-purple, lp-color-charcoal. Welche davon möchtest du verwenden?"
