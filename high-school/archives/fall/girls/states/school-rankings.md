---
title: MIAA Fall Girls States Rankings
---

{% assign school-rankings = site.data.high-school.archives.fall.girls.meet-results.championships.states.school-rankings %}
{% assign years = school-rankings | map: "year" | uniq | sort | reverse %}
{% assign divisions = school-rankings | map: "division" | uniq | sort %}

{% include filter-division-year.html
  divisions = divisions
  years = years %}

{% for year in years %}

<div class="filter-section" data-option="year" data-section="{{ year }}" markdown="1">

## {{ year }}

{% assign school-rankings-for-year = school-rankings | where: "year", year | sort: "rank" %}
{% assign divisions = school-rankings-for-year | map: "division" | uniq | sort %}

{% for division in divisions %}

<div class="filter-section" data-option="division" data-section="{{ division }}" markdown="1">

### {{ division }} State

{% assign school-rankings-for-year-by-division = school-rankings-for-year | where: "division", division %}

{% include rankings.md
    rankings = school-rankings-for-year-by-division %}

</div>

{% endfor %}

</div>

{% endfor %}
