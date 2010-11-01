-- phpMyAdmin SQL Dump
-- version 3.3.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 01, 2010 at 12:41 AM
-- Server version: 5.0.51
-- PHP Version: 5.2.6-1+lenny8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `webengine`
--

-- --------------------------------------------------------

--
-- Table structure for table `Administrators`
--

CREATE TABLE IF NOT EXISTS `Administrators` (
  `userAccount` int(10) unsigned NOT NULL,
  UNIQUE KEY `userAccount` (`userAccount`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Administrators`
--


-- --------------------------------------------------------

--
-- Table structure for table `ContactPersons`
--

CREATE TABLE IF NOT EXISTS `ContactPersons` (
  `customer` int(10) unsigned NOT NULL,
  `userAccount` int(10) unsigned NOT NULL,
  UNIQUE KEY `customer` (`customer`,`userAccount`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Assignes a UserAccount to each Customer. The user is the def';

--
-- Dumping data for table `ContactPersons`
--


-- --------------------------------------------------------

--
-- Table structure for table `Customers`
--

CREATE TABLE IF NOT EXISTS `Customers` (
  `customerId` int(10) unsigned NOT NULL auto_increment,
  `address` text collate utf8_unicode_ci,
  PRIMARY KEY  (`customerId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Dumping data for table `Customers`
--


-- --------------------------------------------------------

--
-- Table structure for table `DocumentAccess`
--

CREATE TABLE IF NOT EXISTS `DocumentAccess` (
  `documentId` int(10) unsigned NOT NULL,
  `limitedAccess` int(10) unsigned NOT NULL,
  `unlimitedAccess` int(10) unsigned NOT NULL,
  KEY `documentId` (`documentId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `DocumentAccess`
--


-- --------------------------------------------------------

--
-- Table structure for table `Documents`
--

CREATE TABLE IF NOT EXISTS `Documents` (
  `documentId` int(10) unsigned NOT NULL auto_increment,
  `documentName` varchar(256) collate utf8_unicode_ci NOT NULL,
  `documentSource` varchar(4096) collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`documentId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Dumping data for table `Documents`
--


-- --------------------------------------------------------

--
-- Table structure for table `Inventory`
--

CREATE TABLE IF NOT EXISTS `Inventory` (
  `itemId` int(11) NOT NULL auto_increment,
  `itemName` varchar(255) collate utf8_unicode_ci NOT NULL,
  `place` text collate utf8_unicode_ci,
  `worth` float default NULL,
  `amount` float default NULL,
  `unit` varchar(30) collate utf8_unicode_ci default NULL,
  PRIMARY KEY  (`itemId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Dumping data for table `Inventory`
--


-- --------------------------------------------------------

--
-- Table structure for table `StaffMembers`
--

CREATE TABLE IF NOT EXISTS `StaffMembers` (
  `staffMemberId` int(10) unsigned NOT NULL auto_increment,
  `userAccount` int(10) unsigned NOT NULL,
  `employmentRelationship` varchar(30) collate utf8_unicode_ci default NULL,
  PRIMARY KEY  (`staffMemberId`),
  UNIQUE KEY `userAccount` (`userAccount`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Dumping data for table `StaffMembers`
--


-- --------------------------------------------------------

--
-- Table structure for table `UserAccounts`
--

CREATE TABLE IF NOT EXISTS `UserAccounts` (
  `userId` int(11) unsigned NOT NULL auto_increment,
  `username` varchar(65) collate utf8_unicode_ci NOT NULL,
  `password` varchar(65) collate utf8_unicode_ci default NULL,
  `title` varchar(30) collate utf8_unicode_ci default NULL,
  `forename` varchar(50) collate utf8_unicode_ci default NULL,
  `surname` varchar(50) collate utf8_unicode_ci default NULL,
  `email` varchar(320) collate utf8_unicode_ci default NULL,
  `address` text collate utf8_unicode_ci,
  PRIMARY KEY  (`userId`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Dumping data for table `UserAccounts`
--

