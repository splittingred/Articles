<?php
require_once (dirname(__FILE__).'/articlesnotifyservice.class.php');
/**
 * @package articles
 */
class ArticlesPingomatic extends ArticlesNotifyService {
    public function notify($title,$url) {
        return $this->sendPost($title,$url);
    }

    public function sendPost($title,$url) {
        $server = $this->modx->getOption('articles.pingomatic_server',null,'http://rpc.pingomatic.com/');
        $request='<?xml version="1.0"?>'.
                '<methodCall>'.
                ' <methodName>weblogUpdates.ping</methodName>'.
                '  <params>'.
                '   <param>'.
                '    <value>'.$title.'</value>'.
                '   </param>'.
                '  <param>'.
                '   <value>'.$url.'</value>'.
                '  </param>'.
                ' </params>'.
                '</methodCall>';

        $success = false;
        $ch = curl_init();
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	    curl_setopt($ch, CURLOPT_URL, $server);
	    curl_setopt($ch, CURLOPT_HTTPHEADER,
            array(
                'Content-type: text/xml',
                'Content-length: '.strlen($request),
                'User-Agent: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1) Gecko/20090624 Firefox/3.5 (.NET CLR 3.5.30729',
            )
        );
        curl_setopt($ch, CURLOPT_POST, true);
	    curl_setopt($ch, CURLOPT_POSTFIELDS, $request);
	    $result = curl_exec($ch);
	    if (empty($result)) {
	        $this->modx->log(modX::LOG_LEVEL_ERROR,'Could not connect to pingomatic!');
	    }

        /** @var SimpleXMLElement $xml */
        $xml = simplexml_load_string($result);
        if ($xml->params && $xml->params->param && $xml->params->param->value && $xml->params->param->value->struct && $xml->params->param->value->struct->member && $xml->params->param->value->struct->member[0]) {
            $errorCode = $xml->params->param->value->struct->member[0];
            $errorMessage = $xml->params->param->value->struct->member[1];
            if ((string)$errorCode->value->boolean == '1') {
                $this->modx->log(modX::LOG_LEVEL_ERROR,'[Articles] Pingomatic error: '.$errorMessage->value->string);
            } else {
                $this->modx->log(modX::LOG_LEVEL_INFO,'[Articles] Sent Ping-o-matic request for "'.$title.'" at URL: '.$url);
                $success = true;
            }
        }
        return $success;
    }
}