{% for data in json.books %}
<a class="bookone" href="book?id={{data._id}}">
  <img src="{{data.cover.substr(7)}}" class="bookimg" alt="" />
  <div class="content">
    <div class="booktitle">
      {{data.title}}
    </div>
    <div class="bookdes">
      {{data.shortIntro}}
    </div>
    <div class="bookfoot">
      <span class="author">{{data.author}}</span>
      <span class="keep">留存{{data.retentionRatio}}%</span>
    </div>
  </div>
</a>
{% endfor %}
{% if json.books.length < 50 %}
<div class="nomore">
  没有更多数据了
</div>
{% else %}
<div class="loadmore">
  加载更多
</div>
{% endif %}
