---
title: NHS Girls Swive Wrapped Directory

school-years:
- 2025-2026
- 2024-2025
- 2023-2024
---

<table>
  <thead>
    <tr>
      <th>Directory</th>
    </tr>
  </thead>
  <tbody>
    {% for school-year in page.school-years %}
    {% assign season-year = school-year | slice: 0, 4 %}

    <tr>
      <td><a href="/high-school/girls/season-wrapped/directory/{{ season-year }}">{{ school-year }}</a></td>
    </tr>
    {% endfor %}
  </tbody>
</table>
