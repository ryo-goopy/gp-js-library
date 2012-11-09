var FEEDGET = function(feedBlockId,feedCount,feedCount_each){	
	if(!feedCount_each){
		feedCount_each = feedCount;
	}
	var entryArray = new Array();
	var entryNum = 0;
	
	removeLink = new Array(
		"rss.rssad.jp"
	);
	
	this.feedAdd = function(rssUrl,boolNum){
		var feed = new google.feeds.Feed(rssUrl);
		feed.setNumEntries(feedCount_each);
		feed.load(function(result) {
			if (!result.error) {
				for (var i = 0; i < result.feed.entries.length; i++) {
					entryArray[entryNum] = result.feed.entries[i];
					var date = new Date(result.feed.entries[i].publishedDate);
					entryArray[entryNum].sortDate = ( date.getFullYear()*10000 ) + ( (date.getMonth() + 1)*100 ) + date.getDate();//ソート用（日付）を連想配列に代入
					entryArray[entryNum].blogName = result.feed.author;//ブログ名を連想配列に代入
					entryNum+=1;
				}
			}
			if(boolNum==1){
				dispfeed(feedBlockId, feedCount);//フィードの出力
			}
		});
	}
	
	function dispfeed(dispId,dispCount){
		var container = document.getElementById(dispId);
		var htmlstr = "";
		entryArray = asort(entryArray, "sortDate");//日付でソート
		if(dispCount==0) dispCount = entryNum;
		
		for (var i = 0; i < dispCount;  i++) {
			var entry = entryArray[i];
			if( matchAd(entry.link) ){
				dispCount++;
				continue;
			}
			var strdate = createDateString(entry.publishedDate);
			htmlstr += "<dt>" + strdate + "</dt>";
			htmlstr += '<dd><a href="' + entry.link + '"';
			if( !entry.link.match(window.location.hostname) ){
				htmlstr += ' target="_blank"';
			}
			htmlstr += ' title="' + entry.title + '">';
			htmlstr += truncate(entry.title,18) + '&nbsp;';
			if(entry.blogName.length > 0){
				htmlstr += '<span>['+ entry.blogName.slice(0,15) +']</span>';
			}
			htmlstr += '</a></dd>';
		}
		container.innerHTML = htmlstr;
	}
	
	function matchAd(link){
		for(var i=0; i<=removeLink.length-1;i++){
			b = link.indexOf(removeLink[i],7);
			var result = false;
			if(b>0){	//マッチしたらtrue返して終了
				result = true;
				break;
			}else{
				result = false;
			}
		}
		return result;
	}
	
	function asort(myArray, key){
		//return myArray.sort ( function (b1, b2) { return b1[key] > b2[key] ? 1 : -1; } );//昇順
		return myArray.sort ( function (b1, b2) { return b1[key] > b2[key] ? -1 : 1; } );//降順
	}
	function truncate(str,cnt){
		if(str.length > cnt){
			str = str.slice(0,cnt);
			str += "...";
		}
		return str;
	}
	
	function createDateString(publishedDate){
		var pdate = new Date(publishedDate);	
		var pday = pdate.getDate();
		var pmonth = pdate.getMonth() + 1;
		var pyear = pdate.getFullYear();
		var strdate = pyear + "年" + pmonth + "月" + pday + "日";
		return strdate;
	}
	
	//google.setOnLoadCallback(init);
	
	/*	ページ個々に設定
	feed = new FEEDGET("feed-load-id",10,10);
	$(functiont(){
		feed.feedAdd("http://mariage1kato.hamazo.tv/index.rdf",0);
		feed.feedAdd("http://toyohashi1.dosugoi.net/index.rdf",0);
		feed.feedAdd("http://ekimae.hamazo.tv/index.rdf",0);
		feed.feedAdd("http://hikuma1.hamazo.tv/index.rdf",1);
	});
	*/
}