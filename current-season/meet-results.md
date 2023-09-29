---
title: Meet Results
layout: single
---

<style type="text/css">
  .page__content table p, .page__content ul p {
    margin-bottom: 0em;
  }
</style>

{% assign results-for-year = site.data.meet-results.needham.current-season %}

{% include results-for-year.md %}

---

__Sources__

{% for citation in site.data.meet-results.needham.current-season.citations -%}
  {% include citation.md %}
{% endfor %}
