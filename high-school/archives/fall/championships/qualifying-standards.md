---
title: Qualifying Standards
---

{% assign event-order = site.data.high-school.results-event-order | map: "name" %}
{% assign all-qualifying-standards = site.data.high-school.fall.qualifying-standards %}
{% assign years = all-qualifying-standards | map: "year" | uniq %}

{% for year in years %}

{% assign qualifying-standards-for-year = all-qualifying-standards | where: "year", year %}
{% assign groups = qualifying-standards-for-year | map: "group" | uniq %}

## {{ year }}

<table>
  <thead>
    <tr>
      <th>Event</th>
      {% for group in groups %}
        <th>{{ group }}</th>
      {% endfor %}
    </tr>
  </thead>
  <tbody>
    {% for event in event-order %}
      <tr>
        <td>{{ event | replace: " ", "&nbsp;" }}</td>
        {% for group in groups %}
          {% assign qualifying-standard = qualifying-standards-for-year | where: "event", event | where: "group", group %}
          <td>{{ qualifying-standard.first.cutoff | replace: " ", "&nbsp;" }}</td>
        {% endfor %}
      </tr>
    {% endfor %}
  </tbody>
</table>

{% endfor %}