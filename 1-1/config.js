
var mysql = require('mysql');












//mysql数据库连接配置
exports.db = mysql.createConnection({
	host:'127.0.0.1',
	port:3306,
	database:'sina_blog',
	user:'root',
	password:'mkplus+;'
});
//博客配置
exports.sinaBlog = {
	url:'http://blog.sina.com.cn/u/1776757314' //博客首页地址
}


// db.query('show tables',function(err,tables){
// 	if(err){
// 		console.error(err.stack);
// 	}else{
// 		console.log(tables);
// 	}
// 	db.end();
// });