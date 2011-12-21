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
 * Base abstract class for notification senders
 *
 * @package articles
 * @subpackage notifications
 */
abstract class ArticlesNotification {
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

    /**
     * @abstract
     * @param string $title The title of the Article
     * @param string $url The full URL of the Article
     * @return boolean
     */
    abstract public function send($title,$url);
}