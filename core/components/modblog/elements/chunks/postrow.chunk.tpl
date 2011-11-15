<div class="post">
    <h2 class="title"><a href="[[~[[+id]]]]">[[+pagetitle]]</a></h2>
    <p class="post-info">[[%modblog.posted_by]] [[+createdby:userinfo=`username`]] [[+tv.modblogtags:notempty=` | <span class="tags">[[%modblog.tags]]: [[!tolinks? &items=`[[+tv.modblogtags]]` &target=`[[*id]]` &useTagsFurl=`1`]]</span>`]]</p>
    <div class="entry">
	    <p>[[+introtext:default=`[[+content:ellipsis=`400`]]`]]</p>
    </div>
    <p class="postmeta">
      <span class="links">
        <a href="[[~[[+id]]]]" class="readmore">[[%modblog.read_more]]</a>
        | <a href="[[~[[+id]]]]#comments" class="comments">[[%modblog.comments]] ([[!QuipCount? &thread=`modblogpost-b[[+blog]]-[[+id]]`]])</a>
        | <span class="date">[[+publishedon:strtotime:date=`%b %d, %Y`]]</span>
      </span>
    </p>
</div>