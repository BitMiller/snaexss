<?php
/*
#Created @260421-2-1900

> URL.Android: http://localhost:8080/Dropbox/WhiteAndRoll/webprogs/_games/snaexss/git/index.php
> URL.Leni: http://localhost/Dropbox/WhiteAndRoll/webprogs/_games/snaexss/git/index.php

> Title: Snaexss - comes from plural of "Snake", with a little spice

*/

    header("Content-Type: text/html; charset=UTF-8");
    header("Cache-Control: no-cache, no-store, must-revalidate");
    header("Pragma: no-cache");
    header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");

    $t = "?t=".time();

/*

> [Alt Gr] is smart:
 > https://chatgpt.com/c/69e71ee4-b010-832a-8e9d-99536335cbcf : war

> Keypress handler:
 > https://chatgpt.com/c/69e75dc6-6e14-8329-a136-867acb66b82f : war

> https://www.toptal.com/developers/keycode

*/

?><!DOCTYPE html>
<html lang="hu">

	<head>
<!--
		<meta charset="UTF-8">
		<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Expires" content="0">
-->
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

		<title>Snaexss...</title>

        <?php
            /*require_once("../../__common/main/c_constants.php");
            require_once("../../__common/php/fn_date-time-stamp.php");
            require_once("code/main/p_global-constants.php");
            require_once("code/main/p_global-variables.php");*/
        ?>

		<link rel="stylesheet" type="text/css" href="code/css/style.css<?= $t ?>">

	</head>

	<body>

        <div id="id_gameContainer">
            <div id="id_gameAreaContainer"></div>
            <div id="id_controlPanel">
                <button onclick="gamePlay()">Játék!</button>
                <button onclick="gamePause()">Sztoj</button>
                <button onclick="gameIdle()">Újrakezdés</button>
                <span>&nbsp;Alma: <span id="id_appleCounter">0</span> |</span>
                <span>&nbsp;Méreg: <span id="id_poisonCounter">0</span></span>
                <span>&nbsp;Lépések: <span id="id_stepCounter">0</span></span>
            </div>
        </div>

        <script type="text/javascript" src="code/javascript/constants.js<?= $t ?>"></script>
        <script type="text/javascript" src="code/javascript/elem-vars.js<?= $t ?>"></script>
        <script type="text/javascript" src="code/javascript/area-types.js<?= $t ?>"></script>
        <script type="text/javascript" src="code/javascript/game-area.js<?= $t ?>"></script>
        <script type="text/javascript" src="code/javascript/snake.js<?= $t ?>"></script>
        <script type="text/javascript" src="code/javascript/key-handling.js<?= $t ?>"></script>
        <script type="text/javascript" src="code/javascript/animation.js<?= $t ?>"></script>
        <script type="text/javascript" src="code/javascript/dom-content-loaded.js<?= $t ?>"></script>

        <script>




        </script>

	</body>
</html>