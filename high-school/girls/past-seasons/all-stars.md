---
title: Bay State Conference All Stars
---

{% assign current-year = site.data.high-school.girls.variables.current-year %}
{% assign all-stars = site.data.high-school.archives.fall.girls.bay-state-conference.all-stars | where: "school", "Needham" %}

{% assign years = all-stars | map: "year" | uniq | sort | reverse %}

{% for year in years %}

{% if year == current-year %}
  {% continue %}
{% endif %}

{% assign all-stars-for-year = all-stars | where: "year", year %}

## {{ year }}

{% for all-star in all-stars-for-year -%}
  {{ all-star.name }} <br>
{% endfor %}

{% endfor %}
