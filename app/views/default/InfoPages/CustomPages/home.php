<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyD_f21BYMoGwcbQrbalXfJ7pboR2xt8C_k&sensor=false"></script>
<script type="text/javascript">

          $(document).ready(function() {
            if ($('#home-map').length != 0) {
            var myOptions = {
          center: new google.maps.LatLng(22.917923, -4.394531),
          zoom: 2,
          mapTypeId: google.maps.MapTypeId.TERRAIN,
          scrollwheel: false
        };
        var map = new google.maps.Map(document.getElementById("home-map"),
            myOptions);
          }
      });
</script>
<div id="home-map"></div>
<div id="home-add">
    <img src="/images/home-add.png" alt="Добави нова информация за българите в чужбина" class="add_icon"/>
	<h2>Добави съдържание</h2>
	<p>Направихме страницата ни интерактивна, лесна и удобна за да можете сами да добавите нова информация в световната карта.</p>
        <p>&nbsp;</p>
        <ul>
            <li><b>Добавете организация:</b></li>
            <li>+ <a href="#">Медия</a></li>
            <li>+ <a href="#">Училище</a></li>
            <li>+ <a href="#">Посолство</a></li>
            <li>+ <a href="#">Култ. институт</a></li>
            <li>+ <a href="#">Организация</a></li>
            <li>+ <a href="#">Фондация</a></li>
            <li>+ <a href="#">Асоциация</a></li>
            <li>+ <a href="#">Общност</a></li>
        </ul>
        <ul>
            <li><b>Добавете събитие:</b></li>
            <li>+ <a href="#">Фестивал</a></li>
            <li>+ <a href="#">Арт проект</a></li>
            <li>+ <a href="#">Изложба</a></li>
            <li>+ <a href="#">Концерт</a></li>
            <li>+ <a href="#">Танц</a></li>
            <li>+ <a href="#">Постановка</a></li>
            <li>+ <a href="#">Лекция</a></li>
            <li>+ <a href="#">Семинар</a></li>
        </ul>
        <ul>
            <li><b>Добавете възможност:</b></li>
            <li>+ <a href="#">Стипендия</a></li>
            <li>+ <a href="#">Финансиране</a></li>
            <li>+ <a href="#">Участие</a></li>
            <li>+ <a href="#">Резиденция</a></li>
            <li>+ <a href="#">Конкурс</a></li>
        </ul>
        <ul>
            <li><b>Добавете обява:</b></li>
            <li>+ <a href="#">Работа</a></li>
            <li>+ <a href="#">Купува</a></li>
            <li>+ <a href="#">Продава</a></li>
            <li>+ <a href="#">Наем</a></li>
            <li>+ <a href="#">Други</a></li>
        </ul>
        <ul>
            <li><b>Добавете услуга:</b></li>
            <li>+ <a href="#">Аудио/Видео</a></li>
            <li>+ <a href="#">Компютри</a></li>
            <li>+ <a href="#">Туризъм</a></li>
            <li>+ <a href="#">Транспорт</a></li>
            <li>+ <a href="#">Почистване</a></li>
            <li>+ <a href="#">Счетоводство</a></li>
            <li>+ <a href="#">Хранителни</a></li>
            <li>+ <a href="#">Ремонти</a></li>
            <li>+ <a href="#">Строителство</a></li>
            <li>+ <a href="#">Електро</a></li>
            <li>+ <a href="#">Преводи</a></li>
            <li>+ <a href="#">Други</a></li>
        </ul>
</div>
<div id="home-subs">
    <img src="/images/home-subs-email.png" alt="Абонаменти за събития, обяви, новини с българи в чужбина" class="subscribe-icon" />
	<h2>Абонирай се</h2>
	<p>За да получавате новата информация веднага след като бъде добавена, направете абонамент за държава или град по избор.</p>
	<form>
        <label>Име:</label>
        <input placeholder="Въведете име" />
        <label>E-mail:</label>
        <input placeholder="Въведете e-mail" />
        <label>Абонамент за държава или град:</label>
        <select>
            <option value="">Държава</option>
            <option>Държави</option>
        </select>
        <select>
            <option value="">Град</option>
            <option>Град</option>
        </select>
        <input type="checkbox" />
        <label>Абонамент за новини от проекта</label>
        <input id="id_button" type="submit" value="Абонирай ме" />
    </form>
</div>
<div id="home-reg">
    <!--<img src="/images/home-reg.png" alt="Регистрация на българи в чужбина, Napred-Nazad профил" />-->
	<h2>Регистрирай профил</h2>
	<p>- За да се абонирате за повече от една държава или град
	<br />- За да добавите данни в световната карта
	<br />- За да изградите профил с информация за вас</p>
        <p><?=link_to('Sign/up', 'Регистрация', array("class" => "button"))?></p>
</div>
<!--<div id="home-join">
	<h2>Ела в екипа</h2>
	<p>Имаме нужда от помощници, които да се грижат за локалните ни Фейсбук страници. Ако имате желание да се включите активно, <a href="#">натиснете тук</a>.</p>
</div>-->