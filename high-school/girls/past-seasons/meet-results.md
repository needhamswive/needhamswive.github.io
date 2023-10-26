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

{% for results-for-year in site.data.high-school.fall.girls.meet-results.needham.results-by-year %}

## {{ results-for-year.year }}

{% include results-for-year.md
  results-for-year = results-for-year %}

{%- endfor %}

---

__Sources__

{% for citation in site.data.high-school.fall.girls.meet-results.needham.general-citations %}
  {% include citation.md %}
{% endfor %}
{% for results-for-year in site.data.high-school.fall.girls.meet-results.needham.results-by-year %}
  {% for citation in results-for-year.citations %}
    {% include citation.md %}
  {% endfor %}
{% endfor %}
