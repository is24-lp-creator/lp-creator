Diese Datei definiert **verbindliche modul‑spezifische Regeln** für den LP Creator.
Sie ergänzt den **Systemprompt**, der Aufbau, Rendering und technische Guardrails steuert.

Die hier definierten Regeln sind **hart einzuhalten**.
Wenn ein Regelkonflikt entsteht, ist der **Inhalt anzupassen**, nicht die Modul‑Struktur.

---

## Grundprinzip

- Diese Datei ist die **Single Source of Truth** für modul‑spezifische Definitionen.
- Sie regelt **Mengen, Textlängen, Wiederholungen und inhaltliche Mindestanforderungen**.
- Sie enthält **keine HTML‑, CSS‑ oder JS‑Regeln**.
- Modul‑Strukturen sind ausschließlich in `core-components.html` definiert.

---

## MODULE: hero-split
## MODULE: hero-bleed

- Maximal **1 Hero‑Modul** pro Seite.
- Das Hero‑Modul muss **immer das erste Modul** der Seite sein.
- **Headline:** max. **80 Zeichen**.
- **Subline / Einleitungstext:** max. **200 Zeichen**.
- **CTA‑Label:** max. **30 Zeichen**.

---

## MODULE: steps-3col

- **Anzahl Steps:** exakt **3**.
- **Step‑Headline:** max. **18 Zeichen** (muss einzeilig bleiben).
- **Step‑Text:** max. **180 Zeichen**.

---

## MODULE: steps-4col

- **Anzahl Steps:** exakt **4**.
- **Step‑Headline:** max. **14 Zeichen**.
- **Step‑Text:** max. **180 Zeichen**.

---

## MODULE: benefits-3col

- **Anzahl Benefits:** exakt **3**.
- **Benefit‑Titel:** muss einzeilig bleiben.
- **Benefit‑Text:** max. **160 Zeichen**.

---

## MODULE: benefits-2col

- **Anzahl Benefits:** flexibel (typisch **4**).
- **Benefit‑Titel:** muss einzeilig bleiben.
- **Benefit‑Text:** max. **160 Zeichen**.

---

## MODULE: accordion

- **Anzahl Items:** mindestens **5**, maximal **10**.
- **Maximal 1 Accordion** pro Seite.
- **Fragen:** kurz, klar, ein Satz.
- **Antworten:** erklärend, mehr als ein Satz, kein Bullet‑Stil.
- **Enforcement (verbindlich):** Wenn weniger als **5** inhaltlich sinnvolle Fragen vorliegen, müssen **zusätzliche passende Fragen ergänzt** werden, bis die Mindestanzahl erreicht ist. Es ist **nicht zulässig**, das Accordion mit weniger als 5 Items zu rendern.

---

## MODULE: counter-animated

- **Anzahl KPIs:** exakt **3**.
- **Maximal 1 Counter‑Modul** pro Seite.

**Zahlenformat (kritisch):**
- Der **sichtbare KPI‑Wert muss immer einen numerischen Zahlenwert enthalten** (Ziffern 0–9).
- **Reine Wortwerte sind nicht zulässig** (z. B. `Tausende`, `Viele`, `Mehrere`, `Unzählige`).
- Zulässig sind **Zahlen mit optionalen, nicht animierten Zusätzen** (z. B. `95%`, `365 Tage`, `3 Min.`, `10.000+`).
- **Animiert wird ausschließlich der numerische Anteil** des Wertes.
- Der animierte Teil darf **nur Ziffern** enthalten (0–9).
- Dezimaltrennzeichen **. oder ,** sind erlaubt.
- **Nicht erlaubt im animierten Teil:** %, +, Wörter, Einheiten, Leerzeichen.
- Zusätze (Einheiten, %, Wörter wie `Tage`, `Min.`) müssen **visuell im Wert stehen**, aber **außerhalb der Animation** liegen.

- **Label:** max. **40 Zeichen**.
- **Beschreibung (optional):** max. **120 Zeichen**.
- Zahlen müssen **plausibel und belegbar** sein.

---

## MODULE: teaser-split-image-right
## MODULE: teaser-split-image-left

- **Headline:** max. **60 Zeichen**.
- **Text:** max. **140 Zeichen**.
- **CTA‑Label:** max. **20 Zeichen**.
- **Maximal 1 CTA** pro Teaser.

---

## MODULE: ekomi-reviews

- **Anzahl Reviews:** exakt **3**.
- **Maximal 1 eKomi‑Modul** pro Seite.
- **Headline:** max. **80 Zeichen**.
- **Intro‑Text:** max. **200 Zeichen**.
- **Review‑Text:** max. **300 Zeichen**.

---

## MODULE: servicetiles

- Modul ist **vollständig vordefiniert**.
- **Immer exakt 6 Tiles**.
- Inhalte dürfen **nicht verändert** werden.
- Modul darf **nur vollständig** verwendet oder weggelassen werden.

---

*Weitere Module werden nur ergänzt, wenn sie im MVP getestet und explizit freigegeben sind.*

