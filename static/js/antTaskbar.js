// 定义一个名为 button-counter 的新组件
Vue.component('ant-taskbar', {
    props: {
        screen: Object,

    },
    data: function() {
        return {
            moveStyle: {
                "cursor": "default",
                "display": "none",
            },
            currentwinid:null,//当前窗口id
            winmaxzindex:0,//窗口最大zindex
            windows: [{
                    id: 0,
                    title: "测试窗口1",
                    icon: "./img/t1.jpg", //图标
                    url: "./text.html",
                    current: true, //当前状态，
                    max: false, //是否最大化
                    hide: false, //是否隐藏
                    zIndex: 1000,
                    top: 10,
                    left: 10,
                    width: 300,
                    height: 300,
                },
                {
                    id: 1,
                    title: "测试窗口2",
                    icon: "./img/t2.jpg", //图标
                    url: "http://baidu.com",
                    current: false, //当前状态，
                    max: false, //是否最大化
                    hide: false, //是否隐藏
                    zIndex: 1001,
                    top: 10,
                    left: 10,
                    width: 300,
                    height: 300,
                },
                {
                    id: 3,
                    title: "测试窗口3",
                    icon: "./img/gameui.png", //图标
                    url: "http://baidu.com",
                    current: false, //当前状态，
                    max: false, //是否最大化
                    hide: false, //是否隐藏
                    zIndex: 1002,
                    top: 10,
                    left: 10,
                    width: 300,
                    height: 300,
                },
            ],
        }
    },
    template: `
    <div>
    <!-- 任务 -->
    <div class="ant-taskbar" style="z-index: 6599999; ">
        <!-- 开始菜单触发按钮 -->
        <div class="ant-taskbar-start sp"><i class="iconfont iconant-logo"></i></div>
        <!-- 任务项 -->
        <ul class="ant-taskbar-task">
            <li v-for="item in windows" :class="{'ant-this':item.id == currentwinid}" @click="btnToggle(item.id)" class="ant-task-item"><img class="ant-window-header-icon" :src="item.icon"></li>
          
        </ul>
        <!-- 任务栏时间 -->
        <div class="ant-taskbar-time">
            <p>18:08</p>
            <p>2020-9-13</p>
        </div>
        <!-- 控制中心 -->
        <div class="ant-taskbar-message sp">
            <i class="iconfont iconxiaoxi"></i>
        </div>
        <!-- 显示桌面 -->
        <div class="ant-taskbar-desktop">
        </div>
    </div>

    <!-- 显示程序 -->
    <div class="ant-window-move" :style="moveStyle"></div>
    <ant-window v-for="item in windows" v-show="!item.hide" :screen="screen" :currentwinid="currentwinid" v-on:drag="drag" v-on:changewin="changewin" :win="item"></ant-window>
  
    </div>
    `,
    methods: {
        drag: function(info) {
            /**
             * info:{
             * drag:true||false,
             * win:win
             * }
             */
            if (info.drag) {
                this.changewin({current:true,win:info.win})
                this.moveStyle.display = "block"
            } else {
                this.moveStyle.display = "none"
                this.changewin({current:false,win:info.win})
            }
        },
        //工具
        findWindowById: function(id) {
            // 返回结构
            // ｛
            //     index:0, 哪一个
            //     win:null, 对象
            // ｝
            // 没有找到返回null
            for (var i = 0; i < this.windows.length; i++) {
                if (this.windows[i].id == id) {
                    var res = {
                        index: i,
                        win: this.windows[i]
                    }
                    return res
                }
            }
            return null
        },
      
        //窗口小图片操作
        btnToggle: function(id) {
            var res = this.findWindowById(id)
            if (res) {
                if (res.win.hide) {
                    
                    res.win.hide = false
                    this.changewin({current:true,win:res.win})
                    
                } else {

                    res.win.hide = true
                    
                    this.changewin({current:false,win:res.win})
                }
            }
        },
        //窗口核心数据变化
        changewin:function(changeinfo){
            /*
            changeinfo:{
                current:true,//是否激活
                close:false,//可选，是否关闭窗口
                index:null,//可选 
                win:win,//win数据
            }
            */
           if(typeof(changeinfo.close)!='undefined' && changeinfo.close){//是否关闭
            this.checkwindows()
           }else{
               var index = null;
               if(changeinfo.current){//如果设置激活
                    this.currentwinid = changeinfo.win.id
                    
                    if (this.winmaxzindex!=changeinfo.win.zIndex){
                        this.winmaxzindex ++
                        changeinfo.win.zIndex = this.winmaxzindex
                    }
                    
               }
               //如果index没有找到，再找一次
               if(typeof(changeinfo.index)!='number' || changeinfo.index < 0 && changeinfo.index >= this.windows.length){
                var res = this.findWindowById(changeinfo.win.id)
                index = res.index
               }
               this.$set(this.windows,index,changeinfo.win)
               if (changeinfo.win.hide){
                   this.checkwindows()
               }
               
           }

        },
        checkwindows: function() { //检测windows合法性
            var maxIndex = null
            var maxId = null
            var maxzindex = 0
            for(var i = 0 ;i <this.windows.length; i++){
                var win = this.windows[i]
                if (maxzindex <= win.zIndex){
                    
                    maxzindex = win.zIndex
                    if(!win.hide){
                        maxIndex = i
                        maxId = win.id
                    }
                }
            }
            if(maxId!=null){
                
                if (this.currentwinid!=maxId){
                    this.currentwinid = maxId
                }
                if(this.winmaxzindex!=maxzindex){
                    this.winmaxzindex = maxzindex
                }
                
            }else{
                this.currentwinid == null

            }
          
        },

    },
    created: function() {
        this.checkwindows()
    }
})