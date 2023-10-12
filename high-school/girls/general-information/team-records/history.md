---
title: Records History
---

{% assign championship-events = site.data.high-school.records-championship-event-order | map: "name" %}
{% assign dual-meet-events = site.data.high-school.records-dual-meet-event-order | map: "name" %}
{% assign team-records = site.data.high-school.fall.girls.records.needham.all-time %}
{% assign conference-records = site.data.high-school.fall.girls.records.bay-state-conference.all-time %}
{% assign conference-meet-records = site.data.high-school.fall.girls.records.bay-state-conference.meet %}

## Team Records

<table>
  <thead>
    <tr>
      <th style="text-align: center;">Date</th>
      <th>Athlete(s)</th>
      <th style="text-align: center;">Result</th>
    </tr>
  </thead>
  <tbody>
    {% for event in championship-events %}
      <tr>
        <td colspan="3" style="font-weight: bold; text-align: center;">{{ event | replace: "-", "–" }}</td>
      </tr>
      {% assign records-for-event = team-records | where: "event", event %}
      {% for record in records-for-event %}
        <tr>
          <td style="text-align: center;">{{ record.date | replace: ";", "<br>" }}</td>
          <td>{{ record.name | replace: ";", "<br>" | replace: " ", "&nbsp;" }}</td>
          <td style="text-align: center;">{{ record.result }}</td>
        </tr>
      {% endfor %}
    {% endfor %}
  </tbody>
</table>

## Bay State Conference Records

<table>
  <thead>
    <tr>
      <th style="text-align: center;">Date</th>
      <th>School</th>
      <th>Athlete(s)</th>
      <th style="text-align: center;">Result</th>
    </tr>
  </thead>
  <tbody>
    {% for event in championship-events %}
      <tr>
        <td colspan="4" style="font-weight: bold; text-align: center;">{{ event | replace: "-", "–" }}</td>
      </tr>
      {% assign records-for-event = conference-records | where: "event", event %}
      {% for record in records-for-event %}
        <tr>
          <td style="text-align: center;">{{ record.date | replace: ";", "<br>" }}</td>
          <td>{{ record.school | replace: ";", "<br>" }}</td>
          <td>{{ record.name | replace: ";", "<br>" | replace: " ", "&nbsp;" }}</td>
          <td style="text-align: center;">{{ record.result }}</td>
        </tr>
      {% endfor %}
    {% endfor %}
  </tbody>
</table>

## Bay State Conference Meet Records

This record history is from results since 1990.

<table>
  <thead>
    <tr>
      <th style="text-align: center;">Date</th>
      <th>School</th>
      <th>Athlete(s)</th>
      <th style="text-align: center;">Result</th>
    </tr>
  </thead>
  <tbody>
    {% for event in dual-meet-events %}
      <tr>
        <td colspan="4" style="font-weight: bold; text-align: center;">{{ event | replace: "-", "–" }}</td>
      </tr>
      {% assign records-for-event = conference-meet-records | where: "event", event %}
      {% for record in records-for-event %}
        <tr>
          <td style="text-align: center;">{{ record.date | replace: ";", "<br>" }}</td>
          <td>{{ record.school | replace: ";", "<br>" }}</td>
          <td>{{ record.name | replace: ";", "<br>" | replace: " ", "&nbsp;" }}</td>
          <td style="text-align: center;">{{ record.result }}</td>
        </tr>
      {% endfor %}
    {% endfor %}
  </tbody>
</table>
