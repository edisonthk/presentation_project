<!doctype html>
<html lang="jp">
<head>
	<meta charset="utf-8">
	<title>iFrame</title>
	<script type="text/javascript" src="/js/core.js"></script>
	<script type="text/javascript" src="/js/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="/js/selector.js"></script>
	<script>

	// コアスクリプト
	function updateElement(_data){
		core=new ParsingEngine();
		core.updateElement(_data);
	}

	$(function(){

		var _s = new Selector("system-selector");

		$(document).click(function(e){
			$("div").each(function(index,element){
				$(element).removeClass("clickshadow");
			});
			if($(e.target).is("div")){
				_s.selectElement(e);
				$(e.target).addClass("clickshadow");
			}else{
				_s.hide();
			}
		})
	})
	</script>
	<style type="text/css">
	.selector {
		position: absolute;
		width: 60px;
		height: 60px;
		top: 20px;
		left: 50px;
		border: 1px solid #CCC;
		z-index: 999;
	}
	.selector-border {
		position: absolute;
		width: 10px;
		height: 10px;
		border: 1px solid #CCC;
		cursor: e-resize;
	}
	.selector .selector-border.selector-top-left {
		top: -5px;
		left: -5px;
	}
	.selector .selector-border.selector-top-right {
		top: -5px;
		right: -5px;
	}
	.selector .selector-border.selector-bot-left {
		bottom: -5px;
		left: -5px;
	}
	.selector .selector-border.selector-bot-right {
		bottom: -5px;
		right: -5px;
	}
	</style>
</head>
<body>
	<div id="system-selector" class="selector">
		<div class="selector-border selector-top-left"></div>
		<div class="selector-border selector-top-right"></div>
		<div class="selector-border selector-bot-left"></div>
		<div class="selector-border selector-bot-right"></div>
	</div>

</body>
</html>