-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Sam 12 Novembre 2022 à 00:59
-- Version du serveur :  10.1.19-MariaDB
-- Version de PHP :  5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `hanoi`
--

-- --------------------------------------------------------

--
-- Structure de la table `disponible`
--

CREATE TABLE `disponible` (
  `username` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `partie_enregistree`
--

CREATE TABLE `partie_enregistree` (
  `id` int(11) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `partie` text NOT NULL,
  `pile` text NOT NULL,
  `rect_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `partie_enregistree`
--

INSERT INTO `partie_enregistree` (`id`, `mail`, `mdp`, `partie`, `pile`, `rect_id`) VALUES
(1, 'jazz@rasta.fr', 'jazz', '{"x":393.33333333333337,"y":375,"s":1,"w":30,"h":25,"socle":9,"b_x":393.33333333333337,"b_y":375,"up":null,"down":null,"isSommet":true,"click":false,"in":false,"pos":false,"self":false,"id":0}sep{"x":645,"y":375,"s":2,"w":60,"h":25,"socle":10,"b_x":645,"b_y":375,"up":null,"down":null,"isSommet":true,"click":false,"in":false,"pos":false,"self":false,"id":1}sep{"x":96.66666666666669,"y":375,"s":3,"w":90,"h":25,"socle":8,"b_x":96.66666666666669,"b_y":375,"up":null,"down":null,"isSommet":true,"click":false,"in":false,"pos":false,"self":false,"id":2}sep{"self":false,"x":91.66666666666669,"y":400,"s":50,"lx":141.66666666666669,"ly":310,"lh":90,"lw":5,"pile":1,"color":"#000000","in":false,"sommet":2,"tabSommet":[2],"id":8}sep{"self":false,"x":358.33333333333337,"y":400,"s":50,"lx":408.33333333333337,"ly":310,"lh":90,"lw":5,"pile":1,"color":"#000000","in":false,"sommet":0,"tabSommet":[0],"id":9}sep{"self":false,"x":625,"y":400,"s":50,"lx":675,"ly":310,"lh":90,"lw":5,"pile":1,"color":"#000000","in":false,"sommet":1,"tabSommet":[1],"id":10}sep', '{"elem":0,"id":1,"next":null,"rectSelected":1,"select":false}sep{"elem":2,"id":3,"rectSelected":null,"select":false}sep{"elem":1,"id":2,"rectSelected":null,"select":false}sep', 'facile'),
(2, 'brouz@brouz', 'carl', '{"x":393.33333333333337,"y":350,"s":1,"w":30,"h":25,"socle":9,"b_x":393.33333333333337,"b_y":350,"up":null,"down":null,"isSommet":true,"click":false,"in":true,"pos":false,"self":false,"id":0}sep{"x":378.33333333333337,"y":375,"s":2,"w":60,"h":25,"socle":9,"b_x":378.33333333333337,"b_y":375,"up":null,"down":null,"isSommet":false,"click":false,"in":true,"pos":false,"self":false,"id":1}sep{"x":96.66666666666669,"y":375,"s":3,"w":90,"h":25,"socle":8,"b_x":96.66666666666669,"b_y":375,"up":null,"down":null,"isSommet":true,"click":false,"in":false,"pos":false,"self":false,"id":2}sep{"self":false,"x":91.66666666666669,"y":400,"s":50,"lx":141.66666666666669,"ly":310,"lh":90,"lw":5,"pile":1,"color":"#000000","in":false,"sommet":2,"tabSommet":[2],"id":8}sep{"self":false,"x":358.33333333333337,"y":400,"s":50,"lx":408.33333333333337,"ly":310,"lh":90,"lw":5,"pile":2,"color":"#000000","in":true,"sommet":0,"tabSommet":[1,0],"id":9}sep{"self":false,"x":625,"y":400,"s":50,"lx":675,"ly":310,"lh":90,"lw":5,"pile":0,"color":"#000000","in":false,"sommet":null,"tabSommet":[],"id":10}sep', '{"elem":0,"id":1,"next":null,"rectSelected":0,"select":false}sep{"elem":2,"id":3,"rectSelected":null,"select":false}sep{"elem":1,"id":2,"rectSelected":null,"select":false}sep', 'facile'),
(3, 'readmi@red.com', 'kasamar', '', '', ''),
(4, 'ro@ro', 'ro', '', '', '');

-- --------------------------------------------------------

--
-- Structure de la table `salon`
--

CREATE TABLE `salon` (
  `salon` varchar(255) NOT NULL,
  `nb_block` varchar(11) NOT NULL,
  `candidat` varchar(255) NOT NULL,
  `pret` varchar(11) NOT NULL,
  `victoire` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `salon`
--

INSERT INTO `salon` (`salon`, `nb_block`, `candidat`, `pret`, `victoire`) VALUES
('jazz@rasta.fr', '3', 'brouz@brouz', 'ready', 'brouz@brouz');

-- --------------------------------------------------------

--
-- Structure de la table `score_local`
--

CREATE TABLE `score_local` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `temps` varchar(255) NOT NULL,
  `deplacement` int(11) NOT NULL,
  `niveau` varchar(255) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `score_local`
--

INSERT INTO `score_local` (`id`, `nom`, `temps`, `deplacement`, `niveau`, `score`) VALUES
(1, 'yokai', '00 : 03', 1, 'facile', 0),
(2, 'Kasimir', '00 : 05', 1, 'facile', 0),
(3, 'Bamba', '01 : 17', 1, 'facile', 0),
(4, 'Real', '00 : 15', 7, 'facile', 0),
(5, 'El', '00 : 04', 1, 'facile', 125),
(6, 'Real time', '00 : 49', 11, 'facile', 80),
(7, 'leon', '00 : 49', 13, 'facile', 67),
(8, 'Grossomodo', '00 : 30', 11, 'facile', 130),
(9, 'Bamba', '00 : 33', 8, 'facile', 119);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `partie_enregistree`
--
ALTER TABLE `partie_enregistree`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `score_local`
--
ALTER TABLE `score_local`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `partie_enregistree`
--
ALTER TABLE `partie_enregistree`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pour la table `score_local`
--
ALTER TABLE `score_local`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
