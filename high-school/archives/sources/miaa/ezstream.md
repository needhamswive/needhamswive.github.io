---
title: EZStream
---

{% assign pages = site.data.high-school.archives.sources.miaa-ezstream %}
{% assign school-years = pages | map: "school-year" | uniq | sort | reverse %}

{% include filter-year.html
  years = school-years %}

{% include tables-mirrors.html
  school-years = school-years
  pages = pages
  mirror-root = "/high-school/archives/mirrors/miaa/ezstream?itemid="
  source-root = "http://miaa.ezstream.net/index.cfm?itemid=" %}
