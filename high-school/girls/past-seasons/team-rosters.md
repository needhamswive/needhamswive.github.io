---
title: Team Rosters
---

The roster from 2020 is missing. \
Rosters prior to 2014 may be incomplete.

{% include team-roster-key.html %}

---

{% assign current-school-year = site.data.high-school.variables.current-school-year %}
{% assign team-rosters = site.data.high-school.girls.team-rosters | not_where: "school-year", current-school-year %}
{% assign school-years = team-rosters | map: "school-year" %}

{% include filter-year.html
  years = school-years %}

{% for team-roster in team-rosters %}

<div class="filter-section" data-option="year" data-section="{{ team-roster.year }}" markdown="1">

## {{ team-roster.school-year | format_school_year }}

{% include team-roster.html
  team-roster = team-roster %}

</div>

{% endfor %}
