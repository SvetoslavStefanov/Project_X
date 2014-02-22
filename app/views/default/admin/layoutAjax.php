<?

if(isset($data['isUserLogged']) && !$data['isUserLogged']) {
	header("HTTP/1.0 401 Unauthorized");
}
echo json_encode($data);
exit;