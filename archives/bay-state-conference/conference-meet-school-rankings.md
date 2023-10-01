---
title: Conference Meet School Rankings

years-boys-scored-with-girls:
- 2011
- 2010
---

<style type="text/css">
  .page__content table p, .page__content ul p {
    margin-bottom: 0em;
  }
</style>

[^comment-on-scoring]: Boys scored with girls.

{% assign school-rankings = site.data.meet-results.bay-state-conference.conference-meet-school-rankings %}
{% assign years = school-rankings | map: "year" | uniq | sort | reverse %}
{% assign years-boys-scored-with-girls = page.years-boys-scored-with-girls | append: "" %}

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
{% assign top-3-school-rankings-for-year = school-rankings | where: "year", year | sort: "rank" | slice: 0, 4 %}
<tr>
  <td markdown="1">
  {{ year }}{% if years-boys-scored-with-girls contains year %}[^comment-on-scoring]{% endif %}
  </td>
  <td>{{ top-3-school-rankings-for-year[0].school }}</td>
  <td>{{ top-3-school-rankings-for-year[1].school }}</td>
  <td>{{ top-3-school-rankings-for-year[2].school }}</td>
</tr>
{% endfor %}
</tbody>
</table>

## Rankings by Year

{% for year in years -%}

{% assign school-rankings-for-year = school-rankings | where: "year", year | sort: "rank" %}

### {{ year }}{% if years-boys-scored-with-girls contains year %}[^comment-on-scoring]{% endif %}

<table>
  <thead>
    <tr>
      <th>School</th>
      <th style="text-align: center;">Rank</th>
      <th style="text-align: center;">Score</th>
    </tr>
  </thead>
  <tbody>
    {% for school-ranking in school-rankings-for-year %}
      <tr>
        <td>{{ school-ranking.school }}</td>
        <td style="text-align: center;">{{ school-ranking.rank }}</td>
        <td style="text-align: center;">{{ school-ranking.score }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>

{% endfor %}
