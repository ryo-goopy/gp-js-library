$(function(){
	if(location.search){
		var qStr = location.search.substr(1).split('&');	//URLの"?"以降を取得、&で区切って配列化（[mode=list],[ModCat3=8]）
		qGET = {};											//配列宣言
		for(var i=0; i<qStr.length; i++){					//パラメータの数だけループ
			var qData = qStr[i].split('=');					//"="で区切って配列化([mode],[list])
			qGET[qData[0]] = qData[1];						//qDataの第一配列(パラメータの名前)をキーとして連想配列に入れる
		}
	}else{
		qGET = "";
	}
});