<apply template="base">
<script type="text/javascript" src="/js/jscolor/jscolor.js"></script>
<div id="container">
  <!-- ▼ ヘッダー -->
  <div id="header">
    <ul id="menubar">
      <li id="filemenu"><p onClick="pullDown(ID)">File</p>
          <ul>
            <li><p onClick="change('delete2')">Delete Content2.</p></li>
            <li><p onClick="change('delete')">Delete Bottom Content.</p></li>
            <li><p onClick="change('restore2')">Restore Content2.</p></li>
            <li><p onClick="change('restore')">Restore Bottom Content.</p></li>
          </ul>
      </li>
      <li id="editmenu"><p onClick="pullDown(ID2)">Edit</p>
          <ul>
            <li><p onClick="change('delete2')">Delete Content2.</p></li>
            <li><p onClick="change('delete')">Delete Bottom Content.</p></li>
            <li><p onClick="change('restore2')">Restore Content2.</p></li>
            <li><p onClick="change('restore')">Restore sBottom Content.</p></li>
          </ul>
      </li>
      <li id="displaymenu"><p>Display</p>
        <ul>
          <li>
            <p onClick="changeIframe()">Change size of main window.</p>
          </li>
          <li>
            <p onClick="changeIframe()">Change size of main window.</p>
          </li>
        </ul>
      </li>
      <li><p onClick="dispmenu('circle')">Tool</p>
      </li>
      <li><p onClick="dispmenu('triangle')">Preference</p>
      </li>
      <li><p onclick="showDialog()">Help</p>
      </li>
    </ul>
  </div>

  <!-- ▼ コンテンツ内容 -->
    <div class="full-screen-height clearfix">
      <div id="content1">
        <div class="menu">
          <label class="panel" for="panel1"><p class="list-arrow">Objects</p></label>
          <input type="checkbox" id="panel1" class="on-off" checked/>
          <ul>
          <table class="tablec" frameborder="none">
            <tr>
              <th onClick="appendHTML('san')"><span><img src="icon/theme_03.png" width="50px"></span>
                <li class="arrow_box"><img src="icon/theme_03.png" width="30px" class="middlever">Triangle
                  <hr width="100%" size="1" color="#fff">You can draw a triangle.</li></th>
              <th onClick="appendHTML('fuki')"><span><img src="icon/theme_04.png" width="50px"></span>
               <li class="arrow_box"><img src="icon/theme_04.png" width="30px" class="middlever">Fukidashi
                  <hr width="100%" size="1" color="#fff">You can drow a Fukidashi.</li></th>
              <th onClick="newURL()"><span><img src="icon/theme_06.png" width="50px"></span>
                <li class="arrow_box"><img src="icon/theme_06.png" width="30px" class="middlever">Youtube
                  <hr width="100%" size="1" color="#fff">You can embed youtube.</li></th>
              <th onClick="appendHTML('circ')"><span><img src="icon/theme_07.png" width="50px"></span>
                <li class="arrow_box"><img src="icon/theme_07.png" width="30px" class="middlever">Circle
                  <hr width="100%" size="1" color="#fff">You can drow a circle.</li></th>
            </tr>
            <tr>
              <th><span><img src="icon/theme_11.png" width="50px"></span>
                <li class="arrow_box"><img src="icon/theme_11.png" width="30px" class="middlever">Typing
                  <hr width="100%" size="1" color="#fff">You can type, so gooood!!</li></th>
              <th><img src="icon/theme_13.png" width="50px"></th>
              <th><img src="icon/theme_14.png" width="50px"></th>
              <th><img src="icon/ic_object_frame.png" width="50px" onclick="appendHTML('object_frame')"></th>
            </tr>
          </table>
          </ul>
          <label class="panel" for="panel2"><p class="list-arrow">Action</p></label>
          <input type="checkbox" id="panel2" class="on-off" checked>
          <ul>
          <table class="tablec" frameborder="none">
            <tr>
              <th onClick=""><span><img src="icon/theme_19.png" width="40px"></span>
                <li class="arrow_box">This is triangle. <br>Are you ready? aaaaaaa</li></th>
              <th><img src="icon/theme_20.png" width="40px"></th>
              <th onClick=""><span><img src="icon/theme_22.png" width="40px"></span>
                <li class="arrow_box">This is ummm. <br>Are you ready? aaaaaaa</li></th>
              <th onClick=""><img src="icon/theme_24.png" width="40px"></th>
            </tr>
            <tr>
              <th><img src="icon/theme_28.png" width="40px"></th>
            </tr>
          </table>
          </ul>
          <label class="panel" for="panel3"><p class="list-arrow">Tool</p></label>
          <input type="checkbox" id="panel3" class="on-off" checked>
          <ul>
          <table class="tablec" frameborder="none">
            <tr>
              <th onClick=""><span><img src="icon/theme_31.png" width="40px"></span>
                <li class="arrow_box">This is cursol. <br>Are you ready? aaaaaaa</li></th>
              <th><img src="icon/theme_33.png" width="40px"></th>
              <th onClick=""><img src="icon/theme_35.png" width="40px"></th>
              <th onClick=""><img src="icon/theme_36.png" width="40px"></th>
            </tr>
            <tr>
              <th><img src="icon/theme_11.png" width="40px"></th>
              <th><img src="icon/theme_13.png" width="40px"></th>
              <th><img src="icon/theme_14.png" width="40px"></th>
            </tr>
          </table>
          </ul>
        </div>
      </div>
      <div id="content2" class="moveL">
        <div class="menu">
          <label class="panel" for="panela1">Property</label>
          <input type="checkbox" id="panela1" class="on-off" checked>
          <ul class="content2panel">
            <aa id="propertyMenu">
              <!-- Side menu = Property -->
              <!-- triangle -->
              <div class="sidemenu sidemenu-triangle">
                <nobr><img src="icon/theme_03.png" width="50px" class="middlever">Triangle</nobr><br>
              </div>
              <!-- circle -->
              <div class="sidemenu sidemenu-circle">
                <nobr><img src="icon/theme_07.png" width="50px" class="middlever">Circle</nobr><br>
              </div>
            </aa><br>
            <aa id="xywh">
              <!-- BEGIN: Side menu = Property -->
              <!-- triangle -->
              <div class="sidemenu sidemenu-triangle">
                <nobr>&nbsp;
                  <label>x:&nbsp;<input type="number" id="tri-x" min="-50" style="color:white;height:18px;width:60px;background-color:#222;border:none;">px&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <label>y:&nbsp;<input type="number" id="tri-y" min="-50" style="color:white;height:18px;width:60px;background-color:#222;border:none;">px</label>
                </nobr>
                <br /><br />
                <nobr>&nbsp;
                  <label>z:&nbsp;<input type="number" name="number" min="0" style="color:white;height:18px;width:60px;background-color:#222;border:none;" placeholder="0"></label>
                </nobr>
                <br /><br />
                <nobr>&nbsp;
                  <label>w:&nbsp;<input type="number" id="tri-w" min="0" style="color:white;height:18px;width:60px;background-color:#222;border:none;">px&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <label>h:&nbsp;<input type="number" id="tri-h" min="0" style="color:white;height:18px;width:60px;background-color:#222;border:none;">px</label>
                </nobr>
                <br />
              </div>
              <!-- circle -->
              <div class="sidemenu sidemenu-circle">
                <nobr>&nbsp;
                  <label>x:&nbsp;<input type="number" id="cir-x" min="-50" style="color:white;height:18px;width:60px;background-color:#222;border:none;" placeholder="0">px&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <label>y:&nbsp;<input type="number" id="cir-y" min="-50" style="color:white;height:18px;width:60px;background-color:#222;border:none;" placeholder="0">px</label>
                </nobr>
                <br /><br />
                <nobr>&nbsp;
                  <label>z:&nbsp;<input type="number" name="number" min="0" style="color:white;height:18px;width:60px;background-color:#222;border:none;" placeholder="0"></label>
                </nobr>
                <br /><br />
                <nobr>&nbsp;
                  <label>radius:&nbsp;<input type="number" id="cir-rad" min="0" style="color:white;height:18px;width:60px;background-color:#222;border:none;" placeholder="0">px&nbsp;&nbsp;&nbsp;&nbsp;</label>
                </nobr>
              </div>
              <!-- END: Side menu = Property -->
            </aa>
          </ul>
          <label class="panel" for="panela2">Style</label>
          <input type="checkbox" id="panela2" class="on-off" checked>
          <ul>
            <aa id="color">
              <!-- BEGIN: Side menu = Style -->
              <!-- triangle -->
              <div class="stylemenu stylemenu-triangle">
                  <!--<link rel="stylesheet" type="text/css" href="jquery-ui.css">
                  <link href="evol.colorpicker.css" rel="stylesheet" type="text/css">
                  <div style="width:128px;">
                    <input style="width:100px;" id="mycolor" class="colorPicker evo-cp0" />
                    <span class="evo-colorind" style="background-color:#8db3e2"></span>
                  </div>-->
                <input class="color {pickerFaceColor:'transparent',pickerFace:3,pickerBorder:0,pickerInsetColor:'black'}" style="width:100px">
              </div>
              <!-- circle -->
              <div class="sidemenu sidemenu-circle">

              </div>
              <!-- END: Side menu = Style -->

            </aa>
          </ul>
          <label class="panel" for="panela3">Animation</label>
          <input type="checkbox" id="panela3" class="on-off" checked>
          <ul>
          </ul>
        </div>
      </div>
      <div id="topcontent" class="moveL">
        <iframe id="iframe" name="iFrame" src="/admin_content" width="100%" height="100%" frameborder="none" scrolling="no" marginWidth="5" marginHeight="5" allowTransparency="true">
          <!--margin: 5px 5px 5px 5px;-->
        </iframe>
      </div>
      <div id="bottomcontent" class="moveL">
      </div>
    </div>
</div>
</apply>