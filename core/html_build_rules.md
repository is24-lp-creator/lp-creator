# HTML Build Rules

Diese Datei definiert feste Regeln für den Aufbau von HTML-Modulen im Email Module Builder System.

Ziel ist es, konsistente, stabile und responsive Module zu erzeugen, die vollständig mit dem bestehenden Email-Template kompatibel sind.

Diese Datei ist die **Single Source of Truth für den HTML-Aufbau aller Module**.

---

# 1. Container Struktur

Module werden immer **innerhalb des bestehenden Email Templates** gerendert.

Das Template definiert:

- einen **600px Gesamtcontainer**
- eine **Contentbreite von 520px**
- `.column-padding` für horizontalen Abstand

Deshalb gilt:

Module dürfen **keinen eigenen äußeren Container erzeugen**.

Nicht erlaubt:

- zusätzliche Outer Tables
- eigene Containerbreiten
- horizontales Padding

Horizontaler Abstand wird ausschließlich über die Template-Klasse gesteuert:

```
.column-padding
```

---

# 2. Minimale Tabellenstruktur

Alle Module müssen eine minimale Tabellenstruktur besitzen.

Erlaubtes Minimum:

```
table
 └ tr
    └ td
```

Unnötige Wrapper müssen entfernt werden.

Regeln:

- keine verschachtelten Wrapper-Tabellen ohne Funktion
- keine div-Container für Layout
- Layout erfolgt ausschließlich über Tabellen

---

# 3. Contentbreite

Die maximale Contentbreite eines Moduls beträgt:

```
520px
```

Diese Breite ist die **zentrale Referenz für Layout und Bilder**.

---

# 4. Multi Column Layout

Multi-Column Layouts müssen immer mit festen Pixelwerten aufgebaut werden.

Die Gesamtbreite bleibt **520px**.

## Required Layout Skeleton (kritisch)

Alle Multi‑Column Module müssen mit folgendem strukturellen Grundgerüst beginnen.

Der Agent darf **keine alternative Tabellenstruktur erzeugen**.

Pflichtstruktur:

```
<table class="row-content stack" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
<tr>

<td class="column" ...>

[Column Content Table]

</td>

<td class="gap" width="20" style="font-size:0;line-height:0;">&nbsp;</td>

<td class="column" ...>

[Column Content Table]

</td>

</tr>
</table>
```

Wichtige Regeln:

- `.row-content stack` **muss auf der äußeren Tabelle liegen**.
- Jede Column muss die Klasse **`column`** besitzen.
- Zwischen Columns muss immer eine **Gap‑Zelle** existieren.
- Prozentbasierte Layouts oder alternative Tabellenstrukturen sind **nicht erlaubt**.

Dieses Skeleton stellt sicher, dass folgende Template‑Mechanismen funktionieren:

- Mobile Stack CSS
- Column Width Control
- Gap Spacing
- Mobile Stack Gap

Der Agent muss vor Ausgabe prüfen:

```
existiert .row-content stack?
existieren column Klassen?
existiert gap Struktur?
```

Wenn nicht → Layout automatisch neu aufbauen.

---

## 4.1 Two Column Layout

```
250px column
20px gap
250px column
```

HTML Struktur:

```
<td class="column" valign="top" style="width:250px;max-width:250px;"></td>
<td class="gap" width="20" style="font-size:0;line-height:0;">&nbsp;</td>
<td class="column" valign="top" style="width:250px;max-width:250px;"></td>
```

Wichtige Regeln:

- Prozentbasierte Layouts sind **nicht erlaubt**.
- Der Agent darf **niemals `width="50%"` oder ähnliche Prozentbreiten verwenden**.
- Das Layout muss immer aus **Column + Gap + Column** bestehen.

---

## 4.2 Three Column Layout

Um Rendering‑Probleme in Gmail zu vermeiden, werden Columns leicht kleiner als mathematisch notwendig definiert. Gmail kann Tabellenbreiten intern runden; dadurch können Layouts sonst umbrechen.

Deshalb wird folgende sichere Breite verwendet:

```
159px column
20px gap
159px column
20px gap
159px column
```

Diese Breite verhindert, dass Gmail Columns auf zwei Zeilen umbrechen lässt.

HTML Struktur:

```
<td class="column" valign="top" style="width:159px;max-width:159px;"></td>
<td class="gap" width="20" style="font-size:0;line-height:0;">&nbsp;</td>
<td class="column" valign="top" style="width:159px;max-width:159px;"></td>
<td class="gap" width="20" style="font-size:0;line-height:0;">&nbsp;</td>
<td class="column" valign="top" style="width:159px;max-width:159px;"></td>
```

