{% if include.meet-scores-and-rankings-for-school-year.dual-meets %}
### Dual Meets

<table>
<thead>
  <th>School</th>
  <th>Score</th>
  <th>Result</th>
</thead>
<tbody>
{% for meet in include.meet-scores-and-rankings-for-school-year.dual-meets %}
<tr>
  <td>
  <div markdown="1">
  {{ meet.school }} {% assign citations = meet.citations | split: ";" %}{% for citation in citations %} [^{{ citation }}] {% endfor %}
  </div>
  </td>
  <td>{{ meet.score | replace: "-", "–" }}</td>
  <td>{{ meet.result }}</td>
</tr>
{% endfor %}
</tbody>

</table>
{% endif %}

{% if include.meet-scores-and-rankings-for-school-year.championships %}

<h3>Championships</h3>

<table>
<thead>
<tr>
  <th>Meet</th>
  <th>Place</th>
</tr>
</thead>
<tbody>
{% for meet in include.meet-scores-and-rankings-for-school-year.championships %}
<tr>
  <td>
  <div markdown="1">
  {{ meet.name }} {% assign citations = meet.citations | split: ";" %}{% for citation in citations %} [^{{ citation }}] {% endfor %}
  </div>
  </td>
  <td>{{ meet.place }}</td>
</tr>
{% endfor %}
</tbody>
</table>

{% endif %}

{% if include.meet-scores-and-rankings-for-school-year.psych-sheets-and-results %}

<h3>Psych Sheets and Results</h3>

{% for href in include.meet-scores-and-rankings-for-school-year.psych-sheets-and-results %}
- [{{ href.name }}]({{ href.link }})
{% endfor %}

{% endif %}