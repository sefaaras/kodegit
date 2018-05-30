<!DOCTYPE html>

<html lang="en">

    <head>

        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link rel="stylesheet" type="text/css" href="css/style.css" />

        <script type="text/javascript" src="js/canvas.js"></script>
        <script type="text/javascript" src="js/animate.js"></script>
        <script type="text/javascript" src="js/hero.js"></script>
        <script type="text/javascript" src="js/debug.js"></script>
        <script type="text/javascript" src="js/quest.js"></script>

        <title>Kodlama Eğitim Platformu</title>

    </head>

    <body>

        <div id="header">
            <div id="logo"><p>Kodlama Eğitim Platformu</p></div>
            <div id="menu">
                <ul>
                    <li><a href="index.php">Anasayfa</a></li>
                    <li><a href="index.php">Kodegit</a></li>
                    <li><a href="index.php">Hakkında</a></li>
                    <li><a href="index.php">İletişim</a></li>
                    <li><a href="index.php">Üye Ol</a></li>
                    <li><a href="index.php">Giriş Yap</a></li>
                </ul>
            </div>
        </div>

        <div id="main">

            <div id="canvas">
                <canvas id="myCanvas">
                    Your browser does not support the HTML5 canvas tag.
                </canvas>
            </div>

            <div id="code">
                <div id="codeTitle"><p>Kod Alanı</p></div>
                <div id="codeText">
                    <textarea id="codeArea"></textarea>
                </div>
                <div id="codeButton">
                    <button class="button" onclick="debug()">Çalıştır</button>
                    <button class="button" onclick="reset()">Sıfırla</button>
                    <button class="button" onclick="clearText()">Temizle</button>
                    <button class="button" onclick="settings()">Ayarla</button>
                    <label id="value" visible="false"></label>
                </div>

            </div>

        </div>

        <div id="footer">
            <p>Karadeniz Teknik Üniversitesi Bilgisayar Mühendisliği</p>
            <p>2018 Yüksek Lisans Tezi</p>
        </div>
        <?php
            if(!empty($_GET['game'])) {
                switch($_GET['game']) {
                    case 1: echo "<script src='js/game/e1/s1.js'></script>"; break;
                    case 2: echo "<script src='js/game/e1/s2.js'></script>"; break;
                    case 3: echo "<script src='js/game/e1/s3.js'></script>"; break;
                    case 4: echo "<script src='js/game/e1/s4.js'></script>"; break;
                    case 5: echo "<script src='js/game/e1/s5.js'></script>"; break;
                    case 6: echo "<script src='js/game/e1/s6.js'></script>"; break;
                    case 7: echo "<script src='js/game/e1/s7.js'></script>"; break;
                    case 8: echo "<script src='js/game/e1/s8.js'></script>"; break;

                    default: echo "<script src='js/game/e1/s1.js'></script>"; break;
                }
            }
            else {
                echo "<script src='js/game/e1/s1.js'></script>";
            }
        ?>

    </body>

</html>