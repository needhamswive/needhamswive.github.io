---
title: Winter Boys BSC School Rankings
---

<style type="text/css">
  .page__content table p {
    margin-bottom: 0em;
  }
</style>

{% assign school-rankings = site.data.high-school.archives.winter.boys.bay-state-conference.school-rankings %}
{% assign years = school-rankings | map: "year" | uniq | sort | reverse %}

## Top 3 Schools per Year

<table>
<thead>
<tr>
  <th>Year</th>
  <th>1st Place</th>
  <th>2nd Place</th>
  <th>3rd Place</th>
</tr>
</thead>
<tbody>

{% for year in years %}
{% comment %} Assume the ranks are already in order {% endcomment %}
{% assign top-3-school-rankings-for-year = school-rankings | where: "year", year | slice: 0, 4 %}
<tr>
  <td markdown="1">
  {{ year }}
  </td>
  <td>{{ top-3-school-rankings-for-year[0].school }}</td>
  <td>{{ top-3-school-rankings-for-year[1].school }}</td>
  <td>{{ top-3-school-rankings-for-year[2].school }}</td>
</tr>
{% endfor %}
</tbody>
</table>

## Rankings by Year

{% include filter-year.html
  years = years %}

{% for year in years %}

<div class="filter-section" data-option="year" data-section="{{ year }}" markdown="1">

{% assign school-rankings-for-year = school-rankings | where: "year", year %}

### {{ year }}

{% include rankings.html
  rankings = school-rankings-for-year %}

</div>

{% endfor %}
