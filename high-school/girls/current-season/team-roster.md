---
title: Team Roster
---

{% include team-roster-key.html %}

---

{% assign current-year = site.data.high-school.girls.variables.current-year %}
{% assign team-roster = site.data.high-school.girls.team-rosters | where: "year", current-year | first %}

{% include team-roster.html
  team-roster = team-roster %}
