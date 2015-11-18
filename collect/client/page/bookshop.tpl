{% extends 'collect:page/layout.tpl' %}

{% block content %}
<form class="search" action="search" method="get">
  <input type="search" class="ipt-search" placeholder="请输入书名或作者名" name="key" id="search"/>
  <button type="submit" class="btn-search">搜索</button>
</form>
<div class="taglist">
  <div class="tagType male">男生</div>
  <div class="tags">
    {% for tag in male.tags %}
    <a href="cat?tag={{tag}}">{{tag}}</a>
    {% endfor %}
  </div>
</div>
<div class="taglist">
  <div class="tagType female">女生</div>
  <div class="tags">
    {% for tag in female.tags %}
    <a href="cat?tag={{tag}}">{{tag}}</a>
    {% endfor %}
  </div>
</div>
{% endblock %}
