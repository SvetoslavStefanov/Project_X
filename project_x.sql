-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 
-- Версия на сървъра: 5.6.16
-- PHP Version: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `project_x`
--

-- --------------------------------------------------------

--
-- Структура на таблица `contact`
--

CREATE TABLE IF NOT EXISTS `contact` (
  `id` int(7) NOT NULL AUTO_INCREMENT,
  `ip` varchar(17) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `email` varchar(60) NOT NULL,
  `created` int(12) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Схема на данните от таблица `contact`
--

INSERT INTO `contact` (`id`, `ip`, `subject`, `content`, `email`, `created`) VALUES
(1, '::1', 'Запитване', 'testing', 'svetliooo@gmail.com', 1406372786);

-- --------------------------------------------------------

--
-- Структура на таблица `infopage`
--

CREATE TABLE IF NOT EXISTS `infopage` (
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `status` tinyint(1) NOT NULL,
  `seo_description` varchar(255) NOT NULL,
  `seo_keywords` varchar(255) NOT NULL,
  `id` int(7) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Схема на данните от таблица `infopage`
--

INSERT INTO `infopage` (`created`, `updated`, `title`, `content`, `status`, `seo_description`, `seo_keywords`, `id`) VALUES
(1406370122, 1413033730, 'Тестова страница 222', 'много дълго описание\n    ', 0, '1', '1', 1),
(1406991390, 0, 'Какво е Lorem Ipsum ?', '&lt;p&gt;&lt;strong&gt;Lorem Ipsum&lt;/strong&gt;&amp;nbsp;е елементарен примерен текст, използван в печатарската и типографската индустрия. Lorem Ipsum е индустриален стандарт от около 1500 година, когато неизвестен печатар взема няколко печатарски букви и ги разбърква, за да напечата с тях книга с примерни шрифтове. Този начин не само е оцелял повече от 5 века, но е навлязъл и в публикуването на електронни издания като е запазен почти без промяна. Популяризиран е през 60те години на 20ти век със издаването на Letraset листи, съдържащи Lorem Ipsum пасажи, популярен е и в наши дни във софтуер за печатни издания като Aldus PageMaker, който включва различни версии на Lorem Ipsum.&lt;br&gt;&lt;/p&gt;', 1, 'Какво е Lorem Ipsum ?', 'Lorem Ipsum, Lorem, Ipsum', 10);

-- --------------------------------------------------------

--
-- Структура на таблица `language`
--

CREATE TABLE IF NOT EXISTS `language` (
  `id` int(7) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `full_name` varchar(60) NOT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Схема на данните от таблица `language`
--

INSERT INTO `language` (`id`, `name`, `full_name`, `is_default`) VALUES
(2, 'bg_bg', 'Български', 1),
(3, 'en_en', 'English', 0);

-- --------------------------------------------------------

--
-- Структура на таблица `project`
--

CREATE TABLE IF NOT EXISTS `project` (
  `id` int(7) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Схема на данните от таблица `project`
--

INSERT INTO `project` (`id`, `title`, `content`) VALUES
(1, 'Име на проект', '\nLorem Ipsum е елементарен примерен текст, използван в печатарската и типографската индустрия. Lorem Ipsum е индустриален стандарт от около 1500 година, когато неизвестен печатар взема няколко печатарски букви и ги разбърква, за да напечата с тях книга с примерни шрифтове. Този начин не само е оцелял повече от 5 века, но е навлязъл и в публикуването на електронни издания като е запазен почти без промяна. Популяризиран е през 60те години на 20ти век със издаването на Letraset листи, съдържащи Lorem Ipsum пасажи, популярен е и в наши дни във софтуер за печатни издания като Aldus PageMaker, който включва различни версии на Lorem Ipsum.'),
(3, 'test', 'test'),
(4, 'тест', 'тест');

-- --------------------------------------------------------

--
-- Структура на таблица `translation`
--

CREATE TABLE IF NOT EXISTS `translation` (
  `id` int(7) NOT NULL AUTO_INCREMENT,
  `property_name` varchar(40) NOT NULL,
  `translated` varchar(255) NOT NULL,
  `file_name` varchar(60) NOT NULL,
  `language_id` int(7) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `file_name` (`file_name`),
  KEY `language_id` (`language_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Схема на данните от таблица `translation`
--

INSERT INTO `translation` (`id`, `property_name`, `translated`, `file_name`, `language_id`) VALUES
(6, 'test', 'дддд2', 'contactIndex', 2),
(7, 'subRoutes[project][title]', 'Създай', 'shell', 2),
(8, 'routes[project]', 'Проекти', 'shell', 2),
(9, 'routes[project]', 'Projects', 'shell', 3),
(10, 'subRoutes[project][title]', 'Create', 'shell', 3);

-- --------------------------------------------------------

--
-- Структура на таблица `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(7) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL,
  `password` varchar(32) NOT NULL,
  `email` varchar(60) NOT NULL,
  `selected_lang` int(1) NOT NULL,
  `real_name` varchar(200) NOT NULL,
  `last_login` int(11) NOT NULL,
  `info` text NOT NULL,
  `permissions` blob NOT NULL,
  `pic` int(7) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Схема на данните от таблица `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `email`, `selected_lang`, `real_name`, `last_login`, `info`, `permissions`, `pic`) VALUES
(1, 'svetlio', '8bad263b3adedab3f09966d2e86da981', 'svetliooo@gmail.com', 2, 'Svetoslav Stefanov', 1413615907, 'This is the person who start this project and now is the current CEO, D BOSS дет се вика !', 0x7b2250726f6a656374436f6e74726f6c6c6572223a7b22637265617465223a2274727565222c226e6577223a2274727565222c22696e646578223a2274727565222c2265646974223a2274727565222c22757064617465223a2274727565222c2273686f77223a2274727565222c2264657374726f79223a2274727565227d2c2255736572436f6e74726f6c6c6572223a7b22696e646578223a2274727565222c22637265617465223a2274727565222c226e6577223a2274727565222c2265646974223a2274727565222c22757064617465223a2274727565222c2273686f77223a2274727565222c2264657374726f79223a2274727565222c226368616e67654c616e6775616765223a2274727565222c226765745065726d697373696f6e73223a2274727565222c22656469745065726d697373696f6e73223a2274727565222c227570646174655065726d697373696f6e73223a2274727565227d2c22496e666f70616765436f6e74726f6c6c6572223a7b22696e646578223a2274727565222c22637265617465223a2274727565222c226e6577223a2274727565222c2265646974223a2274727565222c22757064617465223a2274727565222c2273686f77223a2274727565222c2264657374726f79223a2274727565227d2c225369676e436f6e74726f6c6c6572223a7b226f7574223a2274727565222c226c6f67696e223a2274727565227d2c224c616e6775616765436f6e74726f6c6c6572223a7b22696e646578223a2274727565222c22637265617465223a2274727565222c226e6577223a2274727565222c2264657374726f79223a2274727565227d2c22436f6e74616374436f6e74726f6c6c6572223a7b22696e646578223a2274727565222c2264657374726f79223a2274727565227d7d, 27),
(3, 'testname', '9befcac1dc414bb5baa1b69738d878ac', 'bla@mail.bg', 2, 'Just tester ', 1411311903, 'This is some test account, nothing more !', 0x7b2250726f6a656374436f6e74726f6c6c6572223a7b22637265617465223a2266616c7365222c22696e646578223a2274727565222c2265646974223a2266616c7365222c22757064617465223a2266616c7365222c2273686f77223a2274727565222c2264657374726f79223a2266616c7365227d2c2255736572436f6e74726f6c6c6572223a7b22696e646578223a2274727565222c22637265617465223a2266616c7365222c2265646974223a2266616c7365222c22757064617465223a2266616c7365222c2273686f77223a2274727565222c2264657374726f79223a2266616c7365222c226368616e67654c616e6775616765223a2274727565222c226765745065726d697373696f6e73223a2274727565222c22656469745065726d697373696f6e73223a2266616c7365222c227570646174655065726d697373696f6e73223a2266616c7365227d2c22496e666f70616765436f6e74726f6c6c6572223a7b22696e646578223a2274727565222c22637265617465223a2266616c7365222c2265646974223a2266616c7365222c22757064617465223a2266616c7365222c2273686f77223a2274727565222c2264657374726f79223a2266616c7365227d2c225369676e436f6e74726f6c6c6572223a7b226f7574223a2274727565222c226c6f67696e223a2274727565227d2c224c616e6775616765436f6e74726f6c6c6572223a7b22696e646578223a2274727565222c22637265617465223a2266616c7365222c2264657374726f79223a2266616c7365227d2c22436f6e74616374436f6e74726f6c6c6572223a7b22696e646578223a2274727565222c2264657374726f79223a2266616c7365227d7d, 0);

-- --------------------------------------------------------

--
-- Структура на таблица `user_attachments`
--

CREATE TABLE IF NOT EXISTS `user_attachments` (
  `id` int(7) NOT NULL AUTO_INCREMENT,
  `relation_id` int(7) NOT NULL,
  `src` varchar(255) NOT NULL,
  `type` varchar(100) NOT NULL,
  `thumb` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=31 ;

--
-- Схема на данните от таблица `user_attachments`
--

INSERT INTO `user_attachments` (`id`, `relation_id`, `src`, `type`, `thumb`) VALUES
(12, 1, 'user/92014/thumb_3328_1411818513_8f7bb584aaa270851c0c1401c248af95.jpg', 'image', 1),
(24, 1, 'user/102014/thumb_7156_1412618429_b50906795a074fc0b05cfb33a9e3ef74.jpg', 'image', 1),
(25, 1, 'user/102014/thumb_115_1412618429_128ecf542a35ac5270a87dc740918404.jpg', 'image', 1),
(26, 1, 'user/102014/thumb_1682_1412618429_ca473790ac56b15656b5f72e22f78e92.jpg', 'image', 1),
(27, 1, 'user/102014/thumb_2671_1412943240_3b12a41b389cad6430888001052a113f.JPG', 'image', 1),
(28, 1, 'user/102014/thumb_6066_1412947834_4764587bf7c0b61fd6e12d274c6a47ce.jpg', 'image', 1),
(29, 1, 'user/102014/thumb_7967_1412947834_edf37d76405bdc3771f050476e24c20a.jpg', 'image', 1),
(30, 1, 'user/102014/thumb_2286_1412947835_0f4137ed1502b5045d6083aa258b5c42.jpg', 'image', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
