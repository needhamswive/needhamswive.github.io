---
title: Meet Scores and Rankings
---

<style type="text/css">
  .page__content table p, .page__content ul p {
    margin-bottom: 0em;
  }
</style>

{% assign current-school-year = site.data.high-school.variables.current-school-year %}
{% assign results-for-school-year = site.data.high-school.girls.meet-scores-and-rankings.results-by-school-year | where: "school-year", current-school-year | first %}

{% include results-for-school-year.md
  results-for-school-year = results-for-school-year %}

---

__Sources__

{% for citation in site.data.high-school.girls.meet-scores-and-rankings.general-citations %}
  {% include citation.md %}
{% endfor %}
{% for citation in results-for-school-year.citations %}
  {% include citation.md %}
{% endfor %}
