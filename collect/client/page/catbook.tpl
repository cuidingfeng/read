{% extends 'collect:page/layout.tpl' %}
{% block content %}
    {{ JSON.stringify(body) }}
{% endblock %}
