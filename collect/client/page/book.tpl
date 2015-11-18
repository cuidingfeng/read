{% extends 'collect:page/layout.tpl' %}

{% block content %}
    <div class="search">
      <a href="cat.html" class="back"></a>
      <h1 class="title">作品详情</h1>
    </div>
    <div class="bookbox">
      <div class="bookmsg">
        <img src="{{json.cover.substr(7)}}" class="bookimg" alt="" />
        <div class="content">
          <div class="booktitle">
            {{json.title}}
          </div>
          <div class="bookdes">
            作者：{{json.author}}<br>
            {% if json.wordCount>0 %}
            字数：{{Math.round(json.wordCount/10000)}}万字<br>
            {% endif %}
            状态：{% if json.isSerial %}连载中{%else%}已完结{% endif %}
          </div>
        </div>
      </div>
      <div class="btns">
        <a href="#" class="online">在线阅读</a>
        <a href="#" class="downbook">下载本书</a>
      </div>
      <p class="bookbrief">
        内容简介：<br>
        {{json.longIntro}}
      </p>
    </div>
{% endblock %}
