---
title: MIAA
---

{% assign pages = site.data.high-school.sources.miaa-ezstream %}

<table>
  <thead>
    <th>Title</th>
  </thead>
  <tbody>
    {% for page in pages %}
      <tr>
        <td><a href="http://miaa.ezstream.net/index.cfm?itemid={{ page.itemid }}">{{ page.title }}</a></td>
      </tr>
    {% endfor %}
  </tbody>
</table>
