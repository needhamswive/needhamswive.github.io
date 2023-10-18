---
title: Dual Meet Results
classes: wide
---

<style>
  td {
    border: 1px solid #b6b6b6;
    text-align: center;
    padding: 0;
    width: 50px;
  }

  .neutral {
    background-color: #b6b6b6;
  }

  .win {
    background-color: #7abd91;
  }

  .loss {
    background-color: #ff6962;
  }
</style>

{% assign dual-meet-results = site.data.high-school.fall.girls.meet-results.bay-state-conference.dual-meet-results %}
{% assign dual-meet-results-citations = site.data.high-school.fall.girls.meet-results.bay-state-conference.dual-meet-results-citations %}
{% assign years = dual-meet-results | map: "year" | uniq %}

{% for year in years %}

{% assign dual-meet-results-for-year = dual-meet-results | where: "year", year %}
{% assign dual-meet-results-citations-for-year = dual-meet-results-citations | where: "year", year %}
{% assign schools = dual-meet-results-for-year | map: "school-1" | uniq %}

<div markdown="1">
## {{ year }}

{% for citation in dual-meet-results-citations-for-year %}[^{{ citation.name }}] {% endfor %}

{% for citation in dual-meet-results-citations-for-year %}
  {% include citation.md%}
{% endfor %}
</div>

<table>
<tbody>
<tr>
  <th></th>
  {% for school in schools %}
    <th style="transform: rotate(-90deg); height: 125px; max-width: 50px;">{{ school }}</th>
  {% endfor %}
</tr>
{% for school-1 in schools %}
<tr>
  <th style="width: min-content;">{{ school-1 | formatcell }}</th>
  {% for school-2 in schools %}
    {% if school-1 == school-2 %}
      <td class="neutral"></td>
      {% continue %}
    {% endif %}

    {% if school-1 < school-2 %}
      {% assign dual-meet-result = dual-meet-results | where: "school-1", school-1 | where: "school-2", school-2 | first %}
    {% else %}
      {% assign dual-meet-result = dual-meet-results | where: "school-1", school-2 | where: "school-2", school-1 | first %}
    {% endif %}

    {% if dual-meet-result.score-1 == nil or dual-meet-result.score-2 == nil %}
      <td></td>
      {% continue %}
    {% endif %}

    {% if school-1 < school-2 %}
      {% assign score-l = dual-meet-result.score-1 | default: "unk" %}
      {% assign score-r = dual-meet-result.score-2 | default: "unk" %}
      {% if dual-meet-result.school-1-result == "W" %}
        {% assign color = "win" %}
      {% elsif dual-meet-result.school-1-result == "L" %}
        {% assign color = "loss" %}
      {% else %}
        {% assign color = "tie" %}
      {% endif %}
    {% else %}
      {% assign score-l = dual-meet-result.score-2 | default: "unk" %}
      {% assign score-r = dual-meet-result.score-1 | default: "unk" %}
      {% if dual-meet-result.school-1-result == "W" %}
        {% assign color = "loss" %}
      {% elsif dual-meet-result.school-1-result == "L" %}
        {% assign color = "win" %}
      {% else %}
        {% assign color = "tie" %}
      {% endif %}
    {% endif %}

    <td class="{{color}}">{{ score-l }} &mdash; {{ score-r }}</td>
  {% endfor %}
</tr>
{% endfor %}
</tbody>
</table>

{% endfor %}

---

__Sources__
