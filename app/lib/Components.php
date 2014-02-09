<?php
/**
 * Description of Helper
 *in views:
 *      How to load component ?
 * <?=$components->gallery()?>
 * 
 *      How to load component with argument ?
 * <?=$components->gallery($myarguments)?>
 * 
 *      How to load component with more than one argument ?
 * <?=$components->gallery('argument one', 'argument two', 'argument three')?>
 * 
 *      How to load a html component ?
 * <?$components->setExt('html');?>
 * <?=$components->gallery()?>
 * 
 *      How to load specific function from our component ?
 * <?=$components->gallery_open()?>
 * some html here 
 * <?=$components->gallery_close()?>
 * 
 * @author svetlio
 */
class Components {
    protected $ext = '.php';
    private $components_dir = '';
    private $loaded_components = array();
    private $file_name = '';
    private $func_name = '';

    public function setExt($ext){
        $this->ext = '.'.$ext;
    }

    private function validate(){
        if(!file_exists($this->components_dir))
                return false;

        return true;
    }

    private function addLoadedComponents(){
        if(!$this->func_name)
            $this->func_name = $this->file_name;
        
        $this->loaded_components[$this->file_name] = $this->func_name;
    }


    private function loadComponent(){
        $this->components_dir =  VIEWS_DIR."/".View::$tpl."/components/".$this->file_name.$this->ext;
        if(!$this->validate())
                return false;
        $this->addLoadedComponents();
        include_once $this->components_dir;
        
        return true;
    }
    
    private function parseName($name){
        if(preg_match("/_{1}/", $name)){
            list($this->file_name, $this->func_name) = explode('_', $name);
        }else{
            $this->func_name = '';
        }
    }

    public function __call($name, $arguments) {
        $this->file_name = $name;

        $this->parseName($name);
        $name = $this->func_name ? $this->file_name.'_'.$this->func_name : $this->file_name;
        
        if($this->loadComponent()){
            if($this->ext == '.php')
                    return call_user_func_array($name, $arguments);
        }else{
            return 'Няма зареден компонент с това име: '.$name;
        }
    }
    
    //записва съдържанието във файл и го инклуудва за да се изпълни
    public static function compileComponent($comp_name, $content){
        $file = COMPONENTS_DIR.'/'.$comp_name.'.php';
        \unlink($file);
        $content = '<?php '.$content.' ?>';
        
        if(!file_exists($file)){
            $handle = fopen($file, 'w');
            fwrite($handle, $content);
            fclose($handle);
        }
        
        include $file;
    }
}

?>