---

## 4.3 Column Regeln

Spalten müssen folgende Regeln erfüllen:

- Spalten dürfen **kein width‑Attribut besitzen**.
- Breiten werden ausschließlich über Inline‑Styles gesetzt.
- `max-width` muss identisch zur `width` sein.
- Prozentbasierte Breiten (`50%`, `33%`, etc.) sind **verboten**.

Beispiel korrekt:

```
<td class="column" style="width:250px;max-width:250px;">
```

Nicht erlaubt:

```
<td width="50%">
```

Die Spalten-Tabelle selbst muss immer:

```
width="100%"
```

verwenden.

---

# 5. Gap Regeln

Gap-Spalten erzeugen ausschließlich horizontalen Abstand.

Regeln:

- Gap darf **keinen sichtbaren Inhalt enthalten**.
- Gap darf **keine zusätzlichen Layout-Styles besitzen**.
- Um Rendering-Probleme in Gmail zu verhindern, muss die Gap-Zelle ein `&nbsp;` enthalten.
- Zusätzlich muss `font-size:0` und `line-height:0` gesetzt werden, damit keine zusätzliche Höhe entsteht.

Beispiel (empfohlene finale Struktur):

```
<td class="gap" width="20" style="font-size:0;line-height:0;">&nbsp;</td>
```

Diese Struktur verhindert, dass Gmail Mobile leere Tabellenzellen entfernt oder kollabiert.

Ohne dieses `&nbsp;` kann Gmail den Abstand ignorieren, wodurch Columns ohne Abstand nebeneinander dargestellt werden.

---

# 6. Column Content Struktur

Jede Column muss eine eigene Content-Tabelle besitzen.

Struktur:

```
td.column
 └ table
    └ tr
       └ td
          content
```

Dies verhindert Renderingprobleme in Outlook.

---

# 7. Mobile Verhalten

Columns müssen auf Mobile automatisch untereinander stacken.

Die Klasse `stack` muss auf der **Spalten-Tabelle** liegen.

Beispiel:

```
<table class="row-content stack" width="100%">
```

Nicht erlaubt:

```
<tr class="stack">
```

Template CSS:

```
.stack .column {
 display:block !important;
 width:100% !important;
 max-width:100% !important;
}

.stack .gap {
 display:none !important;
}
```

## Stack Gap Regel (sehr wichtig)

Wenn Columns auf Mobile stacken, verschwindet der horizontale Gap (`.gap`).

Damit weiterhin Abstand zwischen den gestackten Elementen entsteht, darf der Agent **kein direktes `padding-bottom` inline setzen**, da dieses auch auf Desktop wirken würde.

Stattdessen wird eine spezielle Klasse verwendet:

```
mobile-stack-gap
```

Diese Klasse wird **nur auf Columns angewendet, die auf Mobile einen Abstand darunter benötigen**.

### Template CSS (muss im Basis-Template existieren)

```
@media (max-width:620px){

.stack .column.mobile-stack-gap {
 padding-bottom:20px !important;

}

}
```

### Two Column Layout

```
column 1 → class "column mobile-stack-gap"
column 2 → class "column"
```

Beispiel:

```
<td class="column mobile-stack-gap" valign="top" style="width:250px;max-width:250px;">
```

### Three Column Layout

```
column 1 → class "column mobile-stack-gap"
column 2 → class "column mobile-stack-gap"
column 3 → class "column"
```

Beispiel:

```
<td class="column mobile-stack-gap" valign="top" style="width:159px;max-width:159px;">
```

### Wichtige Regeln

- Die Klasse wird **nur auf Columns angewendet**, niemals auf Gap-Zellen.
- Die **letzte Column darf die Klasse nicht besitzen**.
- Dadurch entsteht auf Mobile derselbe visuelle Abstand wie auf Desktop.
- Auf Desktop bleibt das Layout unverändert, da das Padding nur innerhalb der Mobile Media Query aktiv ist.

---

# 8. Vertical Spacing

Spacing zwischen Elementen darf **nicht über margin erzeugt werden**.

Stattdessen:

```
<td style="padding-bottom:20px;">
```

---

# 9. Typography Regeln

Template Typografie muss immer verwendet werden.

Standard Body Text:

```
font-body-large-regular
```

Regeln:

Standard Text:

```
<p class="font-body-large-regular">
```

Kleinere Texte:

```
font-body-small-regular
```

---

## Template Typography Protection

