/*
  1:歌曲搜索接口
    请求地址:http://musicapi.leanapp.cn/search/suggest
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/

const vm = new Vue({
	el:"#player",
	data:{
		query:'',
		musicList:[],
		musicUrl:'',
		musicCover:'',
		isPlay:false,
		hotComments:[],
		mvUrl:'',
		isShow:false,
	},
	methods:{
		//歌曲搜索
		// searchMusic:function(){
		// 	let _this=this;
		// 	axios.get("http://musicapi.leanapp.cn/search/suggest?keywords=" + this.query)
		// 	.then(function(res){
		// 		console.log('"歌曲搜索结果:')
		// 		console.log(res);
		// 		//歌曲列表
		// 		_this.musicList = res.data.result.songs;
		// 		console.log("歌曲列表:"+_this.musicList);
		// 	},function(err){console.log(err);})
		// },
		searchMusic: function() {
		  var that = this;
		  axios.get("http://musicapi.leanapp.cn/search/suggest?keywords=" + this.query).then(
		    function(response) {
		      // console.log(response);
		      that.musicList = response.data.result.songs;
		      console.log(response.data.result.songs);
		    },
		    function(err) {}
		  );
		},
		
		//播放歌曲
		playMusic:function(musicId){
			let _this=this;
			// axios.get('https://autumnfish.cn/song/url?id='+musicId)
			// .then(function(res){
			// 	console.log("歌曲接口:"+res);
			// 	_this.musicUrl=res.data.data[0].url;
			// },function(err){
			// 	console.log(err);
			// })
			//   console.log(musicId);
			// 获取歌曲地址
			axios.get("https://autumnfish.cn/song/url?id=" + musicId).then(
			  function(response) {
			    // console.log(response);
			    // console.log(response.data.data[0].url);
			    _this.musicUrl = response.data.data[0].url;
			  },
			  function(err) {console.log(err)})
			
			
			//歌曲详情获取
			axios.get('https://autumnfish.cn/song/detail?ids='+musicId)
			.then(function(res){
				console.log("歌曲详情:"+res);
				_this.musicCover=res.data.songs[0].al.picUrl;
			},function(err){
				console.log(err);
			})
			
			
			//歌曲评论获取
			axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId).then(
			  function(res) {
			    console.log("评论接口详情："+res);
			    _this.hotComments = res.data.hotComments;
			  },
			  function(err) {
				  console.log(err);
			  }
			);
			
			
		},
		
		
		//播放
		play:function(){
			this.isPlay=true;
		},
		//暂停
		pause:function(){
			this.isPlay=false;
		},
		
		//播放MV
		playMv:function(mvid){
			let _this=this;
			axios.get('https://autumnfish.cn/mv/url?id='+mvid)
			.then(function(res){
				console.log("mv接口详情"+res);
				_this.isShow=true;
				_this.mvUrl=res.data.data.url;
			},function(err){
				console.log(err);
			})
		},
		//隐藏MV
		hide:function(){
			this.isShow=false;
		}
		
	}
})