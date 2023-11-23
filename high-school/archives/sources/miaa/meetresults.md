---
title: MeetResults
---

{% assign pages = site.data.high-school.archives.sources.miaa-meetresults %}
{% assign school-years = pages | map: "school-year" | compact | uniq | sort | reverse %}

{% include filter-year.html
  years = school-years %}

## MeetResults

{% include tables-mirrors.html
  school-years = school-years
  pages = pages
  mirror-root = "/high-school/archives/mirrors/miaa/meetresults?path="
  source-root = "http://www.meetresults.com/" %}
