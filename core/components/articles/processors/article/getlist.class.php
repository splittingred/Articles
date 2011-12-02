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

    public function initialize() {
        $this->editAction = $this->modx->getObject('modAction',array(
            'namespace' => 'core',
            'controller' => 'resource/update',
        ));
        return parent::initialize();
    }

    public function prepareQueryBeforeCount(xPDOQuery $c) {
        $c->innerJoin('modUser','CreatedBy');

        $parent = $this->getProperty('parent',null);
        if ($parent !== null) {
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
            /** @var modTemplateVar $tv */
            $tv = $this->modx->getObject('modTemplateVar',array('name' => 'articlestags'));
            if ($tv) {
                $c->leftJoin('modTemplateVarResource','TemplateVarResources',array(
                    'TemplateVarResources.tmplvarid' => $tv->get('id'),
                    'TemplateVarResources.contentid = Article.id',
                ));
                $queryWhere['OR:TemplateVarResources.value:LIKE'] = '%'.$query.'%';
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

    public function prepareQueryAfterCount(xPDOQuery $c) {
        $c->select($this->modx->getSelectColumns('Article','Article'));
        $c->select(array(
            'createdby_username' => 'CreatedBy.username'
        ));
        return $c;
    }

    /**
     * @param xPDOObject|Article $object
     * @return array
     */
    public function prepareRow(xPDOObject $object) {
        $resourceArray = parent::prepareRow($object);
        $resourceArray['tags'] = $object->getTVValue('articlestags');

        if (!empty($resourceArray['publishedon'])) {
            $resourceArray['publishedon_date'] = strftime('%b %d',strtotime($resourceArray['publishedon']));
            $resourceArray['publishedon_time'] = strftime('%H:%I %p',strtotime($resourceArray['publishedon']));
            $resourceArray['publishedon'] = strftime('%b %d, %Y %H:%I %p',strtotime($resourceArray['publishedon']));
        }
        $resourceArray['action_edit'] = '?a='.$this->editAction->get('id').'&action=post/update&id='.$resourceArray['id'];

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