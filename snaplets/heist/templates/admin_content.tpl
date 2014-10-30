<!doctype html>
<html lang="jp">
<head>
	<meta charset="utf-8">
	<title>iFrame</title>
	<script type="text/javascript" src="/js/core.js"></script>
	<script type="text/javascript" src="/js/jquery-1.11.1.min.js"></script>
	<script>

	// コアスクリプト
	function updateElement(_data){
		core=new ParsingEngine();
		core.updateElement(_data);
	}

	$(function(){
		$(document).click(function(e){
			$("div").each(function(index,element){
				$(element).removeClass("clickshadow");
			});
			if($(e.target).is("div")){
				$(e.target).addClass("clickshadow");
			}
		})
	})
	</script>
</head>
<body>

</body>
</html>