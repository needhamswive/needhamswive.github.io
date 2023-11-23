---
title: Bay State Conference All Stars
---

{% assign all-stars = site.data.high-school.archives.fall.girls.bay-state-conference.all-stars %}

{% assign school-years = all-stars | map: "school-year" | uniq | sort | reverse %}

{% for school-year in school-years %}

{% assign all-stars-for-year = all-stars | where: "year", year %}
{% assign schools-for-year = all-stars | map: "school" | uniq | sort %}

## {{ school-year | format_school_year }}

{% for school in schools-for-year %}

{% assign all-stars-for-school-year-for-school = all-stars-for-year | where: "school", school %}

### {{ school }}

{% for all-star in all-stars-for-school-year-for-school -%}
  {{ all-star.name }} <br>
{% endfor %}

{% endfor %}

{% endfor %}
