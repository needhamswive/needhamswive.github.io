---
title: Team Roster
---

{% include team-roster-key.html %}

---

{% assign current-school-year = site.data.high-school.variables.current-school-year %}
{% assign team-roster-for-school-year = site.data.high-school.girls.team-rosters | where: "school-year", current-school-year | first %}

{% include team-roster.html
  team-roster = team-roster-for-school-year %}
