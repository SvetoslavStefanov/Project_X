<?php
	//include our class
	require_once(dirname(__FILE__) . '/class.googleHelper.php'); 
	
	//your Google Maps API key (you can get one for free from http://code.google.com/apis/maps/signup.html)
	$apiKey = 'ABQIAAAArVQcVxX32bZ7slezKjYHNxRRy_GDkcWXYwd3sTg48YTx-thxPhQCycvjjWX6XIj0M-uyYhSg6sW5QQ';
	
	//init our object
	$obj = new googleHelper($apiKey);
	
	//get coordinates and print the debug info
	$address = 'Danmark, Sjælland, Hørve, Dragsholm Alle 4534';
	print 'For our "' . $address . '" we have these data : ';
	print '<pre>';
	print_r($obj->getCoordinates($address ));
?>