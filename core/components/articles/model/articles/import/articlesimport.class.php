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
 * @abstract
 * @package articles
 * @subpackage import
 */
abstract class ArticlesImport {
    /** @var modX $xpdo */
    public $modx;
    /** @var ArticlesService $articles */
    public $articles;
    /** @var array $config */
    public $config = array();
    /** @var boolean $debug */
    public $debug = false;
    /** @var ContainerImportProcessor $processor */
    public $processor;

    function __construct(ArticlesService $articles,ContainerImportProcessor $processor,array $config = array()) {
        $this->articles =& $articles;
        $this->processor =& $processor;
        $this->modx =& $articles->modx;
        $this->config = array_merge(array(

        ),$config);
        if (!empty($this->config['id'])) {
            $this->config['id'] = trim(trim($this->config['id'],'#'));
        }

        $this->initialize();
    }

    /**
     * Initialize the importer and load the Quip package
     */
    public function initialize() {
        @set_time_limit(0);
        @ini_set('memory_limit','1024M');
        $quipPath = $this->modx->getOption('quip.core_path',null,$this->modx->getOption('core_path').'components/quip/');
        $this->modx->addPackage('quip',$quipPath.'model/');
    }

    /**
     * Abstract method that is called to import from a specific service.
     * @abstract
     * @return boolean
     */
    abstract public function import();

    /**
     * Add an error to the response
     * @param string $field
     * @param string $message
     * @return mixed
     */
    public function addError($field,$message = '') {
        return $this->processor->addFieldError($field,$message);
    }
}