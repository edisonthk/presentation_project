{* Sample of Core.js *}
<html>
  <head>
    <title>Sample</title>
    <script type="text/javascript" src="/js/core.js"></script>
  </head>
  <body></body>
  <script type="text/javascript">
      var _data = [
        {
          "name":"object1",
          "type":"object",
          "characteristics": {"full_screen":true,"text":"ffdffsdf","verticalAlign":"middle","fontColor":"black","textAlign":"middle","color":"transparent"}
        },
        {
          "name":"my_frame_object",
          "type":"object_frame",
          "characteristics": {"x":"200px","y":"200px"},
          "frames": [
            "/img/explosion/explosion_01.png",
            "/img/explosion/explosion_02.png",
            "/img/explosion/explosion_03.png",
            "/img/explosion/explosion_04.png",
            "/img/explosion/explosion_05.png",
            "/img/explosion/explosion_06.png",
            "/img/explosion/explosion_07.png",
            "/img/explosion/explosion_08.png",
            "/img/explosion/explosion_09.png",
            "/img/explosion/explosion_10.png",
            "/img/explosion/explosion_11.png",
            "/img/explosion/explosion_12.png",
            "/img/explosion/explosion_13.png",
            "/img/explosion/explosion_14.png",
            "/img/explosion/explosion_15.png",
            "/img/explosion/explosion_16.png",
            "/img/explosion/explosion_17.png",
          ],
        },
        {
          "name":"my_frame_object1",
          "type":"object_frame",
          "characteristics": {"x":"200px","y":"0px"},
          "frames": [
            "/img/fish/fish0001.png",
            "/img/fish/fish0004.png",
            "/img/fish/fish0005.png",
            "/img/fish/fish0006.png",
            "/img/fish/fish0007.png",
            "/img/fish/fish0008.png",
            "/img/fish/fish0009.png",
            "/img/fish/fish0010.png",
            "/img/fish/fish0011.png",
            "/img/fish/fish0012.png",
            "/img/fish/fish0013.png",
            "/img/fish/fish0014.png",
            "/img/fish/fish0015.png",
            "/img/fish/fish0016.png",
            "/img/fish/fish0017.png",
            "/img/fish/fish0018.png",
            "/img/fish/fish0019.png",
          ],
        },
        {
          "name":"my_frame_object2",
          "type":"object_frame",
          "characteristics": {"x":"0px","y":"200px"},
          "frames": [
            "/img/explosion/explosion_01.png",
            "/img/explosion/explosion_02.png",
            "/img/explosion/explosion_03.png",
            "/img/explosion/explosion_04.png",
            "/img/explosion/explosion_05.png",
            "/img/explosion/explosion_06.png",
            "/img/explosion/explosion_07.png",
            "/img/explosion/explosion_08.png",
            "/img/explosion/explosion_09.png",
            "/img/explosion/explosion_10.png",
            "/img/explosion/explosion_11.png",
            "/img/explosion/explosion_12.png",
            "/img/explosion/explosion_13.png",
            "/img/explosion/explosion_14.png",
            
          ],
        }
      ]

      core = new ParsingEngine();
      core.updateElement(_data);
    </script>
</html>
