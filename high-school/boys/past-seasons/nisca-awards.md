---
title: NISCA Awards
---

## Scholar Team Awards

{% assign scholar-team-awards = site.data.high-school.boys.nisca-awards.scholar-team-awards %}

<table>
  <thead>
    <tr>
      <th>School Year</th>
      <th>Team GPA</th>
      <th>Award</th>
    </tr>
  </thead>
  <tbody>
    {% for scholar-team-award in scholar-team-awards %}
      <tr>
        <td>{{ scholar-team-award.school-year | format_school_year }}</td>
        <td>{{ scholar-team-award.team-gpa }}</td>
        <td>{{ scholar-team-award.award }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>

## Academic All-Americans

{% assign academic-all-americans = site.data.high-school.boys.nisca-awards.academic-all-americans %}
{% assign school-years = academic-all-americans | map: "school-year" | uniq | sort | reverse %}

{% for school-year in school-years %}

{% assign academic-all-americans-for-year = academic-all-americans | where: "school-year", school-year %}

### {{ school-year | format_school_year }}

{% for academic-all-american in academic-all-americans-for-year -%}
  {{ academic-all-american.name }} <br>
{% endfor %}

{% endfor %}
