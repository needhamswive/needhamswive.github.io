---
title: MIAA
toc: true
---

- [Google Drive &mdash; Championships](https://drive.google.com/drive/folders/1Yvc2cuFhiRp0icxetim74FQdanshrdXL)
- [Google Drive &mdash; Documents](https://drive.google.com/drive/folders/1ajhF4o7OlnOp7vwN4NNbpAxM7h_AcU-Y)

{% assign ezstream-pages = site.data.high-school.archives.sources.miaa-ezstream %}
{% assign ezstream-school-years = ezstream-pages | map: "school-year" | compact | uniq | sort | reverse %}

{% assign meetresults-pages = site.data.high-school.archives.sources.miaa-meetresults %}
{% assign meetresults-school-years = meetresults-pages | map: "school-year" | compact | uniq | sort | reverse %}

{% assign swimmingworld-pages = site.data.high-school.archives.sources.miaa-swimmingworld %}
{% assign swimmingworld-school-years = swimmingworld-pages | map: "school-year" | compact | uniq | sort | reverse %}

{% assign school-years = ezstream-school-years | concat: meetresults-school-years | concat: swimmingworld-school-years %}

{% include filter-year.html
  years = school-years %}

## EZStream

{% include mirror-tables.html
  school-years = ezstream-school-years
  pages = ezstream-pages
  mirror-root = "/high-school/archives/mirrors/miaa/ezstream?itemid="
  source-root = "https://miaa.ezstream.net/index.cfm?itemid=" %}

## MeetResults

{% include mirror-tables.html
  school-years = meetresults-school-years
  pages = meetresults-pages
  mirror-root = "/high-school/archives/mirrors/miaa/meetresults?path="
  source-root = "http://www.meetresults.com/" %}

## Swimming World

{% include mirror-tables.html
  school-years = swimmingworld-school-years
  pages = swimmingworld-pages
  mirror-root = "/high-school/archives/mirrors/miaa/swimmingworld?path="
  source-root = "http://www.swimmingworldmagazine.com/" %}
