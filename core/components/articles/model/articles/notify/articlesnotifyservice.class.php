<?php
abstract class ArticlesNotifyService {
    /** @var modX $xpdo */
    public $modx;
    /** @var Article $article */
    public $article;
    /** @var array $config */
    public $config = array();

    function __construct(Article $article,array $config = array()) {
        $this->article =& $article;
        $this->modx =& $article->xpdo;
        $this->config = array_merge(array(

        ),$config);
    }
    abstract public function notify($title,$url);
}