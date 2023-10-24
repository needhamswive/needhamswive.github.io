---
title: Sectionals School Rankings
---

{% assign south-school-rankings = site.data.high-school.fall.girls.meet-results.championships.sectionals.school-rankings %}
{% assign years = south-school-rankings | map: "year" | uniq | sort | reverse %}

{% for year in years -%}

## {{ year }}

{% assign school-rankings-for-year = south-school-rankings | where: "year", year | sort: "rank" %}
{% assign divisions = school-rankings-for-year | map: "division" | uniq | sort %}

{% for division in divisions %}

### {{ division }} Sectional

{% assign school-rankings-for-year-by-division = school-rankings-for-year | where: "division", division %}

{% include rankings.md
    rankings = school-rankings-for-year-by-division %}

{% endfor %}

{% endfor %}
