<table>
  <thead>
    <tr>
      <th>School</th>
      <th style="text-align: center;">Rank</th>
      <th style="text-align: center;">Score</th>
    </tr>
  </thead>
  <tbody>
    {% for ranking in include.rankings %}
      <tr>
        <td>{{ ranking.school }}</td>
        <td style="text-align: center;">{{ ranking.rank }}</td>
        <td style="text-align: center;">{{ ranking.score }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>