Wenn eine Template Typografieklasse verwendet wird, dürfen folgende Inline-Styles **nicht gesetzt werden**:

Nicht erlaubt:

```
font-size
line-height
font-family
font-weight
```

Diese werden ausschließlich durch das Template gesteuert.

---

# 10. Image Regeln

Bilder müssen folgende Eigenschaften besitzen:

- `width` Attribut
- `alt` Attribut
- responsive Styles

Grundstruktur:

```
<img
 width="520"
 alt="Beschreibung"
 style="display:block;width:100%;max-width:520px;height:auto;border:0;">
```

---

# 11. Image Scaling Rule (kritisch)

Images innerhalb von Multi-Column Layouts dürfen **nicht die Column Width als max-width verwenden**.

Falsch:

```
width="250"
style="max-width:250px"
```

Richtig:

```
width="520"
style="max-width:520px"
```

Grund:

- Desktop → Column begrenzt Bild automatisch
- Mobile → Column wird 100%
- Bild darf auf volle Modulbreite wachsen

Ergebnis:

Images werden **auf Mobile Full Width**.

Diese Regel gilt für:

- 2 Column Layout
- 3 Column Layout
- Feature Grid
- Teaser Layouts

## Image Guardrail (sehr wichtig)

Der Agent darf **niemals die Column-Breite als Bildbreite verwenden**.

Nicht erlaubt:

```
width="250"
width="160"
max-width:250px
max-width:160px
```

Der Agent muss stattdessen **immer die Modulbreite als Referenz verwenden**.

Pflichtstruktur für Content Images:

```
<img
 width="520"
 alt="Beschreibung"
 style="display:block;width:100%;max-width:520px;height:auto;border-radius:24px;">
```

Vor der Ausgabe muss der Agent prüfen:

```
ist max-width kleiner als 520?
```

Wenn ja → automatisch korrigieren.

Diese Guardrail verhindert typische Fehler wie:

- Bilder bleiben auf Mobile zu klein
- Bilder wachsen nicht auf Full Width
- Inkonsistente Bildgrößen in Column Layouts


---

# 12. Image Typen

Es gibt zwei Arten von Bildern:

## Content Images

Beispiele:

- Hero Images
- Teaser Bilder
- Modulbilder

Eigenschaften:

```
border-radius:24px
```

Beispiel:

```
<img
 width="520"
 alt="Beschreibung"
 style="display:block;width:100%;max-width:520px;height:auto;border-radius:24px;">
```

---

## Icons

Icons sind kleine UI-Elemente.

Typische Größe:

```
24px – 64px
```

Icons dürfen **kein border-radius besitzen**.

Beispiel:

```
<img
 width="48"
 alt="Icon"
 style="display:block;width:100%;max-width:48px;height:auto;">
```

---

# 13. Buttons

Buttons müssen:

- Template Klassen verwenden
- VML Fallback für Outlook enthalten

Buttons dürfen **keine eigene Typografie definieren**.

---

# 14. Normalization Pass

## Layout Guardrail (kritisch)

Der Agent darf **niemals prozentbasierte Column Layouts erzeugen**.

Nicht erlaubt:

```
<td width="50%">
<td width="33%">
<td style="width:50%">
```

Wenn solche Strukturen aus importiertem HTML (z. B. Beefree) erkannt werden, müssen sie **zwingend in das definierte Column‑Gap System umgebaut werden**.

Erlaubte Layoutstruktur:

```
<td class="column" style="width:250px;max-width:250px;">
<td class="gap" width="20" style="font-size:0;line-height:0;">&nbsp;</td>
<td class="column" style="width:250px;max-width:250px;">
```

Der Agent muss vor der Ausgabe prüfen:

- enthält das Modul `%` Breiten?
- enthält das Modul `width="50%"`?

Wenn ja → Layout automatisch korrigieren.

---

Vor Ausgabe eines Moduls muss ein Cleanup erfolgen.

Der Agent muss automatisch:

1. horizontales Padding entfernen
2. Prozentbreiten entfernen
3. unnötige Wrapper entfernen
4. Tabellenstruktur vereinfachen
5. Inline Typografie entfernen
6. Template Klassen bevorzugen
7. Images auf Modulbreite normalisieren

---

# Ziel

Diese Regeln sorgen dafür, dass:

- Module stabil in allen Email Clients funktionieren
- das Template Layout nicht gebrochen wird
- Beefree HTML zuverlässig konvertiert wird
- Multi-Column Layouts korrekt auf Mobile stacken
- Bilder auf Mobile immer korrekt skalieren

