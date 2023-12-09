{%- if citation.display -%}
{%- if citation.link -%}
  [^{{ citation.name }}]: [{{ citation.display }}]({{ citation.link }})
{%- else -%}
  [^{{ citation.name }}]: {{ citation.display }}
{%- endif -%}
{%- elsif citation.name -%}
  [^{{ citation.name }}]: <{{ citation.link }}>
{%- else -%}
  [^{{citation}}]
{%- endif -%}
