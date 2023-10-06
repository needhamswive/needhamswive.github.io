---
title: Meet Results
---

<style type="text/css">
  .page__content table p, .page__content ul p {
    margin-bottom: 0em;
  }
</style>

{% include results-for-year.md
  results-for-year = site.data.meet-results.needham.current-season
%}

---

__Sources__

{% for citation in site.data.meet-results.needham.current-season.citations -%}
  {% include citation.md %}
{% endfor %}
