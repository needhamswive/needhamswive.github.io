{% if citation.display %}
  [^{{ citation.name }}]: [{{ citation.display }}]({{ citation.link }})
{% else %}
  [^{{ citation.name }}]: <{{ citation.link }}>
{% endif %}
