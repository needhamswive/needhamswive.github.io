---
title: Records History
---

{% assign events = site.data.records-event-order | map: "name" %}
{% assign team-records = site.data.records.needham.all-time %}
{% assign conference-records = site.data.records.bay-state-conference.all-time %}
{% assign conference-meet-records = site.data.records.bay-state-conference.meet %}

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
    {% for event in events %}
      <tr>
        <td colspan="3" style="font-weight: bold; text-align: center;">{{ event | replace: "-", "–" }}</td>
      </tr>
      {% assign records-for-event = team-records | where: "event", event %}
      {% for record in records-for-event %}
        <tr>
          <td style="text-align: center;">{{ record.date | replace: ";", "<br>" }}</td>
          <td>{{ record.athletes | replace: ";", "<br>" | replace: " ", "&nbsp;" }}</td>
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
      <th>Town</th>
      <th>Athlete(s)</th>
      <th style="text-align: center;">Result</th>
    </tr>
  </thead>
  <tbody>
    {% for event in events %}
      <tr>
        <td colspan="4" style="font-weight: bold; text-align: center;">{{ event | replace: "-", "–" }}</td>
      </tr>
      {% assign records-for-event = conference-records | where: "event", event %}
      {% for record in records-for-event %}
        <tr>
          <td>{{ record.town | replace: ";", "<br>" }}</td>
          <td style="text-align: center;">{{ record.date | replace: ";", "<br>" }}</td>
          <td>{{ record.athletes | replace: ";", "<br>" | replace: " ", "&nbsp;" }}</td>
          <td style="text-align: center;">{{ record.result }}</td>
        </tr>
      {% endfor %}
    {% endfor %}
  </tbody>
</table>