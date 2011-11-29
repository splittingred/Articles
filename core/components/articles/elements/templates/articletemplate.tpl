<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<title>Articles - [[*pagetitle]]</title>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<link rel="stylesheet" type="text/css" href="[[++articles.assets_url:default=`[[++base_url]]assets/components/articles/`]]themes/default/style.css" />
<base href="[[++site_url]]" />
</head>
<body>

<div id="header-wrap">
  <div id="header" class="container_16">
    <h1 id="logo-text"><a href="[[~[[*articles_container]]]]" title="">Articles</a></h1>
    <p id="intro">Articles By Me</p>
    <!-- navigation -->
    <div id="nav">
      <ul><li class="first"><a href="[[~[[*id]]]]" title="Home" >Home</a></li>
    </div>
    <div id="header-image"></div>
      <div id="search">

<form id="quick-search" action="search-results.html" method="get">
<p>
  <label for="qsearch">Search:</label>
  <input class="tbox" id="qsearch" type="text" name="search" value="" title="Start typing and hit ENTER" />
  <input class="btn" alt="Search" type="image" title="Search" src="[[++articles.assets_url:default=`assets/components/articles/`]]themes/default/images/search.gif" />
</p>
</form>
</div>
      <!-- header ends here -->
  </div>
</div>
<!-- content starts -->
<div id="content-outer"><div id="content-wrapper" class="container_16">

<!-- main -->
<div id="main" class="grid_12">

<h2 class="title"><a href="[[~[[*id]]]]">[[*pagetitle]]</a></h2>
<p class="post-info">Posted on [[*publishedon:strtotime:date=`%b %d, %Y`]] |
Tags: [[*articlestags:notempty=`
  <span class="tags" style="float: left;">Tags: [[!tolinks? &useTagsFurl=`1` &items=`[[*articlestags]]` &target=`[[*articles_container]]`]]</span>
`]] |
<a href="[[~[[*id]]]]#comments" class="comments">Comments ([[!QuipCount? &thread=`article-b[[*articles_container]]-[[*id]]`]])</a>
</p>
<div class="entry">
<p>[[*introtext]]</p>

<hr />

[[*content]]

</div>

<hr />

<div class="post-comments" id="comments">
[[+comments]]
<br />
<h3>Add a Comment</h3>
[[+comments_form]]

</div>


</body>
</html>