<?php
	require_once("conn.php");
	$conn = mysqli_connect($host, $user, $password, $database, $port);
	$query = "select * from player_info order by score desc limit 10";
	$result = mysqli_query($conn, $query);
?>
<table border="1" cellspacing="1" cellpadding="1" align="center">
	<tr>	
		<th>Rank</th>
		<th>Score</th>
		<th>HeadImg</th>
		<th>Nickname</th>
		<th>Sex</th>
		<th>Province</th>
		<th>City</th>
		<th>Country</th>
	</tr>
<?php
	$rank = 1;
	while($row = mysqli_fetch_array($result)){
		echo "<tr>";
			echo "<td>".$rank."</td>";	
			echo "<td>".$row['score']."</td>";	
			echo "<td>".'<img src="'.str_replace("/0", "/46", $row['headimgurl']).'" />'."</td>";
			echo "<td>".$row['nickname']."</td>";
			echo "<td>".$row['sex']."</td>";	
			echo "<td>".$row['province']."</td>";	
			echo "<td>".$row['city']."</td>";	
			echo "<td>".$row['country']."</td>";	
		echo "</tr>";
		$rank = $rank + 1;
	}
?>
</table>

<?php	
	mysqli_close($conn);
?>