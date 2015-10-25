<?php
	//GET Param: code, state
	error_reporting(0);
	/*
	if($_COOKIE['openid'] != ''){
		goto END;
	}
	*/
	define('ERR_BASE', 100);	//maybe useful.	errcode < 100, our own defined error
	$ERR_NO_CODE = array('errcode' => 1, 'errmsg' => 'No code');
	$ERR_NO_STATE = array('errcode' => 2, 'errmsg' => 'No state');
 
	//oauth2	
	//$userInfo = array('openid' => '1001', 'nickname' => 'whquan', 'sex' => 'M', 'headimgurl' => '', 'province' => '', 'city' => '', 'country' => '');		//complement this array
	$errInfo = array('errcode' => 0,	'errmsg' => '');
	$cookieInfo = array('openid' => "", 'played' => "false");
	
	$code = $_GET['code'];		//code
	if($code == ""){
		$errInfo = $ERR_NO_CODE;
		//echo json_encode($errInfo);
		//exit;
		goto END;
	}
	
	$state = $_GET['state'];	//state
	if($state == ""){
		$errInfo = $ERR_NO_STATE;
		//echo json_encode($errInfo);
		//exit;
		goto END;
	}elseif(strtoupper($state) == "STATE"){	
		$ret = getUserInfoFromWeixin($code, $state);
		if($ret == false){
			//echo json_encode($errInfo);
			//exit;
			goto END;
		}
	}else{
		$ret = getUserInfoFromDb($code, $state);
		if($ret == false){
			//echo json_encode($errInfo);
			//exit;
			goto END;
		}
	}
			
	setcookie('openid', $cookieInfo['openid'], time()+3600, '/');
	if($cookieInfo['played'] == 'true'){
		setcookie('played', $cookieInfo['played'], time()+3600, '/');	
	}
	
	END:
	
	function getUserInfoFromWeixin($code, $state){
		global $cookieInfo, $errInfo;
		
		$appid = "wxd32fa03d5ce9cb61";	//appid
		$appsecret = "6b3119937392ce1026528f3ecfe38367";	//appsecret
		
		//////////////////////////////////////////////////////
		//step 1: get access_token
		$url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=$appid&secret=$appsecret&code=$code&grant_type=authorization_code";
		$result = https_request($url);
		//TODO// network error check
		
		$jsonResult = json_decode($result, true);
		$errcode = $jsonResult["errcode"];
		if($errcode != ""){
			$errInfo = $jsonResult;
			return false;
		}
		$openid = $jsonResult["openid"];	//openid
		$access_token = $jsonResult["access_token"];	//access_token
		$cookieInfo['openid'] = $openid;
		
		//search database
		require_once "conn.php";
		$conn = mysqli_connect($host, $user, $password, $database, $port);
		$query = 'SELECT score FROM player_info WHERE openid = "'.$openid.'"';
		$result = mysqli_query($conn, $query);
		$row = mysqli_fetch_array($result);
		if($row != ""){
			if($row["score"] >= 0){
				$cookieInfo['played'] = "true";
			}
			return true;
		}
		
		//////////////////////////////////////////////////////
		//step 2: get user info
		$url = "https://api.weixin.qq.com/sns/userinfo?access_token=$access_token&openid=$openid&lang=zh_CN";
		$result = https_request($url);
		//TODO// network error check
		
		$jsonResult = json_decode($result, true);
		$errcode = $jsonResult["errcode"];
		if($errcode != ""){
			$errInfo = $jsonResult;
			return false;
		}
		//insert into db
		$query = "insert into player_info (openid, headimgurl, nickname, sex, province, city, country, privilege, unionid) values ('".$jsonResult['openid']."', '".$jsonResult['headimgurl']."', '".$jsonResult['nickname']."', '".$jsonResult['sex']."', '".$jsonResult['province']."', '".$jsonResult['city']."', '".$jsonResult['country']."', '".$jsonResult['privilege']."', '".$jsonResult['unionid']."')";
		$result = mysqli_query($conn, $query);		
		return true;
	}
	
	function getUserInfoFromDb($state){
		global $errInfo;
		//......
		return true;
	}
	
	function https_request($url,$data = null){
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
		if (!empty($data)){
			curl_setopt($curl, CURLOPT_POST, 1);
			curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
		}
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		$output = curl_exec($curl);
		curl_close($curl);
		return $output;
	}
?>
