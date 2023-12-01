---
title: Team Records
---

{% assign events = site.data.high-school.event-order.records %}
{% assign records = site.data.high-school.girls.records.all-time %}

Bay State Conference records can be found [here](/high-school/archives/fall/girls/bay-state-conference/records/). \
A history of the records can be found [here](/high-school/girls/general-information/team-records/history).

## Team Records

{% include records.html
  events = events
  records = records %}

{% assign years = "" %}
{% for year in site.data.high-school.girls.records.bay-state-conference-champions.years %}
  {% assign shortened_year = year | slice: 2, 4 %}
  {% assign years = years | append: " '" | append: shortened_year %}
{% endfor %}

Bay State Conference Champions
: {{ years }}

{% assign years = "" %}
{% for year in site.data.high-school.girls.records.south-sectional-champions.years %}
  {% assign shortened_year = year | slice: 2, 4 %}
  {% assign years = years | append: " '" | append: shortened_year %}
{% endfor %}

South Sectional Champions
: {{ years }}

{% assign years = "" %}
{% for year in site.data.high-school.girls.records.division-1-state-champions.years %}
  {% assign shortened_year = year | slice: 2, 4 %}
  {% assign years = years | append: " '" | append: shortened_year %}
{% endfor %}

Division 1 State Champions
: {{ years }}
