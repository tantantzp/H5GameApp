<?php
	require_once "conn.php";
	
	$conn = mysqli_connect($host, $user, $password, $database, $port);
	
	
	if($_POST['score'] >= 0){
		$query = "update player_info set score = ".$_POST['score']." where openid = '".$_COOKIE['openid']."'";
		$result = mysqli_query($conn, $query);	
	}
		
	//$query = "select (select count(*) from player_info) as cnt, (select max(score) from player_info) as max";
	$query = "SELECT (COUNT(DISTINCT score) + 1) as place FROM player_info WHERE score > ".$_POST['score'];
	$result = mysqli_query($conn, $query);
	$row = mysqli_fetch_array($result);
	$retInfo = array('numPlay' => $row['place'], 'bestScore' => 100);
	echo json_encode($retInfo);
	
	mysqli_close($conn);
?>