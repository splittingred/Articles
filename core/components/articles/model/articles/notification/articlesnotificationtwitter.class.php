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
require_once (dirname(__FILE__).'/articlesnotification.class.php');
require_once (dirname(__FILE__).'/lib.twitteroauth.php');
/**
 * Posts titles, URLs and tags for new Articles to Twitter
 * @package articles
 * @subpackage twitter
 */
class ArticlesNotificationTwitter extends ArticlesNotification {

    public function initialize() {
        $this->config = array_merge($this->config,$this->article->getContainerSettings());
    }

    public function send($title, $url) {
        $this->initialize();
        $url = $this->shorten($url);
        $message = $this->getMessage($title,$url);
        return $this->update($message);
    }

    public function update($message) {
        /** @var ArticlesContainer $container */
        $container = $this->modx->getObject('ArticlesContainer',$this->article->get('parent'));
        if (!$container) return false;

        $keys = $container->getTwitterKeys();
        $accessToken = $container->decrypt($this->config['notifyTwitterAccessToken']);
        $accessTokenSecret = $container->decrypt($this->config['notifyTwitterAccessTokenSecret']);
        $connection = new TwitterOAuth($keys['consumer_key'],$keys['consumer_key_secret'],$accessToken,$accessTokenSecret);
        $output = $connection->post('statuses/update', array('status' => $message));
        return $output;
    }

    public function getMessage($title,$url) {
        $defaultTpl = '[[+title]] [[+url]] [[+hashtags]]';
        $defaultTplLength = strlen($defaultTpl);
        $tpl = $this->modx->getOption('notifyTwitterTpl',$this->config,$defaultTpl);
        $encoding = $this->modx->getOption('modx_charset',null,'UTF-8');
        $useMb = $this->modx->getOption('use_multibyte',null,false) && function_exists('mb_strlen');

        $preProcessedLength = $useMb ? mb_strlen($tpl,$encoding) : strlen($tpl);
        $preProcessedLength = $preProcessedLength - $defaultTplLength + 2; /* subtract placeholders */
        if ($preProcessedLength < 1 || $preProcessedLength > 140) {
            $tpl = $defaultTpl;
            $preProcessedLength = 2;
        }

        $tags = $this->article->getTVValue('articlestags');
        $tags = explode(',',$tags);
        $hashTags = array();
        $tagLimit = $this->modx->getOption('notifyTwitterTagLimit',$this->config,3);
        $badTagChars = array(' ','#','$','*','@','(',')','[',']','=','!','?',';',',','.');
        $i = 1;
        foreach ($tags as $tag) {
            if ($i > $tagLimit) break;
            $hashTags[] = '#'.str_replace($badTagChars,'',strtolower(trim(ltrim($tag,'#'))));
            $i++;
        }
        $hashTags = implode(' ',$hashTags);

        $titleLength = $useMb ? mb_strlen($title,$encoding) : strlen($title);
        $urlLength = $useMb ? mb_strlen($url,$encoding) : strlen($url);
        $hashTagsLength = $useMb ? mb_strlen($hashTags,$encoding) : strlen($hashTags);
        $processedLength = $preProcessedLength + $titleLength + $urlLength + $hashTagsLength;

        if ($processedLength > 140) {
            $extraChars = 140 - $processedLength;
            $l = ($extraChars + 3) * -1;
            $title = $useMb ? mb_substr($title,0,$l,$encoding) : substr($title,0,$l);
            $title .= '...';
        }

        return str_replace(array(
            '[[+title]]',
            '[[+url]]',
            '[[+hashtags]]',
        ),array(
            $title,
            $url,
            $hashTags,
        ),$tpl);
    }

    public function shorten($url) {
        $shorteningService = $this->modx->getOption('shorteningService',$this->config,'tinyurl');
        if (!empty($shorteningService)) {
            $className = 'ArticlesShortener'.ucfirst(strtolower($shorteningService));
            if (class_exists($className)) {
                /** @var ArticlesTwitterShortener $shortener */
                $shortener = new $className($this);
                $url = $shortener->shorten($url,$this->config);
            }
        }
        return $url;
    }
}

/**
 * Abstract base class for shortening classes. Thanks to Kyle Jaebker (muddydogpaws.com) for the inspiration.
 *
 * @package articles
 * @subpackage twitter
 */
abstract class ArticlesTwitterShortener {
    /** @var modX $modx */
    public $modx;
    /** @var Article $article */
    public $article;
    /** @var ArticlesNotificationTwitter $notifier */
    public $notifier;
    /** @var array $config */
    public $config = array();

