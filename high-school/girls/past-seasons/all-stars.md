---
title: Bay State Conference All Stars
---

{% assign current-year = site.data.high-school.variables.current-school-year %}
{% assign all-stars = site.data.high-school.archives.fall.girls.bay-state-conference.all-stars | where: "school", "Needham" %}

{% assign school-years = all-stars | not_where: "school-year", current-year | map: "school-year" | uniq | sort | reverse %}

{% for school-year in school-years %}

{% assign all-stars-for-year = all-stars | where: "year", year %}

## {{ school-year | format_school_year }}

{% for all-star in all-stars-for-year -%}
  {{ all-star.name }} <br>
{% endfor %}

{% endfor %}
