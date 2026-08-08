---
regenerate: true
---

{% assign all-data = site.data.high-school.girls.past-seasons.s20252026.swim.individual %}
{% assign events = all-data | map: "Event" | uniq %}
{% assign athletes = all-data | map: "Athlete" | uniq %}

{% assign filtered-data = "" | split: "" %}

{% for athlete in athletes %}
  {% for event in events %}
    {% assign athlete-event-data = all-data | where: "Athlete", athlete | where: "Event", event %}
    {% assign best-time = athlete-event-data | not_where: "Time", nil | map: "Time" | sort | first %}
    {% assign best-athlete-event-data = athlete-event-data | where: "Time", best-time %}
    {% assign filtered-data = filtered-data | concat: best-athlete-event-data %}
  {% endfor %}
{% endfor %}

{% include filterable-datatable.html
  data=filtered-data
  enum-filters="Athlete Event" %}
