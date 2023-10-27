---
title: Conference Meet Results
---

{% assign events = site.data.high-school.results-event-order | map: "name" %}
{% assign all-event-results = site.data.high-school.archives.fall.girls.meet-results.bay-state-conference.event-results %}
{% assign years = all-event-results | map: "year" | uniq | sort | reverse %}

{% include filter-year.html
  keys = years %}

{% for year in years %}

{% assign event-results-for-year = all-event-results | where: "year", year %}

<div class="filter-section" data-key="{{ year }}" markdown="1">

## {{ year }}

<table>
  <thead>
    <tr>
      <th>Place</th>
      <th>Name</th>
      <th>Age</th>
      <th>School</th>
      <th>Result</th>
      <th>Points</th>
    </tr>
  </thead>
  <tbody>
    {% for event in events %}
      {% assign event-results = event-results-for-year | where: "event", event %}
      <tr>
        <th colspan="5" style="text-align: center;">{{ event }}</th>
      </tr>
      {% for row in event-results %}
        <tr>
          <td>{{ row.place | formatcell }}</td>
          <td>{{ row.name | formatcell }}</td>
          <td>{{ row.age | formatcell }}</td>
          <td>{{ row.school | formatcell }}</td>
          <td>{{ row.result | formatcell }}</td>
          <td>{{ row.points | formatcell }}</td>
        </tr>
      {% endfor %}
    {% endfor %}
  </tbody>
</table>

</div>

{% endfor %}
