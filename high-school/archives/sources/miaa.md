---
title: MIAA
toc: true
---

- [Google Drive &mdash; Championships](https://drive.google.com/drive/folders/1Yvc2cuFhiRp0icxetim74FQdanshrdXL)
- [Google Drive &mdash; Documents](https://drive.google.com/drive/folders/1ajhF4o7OlnOp7vwN4NNbpAxM7h_AcU-Y)

## EZStream

{% assign pages = site.data.high-school.archives.sources.miaa-ezstream %}

{% assign years = pages | map: "year" | compact | uniq | sort | reverse %}

{% include filter-year.html
  years = years %}

{% for year in years %}

{% assign pages-for-year = pages | where: "year", year %}

<div class="filter-section" data-option="year" data-section="{{ year }}">

<table>
  <thead>
    <th colspan="2" style="text-align: center;">{{year}}</th>
  </thead>
  <tbody>
    {% for page in pages-for-year %}
      <tr>
        <td><a href="/high-school/archives/mirrors/miaa/ezstream?itemid={{ page.itemid }}">mirror</a></td>
        <td><a href="http://miaa.ezstream.net/index.cfm?itemid={{ page.itemid }}">{{ page.title }}</a></td>
      </tr>
    {% endfor %}
  </tbody>
</table>

</div>

{% endfor %}

## MeetResults

{% assign pages = site.data.high-school.archives.sources.miaa-meetresults %}

{% assign years = pages | map: "year" | compact | uniq | sort | reverse %}

{% for year in years %}

{% assign pages-for-year = pages | where: "year", year %}

<table>
  <thead>
    <th colspan="2" style="text-align: center;">{{year}}</th>
  </thead>
  <tbody>
    {% for page in pages-for-year %}
      <tr>
        <td><a href="/high-school/archives/mirrors/miaa/meetresults?path={{ page.path }}">mirror</a></td>
        <td><a href="http://www.meetresults.com/{{ page.path }}">{{ page.title }}</a></td>
      </tr>
    {% endfor %}
  </tbody>
</table>

{% endfor %}

## Swimming World

{% assign pages = site.data.high-school.archives.sources.miaa-swimmingworld %}

{% assign years = pages | map: "year" | compact | uniq | sort | reverse %}

{% for year in years %}

{% assign pages-for-year = pages | where: "year", year %}

<table>
  <thead>
    <th colspan="2" style="text-align: center;">{{year}}</th>
  </thead>
  <tbody>
    {% for page in pages-for-year %}
      <tr>
        <td><a href="/high-school/archives/mirrors/miaa/swimmingworld?path={{ page.path }}">mirror</a></td>
        <td><a href="http://www.swimmingworldmagazine.com/{{ page.path }}">{{ page.title }}</a></td>
      </tr>
    {% endfor %}
  </tbody>
</table>

{% endfor %}
