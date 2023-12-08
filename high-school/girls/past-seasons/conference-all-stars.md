---
title: Bay State Conference All Stars
---

{% assign all-stars = site.data.high-school.archives.fall.girls.bay-state-conference.all-stars | where: "school", "Needham" %}
{% assign honorable-mentions = site.data.high-school.archives.fall.girls.bay-state-conference.honorable-mentions | where: "school", "Needham" %}
{% assign school-years = all-stars | map: "school-year" | uniq | sort | reverse %}

{% for school-year in school-years %}

{% assign all-stars-for-year = all-stars | where: "school-year", school-year %}
{% assign honorable-mention = honorable-mentions | where: "school-year", school-year | first %}

## {{ school-year | format_school_year }}

{% for all-star in all-stars-for-year -%}
  {{ all-star.name }} <br>
{% endfor %}

{% if honorable-mention %}
  _Honorable Mention:_ {{ honorable-mention.name }}
{% endif %}

{% endfor %}
