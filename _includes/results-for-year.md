{% if results-for-year.dual-meets %}
### Dual Meets

<table>
<thead>
  <th>School</th>
  <th>Score</th>
  <th>Result</th>
</thead>
<tbody>
{% for meet in results-for-year.dual-meets %}
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

{% if results-for-year.championships %}
### Championships

<table>
<thead>
<tr>
  <th>Meet</th>
  <th>Place</th>
</tr>
</thead>
<tbody>
{% for meet in results-for-year.championships %}
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

{% if results-for-year.psych-sheets-and-results %}
### Psych Sheets and Results

{% for href in results-for-year.psych-sheets-and-results %}
- [{{ href.name }}]({{ href.link }})
{% endfor %}
{% endif %}
