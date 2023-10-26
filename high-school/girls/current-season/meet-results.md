---
title: Meet Results
---

<style type="text/css">
  .page__content table p, .page__content ul p {
    margin-bottom: 0em;
  }
</style>

{% assign results-for-year = site.data.high-school.fall.girls.meet-results.needham.results-by-year | where: "year", 2023 | first %}

{% include results-for-year.md
  results-for-year = results-for-year %}

---

__Sources__

{% for citation in site.data.high-school.fall.girls.meet-results.needham.general-citations %}
  {% include citation.md %}
{% endfor %}
{% for citation in results-for-year.citations %}
  {% include citation.md %}
{% endfor %}
