---
title: Bay State Conference All Stars
---

{% assign current-year = site.data.high-school.girls.variables.current-year %}
{% assign all-stars = site.data.high-school.archives.fall.girls.bay-state-conference.all-stars | where: "school", "Needham" | where: "year", current-year %}

{% for all-star in all-stars -%}
  {{ all-star.name }} <br>
{% endfor %}
