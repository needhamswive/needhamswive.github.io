---
title: NHS Girls Swive Wrapped Directory

school-years:
  - 2023-2024
---

<table>
  <thead>
    <tr>
      <th>Year</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    {% for school-year in page.school-years %}

    {% assign season-year = school-year | slice: 0, 4 %}
    {% assign roster = site.data.high-school.girls.team-rosters | where: "school-year", school-year | first %}

    {% for student in roster.students %}

    {% assign name = student.name %}
    <tr>
      <td>{{ season-year }}</td>
      <td><a href="/high-school/girls/season-wrapped/{{ season-year }}?student={{ name | downcase | replace: " ", "-" | replace: "'", "" }}">{{ name }}</a></td>
    </tr>

    {% endfor %}
    {% endfor %}
  </tbody>
</table>
