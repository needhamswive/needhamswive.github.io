---
title: Bay State Conference All Stars
---

{% assign all-stars = site.data.high-school.archives.fall.girls.bay-state-conference.all-stars %}

{% assign years = all-stars | map: "year" | uniq | sort | reverse %}

{% for year in years %}

{% if year == current-year %}
  {% continue %}
{% endif %}

{% assign all-stars-for-year = all-stars | where: "year", year %}
{% assign schools-for-year = all-stars | map: "school" | uniq | sort %}

## {{ year }}

{% for school in schools-for-year %}

{% assign all-stars-for-year-for-school = all-stars-for-year | where: "school", school %}

### {{ school }}

{% for all-star in all-stars-for-year-for-school -%}
  {{ all-star.name }} <br>
{% endfor %}

{% endfor %}

{% endfor %}
