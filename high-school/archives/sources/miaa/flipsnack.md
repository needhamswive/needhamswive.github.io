---
title: Flipsnack
---

{% assign pages = site.data.high-school.archives.sources.miaa-flipsnack %}
{% assign school-years = pages | map: "school-year" | uniq | sort | reverse %}

{% include filter-year.html
  years = school-years %}

{% include tables-archives.html
  school-years = school-years
  pages = pages %}
