---
title: Meet Scores and Rankings
---

<style type="text/css">
  .page__content table p, .page__content ul p {
    margin-bottom: 0em;
  }
</style>

## General Links

- [Bay State Conference Results](https://www.gomotionapp.com/team/rechfhfhslma/page/newsletter)
- [MIAA Swim and Dive Feed](http://miaa.ezstream.com/index.cfm?ChnID=328)

{% assign current-school-year = site.data.high-school.variables.current-school-year %}
{% assign results-by-school-year = site.data.high-school.girls.meet-scores-and-rankings.results-by-school-year | not_where: "school-year", current-school-year %}
{% assign school-years = results-by-school-year | map: "school-year" %}

{% include filter-year.html
  years = school-years %}

{% for results-for-school-year in results-by-school-year %}

<div class="filter-section" data-option="year" data-section="{{ results-for-school-year.school-year }}" markdown="1">

## {{ results-for-school-year.school-year | format_school_year }}

{% include results-for-school-year.md
  results-for-school-year = results-for-school-year %}

</div>

{%- endfor %}

---

__Sources__

{% for citation in site.data.high-school.girls.meet-scores-and-rankings.general-citations %}
  {% include citation.md %}
{% endfor %}
{% for results-for-school-year in site.data.high-school.girls.meet-scores-and-rankings.results-by-school-year %}
  {% for citation in results-for-school-year.citations %}
    {% include citation.md %}
  {% endfor %}
{% endfor %}
