---
title: Meet Team Rankings

years-boys-scored-with-girls:
- "2010"
- "2011"
---

[^comment-on-scoring]: Boys scored with girls.

{% assign team-rankings = site.data.meet-results.bay-state-conference.meet-team-rankings %}
{% assign years = team-rankings | map: "year" | uniq %}

{% for year in years -%}

{% assign team-rankings-for-year = team-rankings | where: "year", year | sort: "rank" %}

<div markdown="1">
## {{ year }}{% if page.years-boys-scored-with-girls contains year %}[^comment-on-scoring]{% endif %}
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
