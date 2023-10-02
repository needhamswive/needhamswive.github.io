---
title: Event Results
---

{% assign all-event-results = site.data.meet-results.bay-state-conference.event-results %}
{% assign years = all-event-results | map: "year" | uniq | sort | reverse %}

{% for year in years %}

{% assign event-results-for-year = all-event-results | where: "year", year %}

## {{ year }}

<table>
  <thead>
    <tr>
      <th>Place</th>
      <th>Name</th>
      <th>School</th>
      <th>Result</th>
      <th>Points</th>
    </tr>
  </thead>
  <tbody>
    {% for event in site.data.event-order %}
      <tr>
        <th colspan="5" style="text-align: center;">{{ event.name }}</th>
      </tr>
      {% assign event-results = event-results-for-year | where: "event", event.name %}
      {% for row in event-results %}
        <tr>
          <td>{{ row.place }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.school }}</td>
          <td>{{ row.result }}</td>
          <td>{{ row.points }}</td>
        </tr>
      {% endfor %}
    {% endfor %}
  </tbody>
</table>

{% endfor %}