    function __construct(ArticlesNotificationTwitter $notifier,array $settings = array()) {
        $this->notifier =& $notifier;
        $this->modx =& $notifier->modx;
        $this->article =& $notifier->article;
        $this->config = array_merge($this->config,$settings);
    }

    /**
     * @param string $url
     * @return array
     */
    abstract protected function getParameters($url);
    abstract protected function getServiceUrl();

    /**
     * @param string $url
     * @return mixed
     */
    public function shorten($url) {
        $response = null;
        $userAgent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.6) Gecko/20070725 Firefox/2.0.0.6';
        $parameters = $this->getParameters($url);
        $serviceUrl = $this->getServiceUrl();
        $requestUrl = $this->prepareRequestUrl($serviceUrl,$parameters);

        if (!empty($requestUrl)) {
            if (function_exists('curl_init')) {
                $ch = curl_init();
                $options = array(
                    CURLOPT_URL => $requestUrl,
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_USERAGENT => $userAgent,
                    CURLOPT_TIMEOUT => 30,
                );
                if (ini_get('open_basedir') == '' && ini_get('safe_mode' == 'Off')) $options[CURLOPT_FOLLOWLOCATION] = true;
                $options[CURLOPT_RETURNTRANSFER] = true;
                $this->prepareCurlOptions($options);
                curl_setopt_array($ch, $options);
                $response = curl_exec($ch);
                curl_close($ch);
            } else {
                @ini_set('user_agent',$userAgent);
                $response = file_get_contents($requestUrl);
            }
        }
        return $this->parseResponse($response,$url);
    }

    protected function prepareRequestUrl($serviceUrl,array $parameters = array()) {
        $query = http_build_query($parameters);
        if (strpos($serviceUrl,'?') === false) {
            $query = '?'.$query;
        }
        return $serviceUrl.$query;
    }
    protected function prepareCurlOptions(array $options = array()) {
        return $options;
    }

    protected function parseResponse($response,$longUrl) {
        return $response;
    }
}

/**
 * @package articles
 * @subpackage twitter
 * @deprecated Apparently bit.ly requires OAuth now; that's gonna be a pain to sort out; delaying for a further release.
 */
class ArticlesShortenerBitly extends ArticlesTwitterShortener {
    protected function getServiceUrl() {
        return $this->modx->getOption('articles.bitly.api_url',null,'http://api.bit.ly/shorten');
    }

    protected function getParameters($url) {
        return array(
            'version' => '2.0.1',
            'login' => $this->modx->getOption('bitlyUsername',$this->config,''),
            'apiKey' => $this->modx->getOption('bitlyApiKey',$this->config,''),
            'longUrl' => $url,
            'format' => 'xml'
        );
    }

    protected function parseResponse($response,$longUrl) {
        /** @var SimpleXmlElement $xml */
        $xml = simplexml_load_string($response);
        $this->modx->log(modX::LOG_LEVEL_ERROR,print_r($xml,true));
        if ($xml->errorCode == 0) {
            $url = $xml->results->nodeKeyVal->shortUrl;
        } else {
            $url = $longUrl;
        }
        return $url;
    }
}

class ArticlesShortenerTinyurl extends ArticlesTwitterShortener {
    protected function getServiceUrl() {
        return $this->modx->getOption('articles.tinyurl.api_url',null,'http://tinyurl.com/api-create.php');
    }
    protected function getParameters($url) {
        return array(
            'url' => $url,
        );
    }
}

class ArticlesShortenerIsgd extends ArticlesTwitterShortener {
    protected function getServiceUrl() {
        return $this->modx->getOption('articles.isgd.api_url',null,'http://is.gd/api.php');
    }
    protected function getParameters($url) {
        return array(
            'longurl' => $url
        );
    }
}

class ArticlesShortenerDigg extends ArticlesTwitterShortener {
    public function getServiceUrl() {
        return $this->modx->getOption('articles.digg.api_url',null,'http://services.digg.com/url/short/create');
    }

    protected function getParameters($url) {
        return array(
            'url' => $url,
            'appkey' => $this->modx->getOption('articles.digg.app_key',null,'http://modx.com'),
            'type' => 'xml',
        );
    }

    protected function parseResponse($response,$longUrl) {
        $xml = simplexml_load_string($response);
        $url = $longUrl;
        if ($xml) {
            foreach($xml->shorturl->attributes() as $a => $b) {
                if ($a == 'short_url') {
                    $url = $b;
                    break;
                }
            }
        }
        return $url;
    }
}