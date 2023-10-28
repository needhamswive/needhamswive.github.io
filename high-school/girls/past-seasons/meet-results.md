---
title: Meet Results
---

<style type="text/css">
  .page__content table p, .page__content ul p {
    margin-bottom: 0em;
  }
</style>

## General Links

- [Bay State Conference Results](https://www.gomotionapp.com/team/rechfhfhslma/page/newsletter)
- [MIAA Swim and Dive Feed](http://miaa.ezstream.com/index.cfm?ChnID=328)

{% assign years = site.data.high-school.girls.meet-results.results-by-year | map: "year" %}

{% include filter-year.html
  keys = years %}

{% for results-for-year in site.data.high-school.girls.meet-results.results-by-year %}

<div class="filter-section" data-option="year" data-section="{{ results-for-year.year }}" markdown="1">

## {{ results-for-year.year }}

{% include results-for-year.md
  results-for-year = results-for-year %}

</div>

{%- endfor %}

---

__Sources__

{% for citation in site.data.high-school.girls.meet-results.general-citations %}
  {% include citation.md %}
{% endfor %}
{% for results-for-year in site.data.high-school.girls.meet-results.results-by-year %}
  {% for citation in results-for-year.citations %}
    {% include citation.md %}
  {% endfor %}
{% endfor %}
