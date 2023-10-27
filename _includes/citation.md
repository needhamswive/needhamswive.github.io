{% if citation.display %}
{% if citation.link %}
  [^{{ citation.name }}]: [{{ citation.display }}]({{ citation.link }})
{% else %}
  [^{{ citation.name }}]: {{ citation.display }}
{% endif %}
{% else %}
  [^{{ citation.name }}]: <{{ citation.link }}>
{% endif %}
