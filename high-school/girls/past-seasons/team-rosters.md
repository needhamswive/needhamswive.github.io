---
title: Team Rosters
---

The roster from 2020 is missing. \
Rosters prior to 2014 may be incomplete.

{% include team-roster-key.html %}

---

{% assign current-year = site.data.high-school.girls.variables.current-year %}
{% assign team-rosters = site.data.high-school.girls.team-rosters %}
{% assign years = team-rosters | not_where: "year", current-year | map: "year" %}

{% include filter-year.html
  years = years %}

{% for team-roster in team-rosters %}

{% if team-roster.year == current-year %}
  {% continue %}
{% endif %}

<div class="filter-section" data-option="year" data-section="{{ team-roster.year }}" markdown="1">

## {{ team-roster.year }}

{% include team-roster.html
  team-roster = team-roster %}

</div>

{% endfor %}
