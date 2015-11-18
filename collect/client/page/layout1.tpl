<!doctype html>
{% html lang="en" framework="collect:static/js/mod.js" %}
    {% head %}
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" href="/static/favicon.ico">
        <title>{{ title }}</title>
        {% require "collect:static/js/jquery-1.10.2.js" %}
        <script>
          var next = "{{ next }}";
          if(next === "auto" && {{start || 0}}<999){
            setTimeout( function(){
              window.location.href = "?cat={{cat}}&search={{search}}&start={{Math.min(+start+100,999)}}&next=auto";
            }, 3000);
          }
        </script>
    {% endhead %}

    {% body %}
      
        <div id="wrapper">
            <div id="middle" class="container">
                {% block content %}
                {% endblock %}
            </div>
        </div>

    {% endbody %}

{% endhtml %}
