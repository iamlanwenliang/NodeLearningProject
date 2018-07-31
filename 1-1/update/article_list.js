var request = require('request');
var cheerio = require('cheerio');
var debug = require('debug')('blog:update');

debug('读取博文列表');

function readArticleList(url,callback){
	//读取分类页面
	request(url,function(err,res){
		if(err){
			return callback(err);
		}
		//根据网页内容创建DOM操作对象
		var $ = cheerio.load(res.body.toString());
		//读取博文列表
		var articleList = [];
		$('.articleList .articleCell').each(function(){
			var $me = $(this);
			var $title = $me.find('.atc_title a');
			var $time = $me.find('.atc_tm');
			var item = {
				title:$title.text().trim(),
				url:$title.attr('href'),
				time:$time.text().trim()
			};
			//从URL中取出文章的ID
			var s = item.url.match(/blog_([a-zA-Z0-9]+)\.html/);
			//console.log(s);
			if(Array.isArray(s)){
				item.id = s[1];
				articleList.push(item);
			}

		});
		//检查是否有下一项
		var nextUrl = $('.SG_pgnext a').attr('href');
		if(nextUrl){
			//读取下一页
			readArticleList(nextUrl,function(err,articleList2){
				if(err){
					return callback(err);
				}
				//合并结果
				callback(null,articleList.concat(articleList2));
			});
		}else{
			//返回结果
			callback(null,articleList)
		}



	});



}
readArticleList('http://blog.sina.com.cn/s/articlelist_1776757314_0_1.html',function(err,articleList){
	if(err){
		return console.error(err.stack);
	}
	console.log(articleList);
});










//读取分类页面
request('http://blog.sina.com.cn/s/articlelist_1776757314_0_1.html',function(err,res){
	if(err){
		return console.error(err);
	}
	//根据网页内容创建DOM操作对象
	var $ = cheerio.load(res.body.toString());

	//读取博文类别列表
	var articleList = [];
	//
	$('.articleList .articleCell').each(function(){
		var $me = $(this);
		var $title = $me.find('.atc_title a');
		var $time = $me.find('.atc_tm');
		var item = {
			title:$title.text().trim(),
			time:$time.text().trim(),
			url:$title.attr('href')
		};
		//从URL中取出文章的ID
		var s = item.url.match(/blog_([a-zA-Z0-9]+)\.html/);
		if(Array.isArray(s)){
			item.id = s[1];
			articleList.push(item);
		}
	});
	//输出结果
	console.log(articleList);
})