<div class="post">
    <h2 class="title"><a href="[[~[[+id]]]]">[[+pagetitle]]</a></h2>
    <p class="post-info">[[%articles.posted_by]] <a href="[[~[[*id]]]]author/[[+createdby:userinfo=`username`]]">[[+createdby:userinfo=`username`]]</a> [[+tv.articlestags:notempty=` | <span class="tags">[[%articles.tags]]: [[!tolinks? &items=`[[+tv.articlestags]]` &target=`[[*id]]` &useTagsFurl=`1`]]</span>`]]</p>
    <div class="entry">
	    <p>[[+introtext:default=`[[+content:ellipsis=`400`]]`]]</p>
    </div>
    <p class="postmeta">
      <span class="links">
        <a href="[[~[[+id]]]]" class="readmore">[[%articles.read_more]]</a>
        [[+comments_enabled:is=`1`:then=`| <a href="[[~[[+id]]]]#comments" class="comments">[[%articles.comments]] ([[!QuipCount? &thread=`article-b[[+parent]]-[[+id]]`]])</a>`]]
        | <span class="date">[[+publishedon:strtotime:date=`%b %d, %Y`]]</span>
      </span>
    </p>
</div>