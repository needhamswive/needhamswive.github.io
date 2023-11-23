---
title: Swimming World
---

{% assign pages = site.data.high-school.archives.sources.miaa-swimmingworld %}
{% assign school-years = pages | map: "school-year" | uniq | sort | reverse %}

{% include filter-year.html
  years = school-years %}

{% include tables-mirrors.html
  school-years = school-years
  pages = pages
  mirror-root = "/high-school/archives/mirrors/miaa/swimming-world?path="
  source-root = "http://www.swimmingworldmagazine.com/" %}
