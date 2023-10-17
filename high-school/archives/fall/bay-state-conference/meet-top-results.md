---
title: Meet Top Results

missing-years:
  - 2003
  - 2002
  - 2001
---

{% assign event-order = site.data.high-school.results-event-order | map: "name" %}
{% assign all-event-results = site.data.high-school.fall.girls.meet-results.bay-state-conference.event-results %}
{% assign years = all-event-results | map: "year" %}
{% assign missing-years = page.missing-years | join: "," | split: "," %}
{% assign years = years | concat: missing-years %}
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
        <td>{{ year | formatcell }}</td>
        <td>{{ row.name | formatcell }}</td>
        <td>{{ row.school | formatcell }}</td>
        <td>{{ row.result | formatcell }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>

{% endfor %}
