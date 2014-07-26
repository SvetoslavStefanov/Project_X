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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Схема на данните от таблица `contact`
--

INSERT INTO `contact` (`id`, `ip`, `subject`, `content`, `email`, `created`) VALUES
(1, '::1', 'Запитване', 'testing', 'svetliooo@gmail.com', 1406372786),
(2, '::1', 'Запитване', 'dsa', 'dsa@dsa.ds', 1406372937),
(3, '::1', 'Запитване', 'dsa', 'dsa@dsa.ds', 1406372953);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Схема на данните от таблица `infopage`
--

INSERT INTO `infopage` (`created`, `updated`, `title`, `content`, `status`, `seo_description`, `seo_keywords`, `id`) VALUES
(1406370122, 1406371606, 'Тестова страница 2', 'много дълго описание\n    ', 0, '', '', 1);

-- --------------------------------------------------------

--
-- Структура на таблица `project`
--

CREATE TABLE IF NOT EXISTS `project` (
  `id` int(7) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Схема на данните от таблица `project`
--

INSERT INTO `project` (`id`, `title`, `content`) VALUES
(1, 'Име на проект', 'описание на проект'),
(2, 'test', 'test'),
(3, 'test', 'test');

-- --------------------------------------------------------

--
-- Структура на таблица `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(7) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL,
  `password` varchar(32) NOT NULL,
  `email` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Схема на данните от таблица `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `email`) VALUES
(1, 'svetlio', '8bad263b3adedab3f09966d2e86da981', 'svetliooo@gmail.com');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
