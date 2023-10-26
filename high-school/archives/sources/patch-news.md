---
title: Patch News Articles
classes: wide
---

<style>
  thead th:nth-child(2) {
    width: 99%;
  }
</style>

{% assign articles = site.data.high-school.sources.patch-news %}

<table>
  <thead>
    <th>Date</th>
    <th>Title</th>
  </thead>
  <tbody>
    {% for article in articles %}
      <tr>
        <td>{{ article.date }}</td>
        <td><a href="{{ article.url }}">{{ article.title }}</a></td>
      </tr>
    {% endfor %}
  </tbody>
</table>