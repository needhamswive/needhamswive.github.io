---
title: Team Records
---

{% assign events = site.data.high-school.event-order.championship-records %}
{% assign records = site.data.high-school.boys.records.all-time %}

<!-- Bay State Conference records can be found [here](/high-school/archives/fall/girls/bay-state-conference/records/). \ -->
A history of the records can be found [here](/high-school/boys/general-information/team-records/history).

## Team Records

{% include records.html
  events = events
  records = records %}

{% assign years = "" %}
{% for year in site.data.high-school.boys.records.bay-state-conference-champions.years %}
  {% assign shortened_year = year | slice: 2, 4 %}
  {% assign years = years | append: " '" | append: shortened_year %}
{% endfor %}

Bay State Conference Champions
: {{ years }}

{% assign years = "" %}
{% for year in site.data.high-school.boys.records.south-sectional-champions.years %}
  {% assign shortened_year = year | slice: 2, 4 %}
  {% assign years = years | append: " '" | append: shortened_year %}
{% endfor %}

South Sectional Champions
: {{ years }}
