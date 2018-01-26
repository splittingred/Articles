<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    
	<style>
		/* Sticky footer styles
-------------------------------------------------- */
html {
  position: relative;
  min-height: 100%;
}
body {
  /* Margin bottom by footer height */
  margin-bottom: 60px;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  /* Set the fixed height of the footer here */
  height: 60px;
  line-height: 60px; /* Vertically center the text there */
  background-color: #f5f5f5;
}


/* Custom page CSS
-------------------------------------------------- */
/* Not required for template or sticky footer method. */

body > .container {
  padding: 60px 15px 0;
}

.footer > .container {
  padding-right: 15px;
  padding-left: 15px;
}

code {
  font-size: 80%;
}


	</style>


    <title>[[*pagetitle]]</title>
    <base href="[[++site_url]]" />
  </head>
  <body>
	  
<!-- Navigation Start -->	  
<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
<div class="container">	
  <a class="navbar-brand" href="#">Articles</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="https://modx.com">Modx <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Articles
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="https://modx.com/extras/package/articles">Download</a>
          <a class="dropdown-item" href="https://github.com/modxcms/Articles">Github</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="https://docs.modx.com/extras/revo/articles">Docs</a>
        </div>
      </li>
    </ul>
  </div>
</div>  
</nav>
<!-- End -->	  

<!-- Start -->	 
<div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">[[*pagetitle]]</h1>
    <p class="lead">[[*introtext]]</p>
    <hr class="my-4">
	<p>Posted on [[*publishedon:strtotime:date=`%b %d, %Y`]] by <a href="[[~[[*parent]]]]author/[[*publishedby:userinfo=`username`]]">[[*publishedby:userinfo=`username`]]</a>. [[*articlestags:notempty=` &nbsp;| Tags: [[+article_tags]]. `]] [[+comments_enabled:is=`1`:then=`&nbsp;| <a href="[[~[[*id]]]]#comments" class="comments">Comments ([[+comments_count]])</a>`]].</p>
  </div>
</div>
<!-- End -->  
	  
<!-- Article Body Start -->
<div class="container">
	<div class="row">
		<div class="col-md-8">
			[[*content]]
		</div>
		<div class="col-md-4">


		<h3>Latest Posts</h3>
			<ul class="nav flex-column">
				[[+latest_posts]]
			</ul>


[[+comments_enabled:is=`1`:then=`
<hr>

		<h3>Latest Comments</h3>
			<ul class="nav flex-column">
				[[+latest_comments]]
		</ul>
`]]

		</div>
	</div>
</div>
<!-- End --> 

<div class="container">
<hr>
</div>	  

<!-- Comments Start -->
<div class="container">
    <div class="post-comments" id="comments">
        [[+comments]]
        <br />
        <h3>Add a Comment</h3>
        [[+comments_form]]
    </div>
</div>    
<!-- End --> 



<!-- Footer Start -->

    <footer class="footer">
      <div class="container">
        <span class="text-muted">Articles for Modx. Powered by Bootstrap 4. Theme by Carlo (Original-Websites.com)</span>
      </div>
    </footer>
<!-- End --> 	  

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </body>
</html>
