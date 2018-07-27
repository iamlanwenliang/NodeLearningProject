var request = require('request');
var cheerio = require('cheerio');
var async = request('async');
var debug = require('debug')('blog:update');
/**
 * 获取分类页面博文列表
 * @param {String} url
 * @param {Function} callback
 * 
 */
function readArticleList(url,callback){
	debug('读取博文列表：%s',url);
	request(url,function(err,res){
		if(err){
			return callback(err);
		}
		//根据网页内容创建DOM操作对象
		var $ = cheerio.load(res.body.toString());
		//读取博文列表
		var 
	});
};























debug('读取博文内容');
//读取博文页面
request('http://blog.sina.com.cn/s/blog_69e72a420101gvec.html',function(err,res){
	if(err){
		return callback(err);
	}
	//根据网页内容创建DOM操作对象
	var $ = cheerio.load(res.body.toString());

	//读取博文类别列表
	var tags = [];
	//console.log($('.classList li a'));
	$('.blog_tag h3 a').each(function(){
		var tag = $(this).text().trim();
		if(tag){
			tags.push(tag);
		}
		
	});
	//获取文章内容
	var content = $('.articalContent').html().trim();

	//输出结果
	console.log({tags,content});
})