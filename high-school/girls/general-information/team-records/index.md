---
title: Records
---

{% assign championship-events = site.data.records-championship-event-order | map: "name" %}
{% assign dual-meet-events = site.data.records-dual-meet-event-order | map: "name" %}
{% assign team-records = site.data.records.needham.all-time %}
{% assign conference-records = site.data.records.bay-state-conference.all-time %}
{% assign conference-meet-records = site.data.records.bay-state-conference.meet %}

A history of the records can be found [here](/high-school/girls/general-information/team-records/history).

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
    {% for event in championship-events %}
      {% assign records-for-event = team-records | where: "event", event %}
      {% assign record = records-for-event[0] %}
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
    {% for event in championship-events %}
      {% assign records-for-event = conference-records | where: "event", event %}
      {% assign record = records-for-event[0] %}
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

These records are from results since 1990.

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
    {% for event in dual-meet-events %}
      {% assign records-for-event = conference-meet-records | where: "event", event %}
      {% assign record = records-for-event[0] %}
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
