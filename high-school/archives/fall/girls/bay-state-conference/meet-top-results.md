---
title: Fall Girls BSC Meet Top Results

missing-years:
  - 2003
  - 2002
  - 2001
---

{% assign events = site.data.high-school.event-order.dual-meet-results %}
{% assign all-event-results = site.data.high-school.archives.fall.girls.bay-state-conference.event-results %}
{% assign years = all-event-results | map: "year" %}
{% assign missing-years = page.missing-years | join: "," | split: "," %}
{% assign years = years | concat: missing-years %}
{% assign years = years | uniq | sort | reverse %}

{% include filter-event.html
  events = events %}

{% for event in events %}

<div class="filter-section" data-option="event" data-section="{{ event }}" markdown="1">

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
        <td>{{ year | format_cell }}</td>
        <td>{{ row.name | format_cell }}</td>
        <td>{{ row.school | format_cell }}</td>
        <td>{{ row.result | format_cell }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>

</div>

{% endfor %}
