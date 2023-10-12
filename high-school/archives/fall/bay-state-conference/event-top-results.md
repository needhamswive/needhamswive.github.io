---
title: Event Top Results

relay-events:
  - 200 Medley Relay
  - 200 Freestyle Relay
  - 400 Freestyle Relay
missing-years:
  - "2001"
  - "2002"
  - "2003"
---

{% assign event-order = site.data.high-school.results-event-order | map: "name" %}
{% assign all-event-results = site.data.high-school.fall.girls.meet-results.bay-state-conference.event-results %}
{% assign years = all-event-results | map: "year" | uniq | sort | reverse %}
{% assign years = years | concat: page.missing-years %}
{% assign years = years | uniq | sort | reverse %}

{% for event in event-order %}

## {{ event }}

<table>
  <thead>
    <tr>
      <th>Year</th>
      <th>Name</th>
      <th>School</th>
      <th>Result</th>
    </tr>
  </thead>
  <tbody>
    {% for year in years %}
      {% assign event-results-for-year-and-event = all-event-results | where: "year", year | where: "event", event %}
      {% assign row = event-results-for-year-and-event[0] %}
      <tr>
        <td>{{ year }}</td>
        <td>{{ row.name | replace: ";", "<br>" | replace: " ", "&nbsp;" | replace: "-", "&#8209;" }}</td>
        <td>{{ row.school | replace: " ", "&nbsp;" }}</td>
        <td>{{ row.result }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>

{% endfor %}
