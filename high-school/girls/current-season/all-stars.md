---
title: Bay State Conference All Stars
---

{% assign current-school-year = site.data.high-school.variables.current-school-year %}
{% assign all-stars = site.data.high-school.archives.fall.girls.bay-state-conference.all-stars | where: "school", "Needham" | where: "school-year", current-school-year %}

{% for all-star in all-stars -%}
  {{ all-star.name }} <br>
{% endfor %}
