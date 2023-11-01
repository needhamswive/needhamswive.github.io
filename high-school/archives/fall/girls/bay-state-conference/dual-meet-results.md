---
title: Fall Girls BSC Dual Meet Results
classes: wide
---

<style>
  table {
    overflow: visible;
  }

  td {
    border: 1px solid #b6b6b6;
    text-align: center;
    padding: 0;
    width: 50px;
  }

  .school-name {
    transform: rotate(-90deg) translateX(15px);
    max-width: 50px;
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

  .tie {
    background-color: #e8e8e8;
  }
</style>

{% assign dual-meet-results = site.data.high-school.archives.fall.girls.meet-results.bay-state-conference.dual-meet-results %}
{% assign dual-meet-results-citations = site.data.high-school.archives.fall.girls.meet-results.bay-state-conference.dual-meet-results-citations %}
{% assign years = dual-meet-results | map: "year" | uniq %}

{% include filter-year.html
  years = years %}

{% for year in years %}

<div class="filter-section" data-option="year" data-section="{{ year }}" markdown="1">

{% assign dual-meet-results-for-year = dual-meet-results | where: "year", year %}
{% assign dual-meet-results-citations-for-year = dual-meet-results-citations | where: "year", year %}
{% assign schools-1 = dual-meet-results-for-year | map: "school-1" | uniq %}
{% assign schools-2 = dual-meet-results-for-year | map: "school-2" | uniq %}
{% assign schools = schools-1 | concat: schools-2 | uniq %}

## {{ year }}

{% for citation in dual-meet-results-citations-for-year %}[^{{ citation.name }}] {% endfor %}

{% for citation in dual-meet-results-citations-for-year %}
  {% include citation.md%}
{% endfor %}

<table>
<tbody>
<tr>
  <th></th>
  {% for school in schools %}
    <th><div class="school-name">{{ school }}</div></th>
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
      {% assign dual-meet-result = dual-meet-results-for-year | where: "school-1", school-1 | where: "school-2", school-2 | first %}
    {% else %}
      {% assign dual-meet-result = dual-meet-results-for-year | where: "school-1", school-2 | where: "school-2", school-1 | first %}
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

    {% if dual-meet-result.score-1 == nil or dual-meet-result.score-2 == nil %}
      {% if dual-meet-result.school-1-result != nil %}
        <td class="{{color}}"></td>
      {% else %}
        <td></td>
      {% endif %}
    {% else %}
      <td class="{{color}}">{{ score-l }}&nbsp;&ndash;&nbsp;{{ score-r }}</td>
    {% endif %}
  {% endfor %}
</tr>
{% endfor %}
</tbody>
</table>

</div>

{% endfor %}

---

__Sources__
