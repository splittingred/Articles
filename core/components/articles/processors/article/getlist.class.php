<?php
/**
 * Articles
 *
 * Copyright 2011-12 by Shaun McCormick <shaun+articles@modx.com>
 *
 * Articles is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later
 * version.
 *
 * Articles is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * Articles; if not, write to the Free Software Foundation, Inc., 59 Temple
 * Place, Suite 330, Boston, MA 02111-1307 USA
 *
 * @package articles
 */
/**
 * @package articles
 * @subpackage processors
 */
class ArticleGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'Article';
    public $defaultSortField = 'createdon';
    public $defaultSortDirection = 'DESC';
    public $checkListPermission = true;
    public $objectType = 'article';
    public $languageTopics = array('resource','articles:default');

    /** @var modAction $editAction */
    public $editAction;
    /** @var modTemplateVar $tvTags */
    public $tvTags;
    /** @var ArticlesContainer $container */
    public $container;
    /** @var boolean $commentsEnabled */
    public $commentsEnabled = false;

    public function initialize() {
        $this->editAction = $this->modx->getObject('modAction',array(
            'namespace' => 'core',
            'controller' => 'resource/update',
        ));
        $this->defaultSortField = $this->modx->getOption('articles.default_article_sort_field',null,'createdon');

        if ($this->getParentContainer()) {
            $settings = $this->container->getContainerSettings();
            if ($this->modx->getOption('commentsEnabled',$settings,true)) {
                $quipCorePath = $this->modx->getOption('quip.core_path',null,$this->modx->getOption('core_path',null,MODX_CORE_PATH).'components/quip/');
                if ($this->modx->addPackage('quip',$quipCorePath.'model/')) {
                    $this->commentsEnabled = true;
                }
            }
        }
        return parent::initialize();
    }

    public function getTagsTV() {
        $this->tvTags = $this->modx->getObject('modTemplateVar',array('name' => 'articlestags'));
        if (!$this->tvTags && $this->getProperty('sort') == 'tags') {
            $this->setProperty('sort','createdon');
        }
        return $this->tvTags;
    }

    public function getParentContainer() {
        $parent = $this->getProperty('parent');
        if (!empty($parent)) {
            $this->container = $this->modx->getObject('ArticlesContainer',$parent);
        }
        return $this->container;
    }

    public function prepareQueryBeforeCount(xPDOQuery $c) {
        $c->leftJoin('modUser','CreatedBy');

        if ($this->getTagsTV()) {
            $c->leftJoin('modTemplateVarResource','Tags',array(
                'Tags.tmplvarid' => $this->tvTags->get('id'),
                'Tags.contentid = Article.id',
            ));
        }

        $parent = $this->getProperty('parent',null);
        if (!empty($parent)) {
            $c->where(array(
                'parent' => $parent,
            ));
        }
        $query = $this->getProperty('query',null);
        if (!empty($query)) {
            $queryWhere = array(
                'pagetitle:LIKE' => '%'.$query.'%',
                'OR:description:LIKE' => '%'.$query.'%',
                'OR:introtext:LIKE' => '%'.$query.'%',
            );
            if ($this->tvTags) {
                $queryWhere['OR:Tags.value:LIKE'] = '%'.$query.'%';
            }
            $c->where($queryWhere);
        }
        $filter = $this->getProperty('filter','');
        switch ($filter) {
            case 'published':
                $c->where(array(
                    'published' => 1,
                    'deleted' => 0,
                ));
                break;
            case 'unpublished':
                $c->where(array(
                    'published' => 0,
                    'deleted' => 0,
                ));
                break;
            case 'deleted':
                $c->where(array(
                    'deleted' => 1,
                ));
                break;
            default:
                $c->where(array(
                    'deleted' => 0,
                ));
                break;
        }

        $c->where(array(
            'class_key' => 'Article',
        ));
        return $c;
    }

    public function getSortClassKey() {
        $classKey = 'Article';
        switch ($this->getProperty('sort')) {
            case 'tags':
                $classKey = 'modTemplateVarResource';
                break;
        }
        return $classKey;
    }

    public function prepareQueryAfterCount(xPDOQuery $c) {
        $c->select($this->modx->getSelectColumns('Article','Article'));
        $c->select(array(
            'createdby_username' => 'CreatedBy.username',
        ));
        if ($this->tvTags) {
            $c->select(array(
                'tags' => 'Tags.value',
            ));
        }
        if ($this->commentsEnabled) {
            $commentsQuery = $this->modx->newQuery('quipComment');
            $commentsQuery->innerJoin('quipThread','Thread');
            $commentsQuery->where(array(
                'Thread.resource = Article.id',
            ));
            $commentsQuery->select(array(
                'COUNT('.$this->modx->getSelectColumns('quipComment','quipComment','',array('id')).')',
            ));
            $commentsQuery->construct();
            $c->select(array(
                '('.$commentsQuery->toSQL().') AS '.$this->modx->escape('comments'),
            ));
        }
        return $c;
    }

    /**
     * @param xPDOObject|Article $object
     * @return array
     */
    public function prepareRow(xPDOObject $object) {
        $resourceArray = parent::prepareRow($object);

        if (!empty($resourceArray['publishedon'])) {
        	$publishedon = strtotime($resourceArray['publishedon']);
            $resourceArray['publishedon_date'] = strftime($this->modx->getOption('articles.mgr_date_format',null,'%b %d'),$publishedon);
            $resourceArray['publishedon_time'] = strftime($this->modx->getOption('articles.mgr_time_format',null,'%H:%I %p'),$publishedon);
            $resourceArray['publishedon'] = strftime('%b %d, %Y %H:%I %p',$publishedon);
        }
        $resourceArray['action_edit'] = '?a='.$this->editAction->get('id').'&action=post/update&id='.$resourceArray['id'];
        if (!array_key_exists('comments',$resourceArray)) $resourceArray['comments'] = 0;

        $this->modx->getContext($resourceArray['context_key']);
        $resourceArray['preview_url'] = $this->modx->makeUrl($resourceArray['id'],$resourceArray['context_key']);

        $trimLength = $this->modx->getOption('articles.mgr_article_content_preview_length',null,300);
        $resourceArray['content'] = strip_tags($this->ellipsis($object->getContent(),$trimLength));

        $resourceArray['actions'] = array();
        $resourceArray['actions'][] = array(
            'className' => 'edit',
            'text' => $this->modx->lexicon('edit'),
        );
        $resourceArray['actions'][] = array(
            'className' => 'view',
            'text' => $this->modx->lexicon('view'),
        );
        if (!empty($resourceArray['deleted'])) {
            $resourceArray['actions'][] = array(
                'className' => 'undelete',
                'text' => $this->modx->lexicon('undelete'),
            );
        } else {
            $resourceArray['actions'][] = array(
                'className' => 'delete',
                'text' => $this->modx->lexicon('delete'),
            );
        }
        if (!empty($resourceArray['published'])) {
            $resourceArray['actions'][] = array(
                'className' => 'unpublish',
                'text' => $this->modx->lexicon('unpublish'),
            );
        } else {
            $resourceArray['actions'][] = array(
                'className' => 'publish orange',
                'text' => $this->modx->lexicon('publish'),
            );
        }
        return $resourceArray;
    }

    public function ellipsis($string,$length = 300) {
        if (strlen($string) > $length) {
            $string = substr($string,0,$length).'...';
        }
        return $string;
    }
}
return 'ArticleGetListProcessor';