<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<title>modBlog - [[*pagetitle]]</title>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<link rel="stylesheet" type="text/css" href="[[++modblog.assets_url:default=`[[++base_url]]assets/components/modblog/`]]themes/default/style.css" />
<base href="[[++site_url]]" />
</head>
<body>

<div id="header-wrap">
  <div id="header" class="container_16">
    <h1 id="logo-text"><a href="[[~[[*id]]]]" title="">modBlog</a></h1>
    <p id="intro">My Own Blog</p>
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
  <input class="btn" alt="Search" type="image" title="Search" src="[[++modblog.assets_url:default=`assets/components/modblog/`]]themes/default/images/search.gif" />
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
[[*content]]
</div>

<!-- main ends -->


<div id="left-columns" class="grid_4">
  <div class="grid_4 alpha">

<div class="sidemenu">
  <h3>Latest Posts</h3>
  <ul>
  [[!getResources? &parents=`[[*id]]` &hideContainers=`1` &showHidden=`1` &tpl=`sample.modBlogLatestPostTpl` &limit=`5` &sortby=`publishedon` &where=`{"class_key":"modBlogPost"}`]]
  </ul>
</div>

<div class="sidemenu">
  <h3>Latest Comments</h3>
  <ul>
  [[!QuipLatestComments? &type=`family` &family=`b[[*id]]`]]
  </ul>
</div>


  </div>
  <!-- end left-columns -->
</div>
<!-- contents end here -->

</div></div>

<!-- footer starts here -->
<div id="footer-wrapper" class="container_12">

  <div id="footer-content">
    <div class="grid_4">
<h3>Tags</h3>
[[+tags]]
    </div>
    <div class="grid_4">
  <h3>Archives</h3>
  [[+archives]]
    </div>
  </div>
  <div id="footer-bottom">
   <p class="bottom-left">
&nbsp; &copy; 2010-2012 modblog. all rights reserved.
      &nbsp; &nbsp; powered by <a href="http://modx.com/">modx revolution</a>
      &nbsp; &nbsp; <a href="http://www.bluewebtemplates.com/" title="Website Templates">website templates</a> by <a href="http://www.styleshout.com/">styleshout</a>
      </p>

      <p class="bottom-right" >
        <a href="[[~1]]">Home</a> |
        <a href="[[~1]]">Sitemap</a> |
        <a href="http://jigsaw.w3.org/css-validator/check/referer">CSS</a> |
             <a href="http://validator.w3.org/check/referer">XHTML</a>
      </p>

  </div>
</div>

</body>
</html>