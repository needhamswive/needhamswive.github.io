---
title: Academic All-Americans
---

{% assign current-year = site.data.high-school.variables.current-school-year %}
{% assign academic-all-americans = site.data.high-school.boys.academic-all-americans %}

{% assign school-years = academic-all-americans | not_where: "school-year", current-year | map: "school-year" | uniq | sort | reverse %}

{% for school-year in school-years %}

{% assign academic-all-americans-for-year = academic-all-americans | where: "school-year", school-year %}

## {{ school-year | format_school_year }}

{% for academic-all-american in academic-all-americans-for-year -%}
  {{ academic-all-american.name }} <br>
{% endfor %}

{% endfor %}
