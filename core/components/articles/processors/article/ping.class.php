<?php

class ArticlePingProcessor extends modObjectProcessor {
    public $classKey = 'Article';
    public $objectType = 'article';
    public $languageTopics = array('resource','articles:default');
    /** @var Article $object */
    public $object;

    public function initialize() {
        $initialized = parent::initialize();
        $id = $this->getProperty('id',null);
        if (empty($id)) { return $this->modx->lexicon('articles.articles_err_ns'); }
        $this->object = $this->modx->getObject('Article',$id);
        if (empty($this->object)) return $this->modx->lexicon('articles.article_err_nf');
        return $initialized;
    }
    public function process() {
        if ($this->object->notifyUpdateServices()) {
            return $this->success();
        } else {
            return $this->failure();
        }
    }
}
return 'ArticlePingProcessor';