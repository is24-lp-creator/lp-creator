# Module Creation Rules

Diese Datei definiert die technischen Regeln, die der Agent beim Erstellen von E‑Mail‑Modulen einhalten muss. Ziel ist es, Module zu erzeugen, die zuverlässig in allen relevanten E‑Mail‑Clients funktionieren und mit dem bestehenden Iterable‑Template kompatibel sind.

---

# 1. Grundprinzipien

## Table‑Based Layout
Alle Module müssen mit Tabellenstruktur gebaut werden.

Erlaubt:

<table>
<tr>
<td>

Nicht erlaubt:

<div>
<section>
<article>

Div‑Layouts dürfen nur innerhalb eines TDs verwendet werden, wenn es technisch notwendig ist.

---

## Containerbreite

Die maximale Inhaltsbreite beträgt 600px.

Module müssen so aufgebaut sein, dass sie innerhalb dieses Containers korrekt funktionieren.

---

# 2. CSS Regeln

## Vorhandene Template‑Klassen verwenden
Der Agent muss bevorzugt bestehende CSS‑Klassen aus dem Basis‑Template nutzen.

Beispiele:

font-heading-large-regular
font-body-large-regular
button
btn-pad
alignment

Neue CSS‑Klassen sollen nur erzeugt werden, wenn ein Modul sonst nicht darstellbar wäre.

Wenn neues CSS notwendig ist:

- Der Agent muss einen separaten CSS‑Block erzeugen
- Klar darauf hinweisen, dass dieses CSS in das Template integriert werden muss

---

## Keine globalen Styles im Modul

Module dürfen keine globalen Styles definieren.

Nicht erlaubt:

body {}
* {}

Erlaubt:

Inline‑Styles innerhalb von Elementen.

---

# 3. Spacing Regeln

Spacing darf nur über Padding innerhalb von TDs erfolgen.

Nicht erlaubt:

margin

Beispiel korrekt:

<td style="padding-bottom:20px;">

---

# 4. Bilder

Alle Bilder müssen folgende Regeln erfüllen:

- width Attribut vorhanden
- style="width:100%;max-width:XXXpx;height:auto;"
- alt Attribut vorhanden

Beispiel:

<img
src="image.jpg"
alt="Beschreibung"
width="520"
style="width:100%;max-width:520px;height:auto;">

---

# 5. Links

Alle Links müssen absolute URLs sein.

Beispiel:

https://www.example.com

Nicht erlaubt:

/example

---

# 6. Buttons

Buttons müssen Outlook‑kompatibel sein.

Wenn ein Button im Modul enthalten ist, muss ein VML Fallback für Outlook integriert werden.

Struktur:

- Standard HTML Button
- Conditional Comment für Outlook
- VML roundrect

Der Agent soll vorhandene Button‑Styles aus dem Template nutzen.

---

# 7. Variablen

Alle dynamischen Inhalte müssen Iterable Variablen verwenden.

Namenskonvention:

eb_<module>_<field>

Beispiele:

eb_hero_headline
eb_hero_cta_label
eb_teaser_1_image_url

---

## HTML Inhalte

Wenn ein Feld HTML enthalten darf, muss Triple Mustache verwendet werden.

Beispiel:

{{{ eb_hero_body_html }}}

Normale Textfelder verwenden:

{{ eb_hero_headline }}

---

# 8. Mobile Verhalten

Der Mobile Breakpoint liegt bei:

600px

Module müssen so aufgebaut sein, dass sie:

- auf Desktop korrekt angezeigt werden
- auf Mobile sauber umbrechen

Typische Regeln:

- Bilder: width 100%
- Mehrspaltige Layouts stacken auf Mobile

---

# 9. Accessibility

Der Agent muss folgende Punkte prüfen:

- Bilder haben alt‑Text
- Links haben sinnvolle Labels
- CTA Texte sind verständlich

---

# 10. QA Checklist

Der Agent prüft vor Ausgabe eines Moduls:

- Tabellenlayout verwendet
- keine globalen Styles
- keine margin Nutzung
- Bilder mit alt
- Variablen korrekt benannt
- JSON kompatibel
- mobile Verhalten geprüft

Diese Checkliste soll kurz im Output ausgegeben werden.

---

# Ziel

Diese Regeln stellen sicher, dass jedes Modul:

- mit dem bestehenden Template kompatibel ist
- in allen wichtigen Mail‑Clients funktioniert
- sauber in Iterable Snippets integriert werden kann.

