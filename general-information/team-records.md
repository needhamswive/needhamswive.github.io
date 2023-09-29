---
title: Records
layout: single
---

## Team Records

<table>
  <thead>
    <tr>
      <th>Event</th>
      <th style="text-align: center;">Date</th>
      <th>Athlete(s)</th>
      <th style="text-align: center;">Result</th>
    </tr>
  </thead>
  <tbody>
    {% for record in site.data.records.needham.all-time %}
      <tr>
        <td>{{ record.event | replace: " ", "&nbsp;" | replace: "-", "–" }}</td>
        <td style="text-align: center;">{{ record.date | replace: ";", "<br>" }}</td>
        <td>{{ record.athletes | replace: ";", "<br>" | replace: " ", "&nbsp;" }}</td>
        <td style="text-align: center;">{{ record.result }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>

{% assign years = "" %}
{% for year in site.data.records.needham.bay-state-conference-champions.years %}
  {% assign shortened_year = year | slice: 2, 4 %}
  {% assign years = years | append: " '" | append: shortened_year %}
{% endfor %}

Bay State Conference Champions

: {{ years }}

{% assign years = "" %}
{% for year in site.data.records.needham.south-sectional-champions.years %}
  {% assign shortened_year = year | slice: 2, 4 %}
  {% assign years = years | append: " '" | append: shortened_year %}
{% endfor %}

South Sectional Champions
: {{ years }}

## Bay State Conference Records

<table>
  <thead>
    <tr>
      <th>Event</th>
      <th style="text-align: center;">Date</th>
      <th>Town</th>
      <th>Athlete(s)</th>
      <th style="text-align: center;">Result</th>
    </tr>
  </thead>
  <tbody>
    {% for record in site.data.records.bay-state-conference.all-time %}
      <tr>
        <td>{{ record.event | replace: " ", "&nbsp;" | replace: "-", "–" }}</td>
        <td style="text-align: center;">{{ record.date | replace: ";", "<br>" }}</td>
        <td>{{ record.town | replace: ";", "<br>" }}</td>
        <td>{{ record.athletes | replace: ";", "<br>" | replace: " ", "&nbsp;" }}</td>
        <td style="text-align: center;">{{ record.result }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>

## Bay State Conference Meet Records

<table>
  <thead>
    <tr>
      <th>Event</th>
      <th style="text-align: center;">Date</th>
      <th>Town</th>
      <th>Athlete(s)</th>
      <th style="text-align: center;">Result</th>
    </tr>
  </thead>
  <tbody>
    {% for record in site.data.records.bay-state-conference.meet %}
      <tr>
        <td>{{ record.event | replace: " ", "&nbsp;" | replace: "-", "–" }}</td>
        <td style="text-align: center;">{{ record.date | replace: ";", "<br>" }}</td>
        <td>{{ record.town | replace: ";", "<br>" }}</td>
        <td>{{ record.athletes | replace: ";", "<br>" | replace: " ", "&nbsp;" }}</td>
        <td style="text-align: center;">{{ record.result }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>
