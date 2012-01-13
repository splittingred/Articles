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
require_once dirname(dirname(dirname(dirname(__FILE__)))).'/config.core.php';
require_once MODX_CORE_PATH.'config/'.MODX_CONFIG_KEY.'.inc.php';
require_once MODX_CONNECTORS_PATH.'index.php';
/**
 * Sends the user to the Twitter authentication page to authenticate Articles to allow it to post to Twitter
 *
 * @var modX $modx
 * @var array $scriptProperties
 *
 * @package articles
 * @subpackage twitter
 */
$corePath = $modx->getOption('articles.core_path',null,$modx->getOption('core_path').'components/articles/');
require_once $corePath.'model/articles/articlesservice.class.php';
$articles = new ArticlesService($modx);
$modx->lexicon->load('articles:default');

$oAuthPath = $corePath.'model/articles/notification/lib.twitteroauth.php';
require_once $oAuthPath;

if (empty($_REQUEST['container'])) die('No container!');
/** @var ArticlesContainer $container */
$container = $modx->getObject('ArticlesContainer',$_REQUEST['container']);
if (empty($container)) die('Container not found!');

$keys = $container->getTwitterKeys();
$settings = $container->getProperties('articles');
define('CONSUMER_KEY',$keys['consumer_key']);
define('CONSUMER_SECRET',$keys['consumer_key_secret']);

$https = isset($_SERVER['HTTPS']) ? $_SERVER['HTTPS'] : false;
$selfUrl= (!$https || strtolower($https) != 'on') ? 'http://' : 'https://';
$selfUrl .= $_SERVER['HTTP_HOST'];
if ($_SERVER['SERVER_PORT'] != 80) $selfUrl= str_replace(':' . $_SERVER['SERVER_PORT'], '', $selfUrl);
$selfUrl .= ($_SERVER['SERVER_PORT'] == 80 || ($https !== false || strtolower($https) == 'on')) ? '' : ':' . $_SERVER['SERVER_PORT'];
$selfUrl .= $_SERVER['PHP_SELF'];

if (empty($_REQUEST['oauth_token']) || empty($_REQUEST['oauth_verifier'])) {
    $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);
    $selfUrl .= '?container='.$container->get('id');
    $requestToken = $connection->getRequestToken($selfUrl);
    if (empty($requestToken)) die('Could not get Request Token.');
    $redirectUrl = $connection->getAuthorizeURL($requestToken);
    if (empty($redirectUrl)) die('Could not get redirect to auth page URL.');
    $modx->sendRedirect($redirectUrl);
} else {
    $connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET,$_REQUEST['oauth_token'],$_REQUEST['oauth_verifier']);
    $tokenCredentials = $connection->getAccessToken($_REQUEST['oauth_verifier']);
    if (empty($tokenCredentials) || empty($tokenCredentials['oauth_token'])) die('Error occurred while trying to get access token.');
    $settings = $container->getProperties('articles');
    $settings['notifyTwitterAccessToken'] = $container->encrypt($tokenCredentials['oauth_token']);
    $settings['notifyTwitterAccessTokenSecret'] = $container->encrypt($tokenCredentials['oauth_token_secret']);
    $settings['notifyTwitterUsername'] = $tokenCredentials['screen_name'];
    $settings['notifyTwitterUserId'] = $tokenCredentials['user_id'];
    $container->setProperties($settings,'articles');
    $container->save();
    echo '<script type="text/javascript">alert("Twitter authenticated!"); window.close();</script>';
    die();
}

return '';