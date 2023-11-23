---
title: Flipsnack
---

{% assign pages = site.data.high-school.archives.sources.miaa-flipsnack %}
{% assign school-years = pages | map: "school-year" | compact | uniq | sort | reverse %}

{% include filter-year.html
  years = school-years %}

## EZStream

{% include tables-files.html
  school-years = school-years
  pages = pages %}
