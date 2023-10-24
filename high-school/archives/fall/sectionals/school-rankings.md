---
title: Sectionals School Rankings
---

{% assign south-school-rankings = site.data.high-school.fall.girls.meet-results.championships.sectionals.school-rankings %}
{% assign years = south-school-rankings | map: "year" | uniq | sort | reverse %}

{% for year in years -%}

## {{ year }}

{% assign school-rankings-for-year = south-school-rankings | where: "year", year | sort: "rank" %}
{% assign regions = school-rankings-for-year | map: "region" | uniq | sort %}

{% for region in regions %}

### {{ region }} Sectional

{% assign school-rankings-for-year-by-region = school-rankings-for-year | where: "region", region %}

{% include rankings.md
    rankings = school-rankings-for-year-by-region %}

{% endfor %}

{% endfor %}
