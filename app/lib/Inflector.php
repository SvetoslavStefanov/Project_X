<?php

class Inflector {
	public static function pluralize($word){
		$lowercased = strtolower($word);

		static $uncountables = array('equipment', 'information', 'rice', 'money', 'species', 'series', 'fish', 'sheep');
		
		foreach ($uncountables as $uncountable){
			if (substr($lowercased, -1 * strlen($uncountable)) == $uncountable){
				return $word;
			}
		}

		static $irregular = array(
			'/(person)$/i'	=> 'people',
			'/(man)$/i'		=> 'men',
			'/(child)$/i'	=> 'children',
			'/(sex)$/i'		=> 'sexes',
			'/(move)$/i'	=> 'moves'
		);
		foreach ($irregular as $plural=> $singular){
			if (preg_match($plural, $word, $arr)) {
				return preg_replace($plural, substr($arr[0], 0, 1) . substr($singular,1), $word);
			}
		}

		static $plural = array(
			'/(quiz)$/i'				=> '\1zes',
			'/^(ox)$/i'					=> '\1en',
			'/([m|l])ouse$/i'			=> '\1ice',
			'/(matr|vert|ind)ix|ex$/i'	=> '\1ices',
			'/(x|ch|ss|sh)$/i'			=> '\1es',
			'/([^aeiouy]|qu)ies$/i'		=> '\1y',
			'/([^aeiouy]|qu)y$/i'		=> '\1ies',
			'/(hive)$/i'				=> '\1s',
			'/(?:([^f])fe|([lr])f)$/i'	=> '\1\2ves',
			'/sis$/i'					=> 'ses',
			'/([ti])um$/i'				=> '\1a',
			'/(buffal|tomat)o$/i'		=> '\1oes',
			'/(bu)s$/i'					=> '\1ses',
			'/(alias|status)/i'			=> '\1es',
			'/(octop|vir)us$/i'			=> '\1i',
			'/(ax|test)is$/i'			=> '\1es',
			'/s$/i'						=> 's',
			'/$/'						=> 's'
		);
		
		foreach ($plural as $rule => $replacement){			
			if (preg_match($rule, $word)) {
				return preg_replace($rule, $replacement, $word);
			}
		}
		
		return false;
	}
	
	public static function camelize($word){
		if(preg_match_all('/\/(.?)/',$word,$got)){
	   		foreach ($got[1] as $k=>$v){
	       		$got[1][$k] = '::'. strtoupper($v);
	   		}
	   		$word = str_replace($got[0],$got[1],$word);
		}

		return str_replace(' ', '', ucwords(preg_replace('/[^A-Z^a-z^0-9^:]+/', ' ', $word)));
	}
	
	public static function methodName($word){
		$word = self::camelize($word);
		$word[0] = strtolower($word[0]);
		return $word;
	}

	public static function underscore($word) {
		return strtolower(preg_replace(
			array('/[^A-Z^a-z^0-9^\/]+/', '/([a-z\d])([A-Z])/', '/([A-Z]+)([A-Z][a-z])/', '/::/'),
			array('_', '\1_\2', '\1_\2', '/'), 
			$word
		));
	}
}