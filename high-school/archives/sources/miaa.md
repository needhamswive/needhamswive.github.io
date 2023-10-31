---
title: MIAA
---

## EZStream

{% assign pages = site.data.high-school.archives.sources.miaa-ezstream %}

<table>
  <tbody>
    {% for page in pages %}
      <tr>
        <td><a href="http://miaa.ezstream.net/index.cfm?itemid={{ page.itemid }}">{{ page.title }}</a></td>
      </tr>
    {% endfor %}
  </tbody>
</table>

---

{% assign years = pages | map: "year" | compact | uniq | sort | reverse %}

{% include filter-year.html
  years = years %}

{% for year in years %}

{% assign pages-for-year = pages | where: "year", year %}

<div class="filter-section" data-option="year" data-section="{{ year }}">

<table>
  <thead>
    <th>{{year}}</th>
  </thead>
  <tbody>
    {% for page in pages-for-year %}
      <tr>
        <td><a href="http://miaa.ezstream.net/index.cfm?itemid={{ page.itemid }}">{{ page.title }}</a></td>
      </tr>
    {% endfor %}
  </tbody>
</table>

</div>

{% endfor %}
