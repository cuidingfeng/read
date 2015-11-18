{% extends 'collect:page/layout.tpl' %}

{% block content %}
    <div class="search">
      <a href="bookshop" class="back"></a>
      <h1 class="title">{{title}}</h1>
    </div>
    <div class="booklist">
      {% widget "collect:widget/catlist/catlist.tpl"%}
    </div>

{% endblock %}
