---
title: Conference Meet Team Rankings

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

{% assign team-rankings = site.data.meet-results.bay-state-conference.meet-team-rankings %}
{% assign years = team-rankings | map: "year" | uniq | sort | reverse %}
{% assign years-boys-scored-with-girls = page.years-boys-scored-with-girls | append: "" %}

## Top 3 Teams per Year

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

<script>console.log({{ years-boys-scored-with-girls }})</script>

{% assign top-3-team-rankings-for-year = team-rankings | where: "year", year | sort: "rank" | slice: 0, 4 %}

<tr>
  <td markdown="1">
  {{ year }}{% if years-boys-scored-with-girls contains year %}[^comment-on-scoring]{% endif %}
  </td>
  <td>{{ top-3-team-rankings-for-year[0].town }}</td>
  <td>{{ top-3-team-rankings-for-year[1].town }}</td>
  <td>{{ top-3-team-rankings-for-year[2].town }}</td>
  </tr>
{% endfor %}
</tbody>
<table>

<div markdown="1">
## Rankings by Year
</div>

{% for year in years -%}

{% assign team-rankings-for-year = team-rankings | where: "year", year | sort: "rank" %}

<div markdown="1">
### {{ year }}{% if years-boys-scored-with-girls contains year %}[^comment-on-scoring]{% endif %}
</div>

<table>
  <thead>
    <tr>
      <th>Town</th>
      <th style="text-align: center;">Rank</th>
      <th style="text-align: center;">Score</th>
    </tr>
  </thead>
  <tbody>
    {% for team-ranking in team-rankings-for-year %}
      <tr>
        <td>{{ team-ranking.town }}</td>
        <td style="text-align: center;">{{ team-ranking.rank }}</td>
        <td style="text-align: center;">{{ team-ranking.score }}</td>
      </tr>
    {% endfor %}
  </tbody>
<table>

{% endfor %}
