---
title: File Uploads
---

{% assign htm-pages = site.data.high-school.archives.sources.miaa-file-uploads-htm %}
{% assign htm-school-years = htm-pages | map: "school-year" | uniq | sort | reverse %}
{% assign pdf-pages = site.data.high-school.archives.sources.miaa-file-uploads-pdf %}
{% assign pdf-school-years = pdf-pages | map: "school-year" | uniq | sort | reverse %}
{% assign zip-pages = site.data.high-school.archives.sources.miaa-file-uploads-zip %}
{% assign zip-school-years = zip-pages | map: "school-year" | uniq | sort | reverse %}

{% assign school-years = htm-school-years | concat: pdf-school-years | uniq | sort | reverse %}

{% include filter-year.html
  years = school-years %}

## HTM Files

{% include tables-mirrors.html
  school-years = htm-school-years
  pages = htm-pages
  mirror-root = "/high-school/archives/mirrors/miaa/file-uploads?path="
  source-root = "https://miaa.net/wp-content/uploads/" %}

## PDF Files

{% include tables-archives.html
  school-years = pdf-school-years
  pages = pdf-pages %}

## ZIP Files

{% include tables-archives.html
  school-years = zip-school-years
  pages = zip-pages %}
