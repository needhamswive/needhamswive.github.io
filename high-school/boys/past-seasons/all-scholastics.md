---
title: All Scholastics
---

{% assign all-scholastics = site.data.high-school.boys.all-scholastics %}

{% assign school-years = all-scholastics | map: "school-year" | uniq | sort | reverse %}

{% for school-year in school-years %}

{% assign all-scholastics-for-year = all-scholastics | where: "school-year", school-year %}

## {{ school-year | format_school_year }}

{% for all-scholastic in all-scholastics-for-year -%}
  {{ all-scholastic.name }} &mdash; {{ all-scholastic.event }} <br>
{% endfor %}

{% endfor %}
