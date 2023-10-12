---
title: Meet Results
---

<style type="text/css">
  .page__content table p, .page__content ul p {
    margin-bottom: 0em;
  }
</style>

{% include results-for-year.md
  results-for-year = site.data.high-school.fall.girls.meet-results.dual-meets.current-season
%}

---

__Sources__

{% for citation in site.data.high-school.fall.girls.meet-results.dual-meets.current-season.citations -%}
  {% include citation.md %}
{% endfor %}
