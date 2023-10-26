---
title: States School Rankings
---

{% assign south-school-rankings = site.data.high-school.fall.girls.meet-results.championships.states.school-rankings %}
{% assign years = south-school-rankings | map: "year" | uniq | sort | reverse %}

{% for year in years %}

## {{ year }}

{% assign school-rankings-for-year = south-school-rankings | where: "year", year | sort: "rank" %}
{% assign divisions = school-rankings-for-year | map: "division" | uniq | sort %}

{% for division in divisions %}

### {{ division }} State

{% assign school-rankings-for-year-by-division = school-rankings-for-year | where: "division", division %}

{% include rankings.md
    rankings = school-rankings-for-year-by-division %}

{% endfor %}

{% endfor %}
