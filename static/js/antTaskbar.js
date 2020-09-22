// 定义一个名为 button-counter 的新组件
Vue.component('ant-taskbar', {
    data: function() {
        return {
            moveStyle: {
                "cursor": "default",
                "display": "none",
            },
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
                    zIndex: 1000,
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
                    zIndex: 1000,
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
            <li v-for="item in windows" :class="{'ant-this':item.current}" @click="btnToggle(item.id)" class="ant-task-item"><img class="ant-window-header-icon" :src="item.icon"></li>
          
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
    <ant-window v-for="item in windows" v-show="!item.hide" v-on:drag="drag" v-on:windowctl="windowctl" :win="item"></ant-window>
  
    </div>
    `,
    methods: {
        drag: function(flag) {
            console.log("触发")
            if (flag) {
                this.moveStyle.display = "block"
            } else {
                this.moveStyle.display = "none"
            }

        },
        //工具
        findWindowById: function(id) {
            // 返回结构
            // ｛
            //     index:0, 哪一个
            //     object:null, 对象
            // ｝
            // 没有找到返回null
            for (var i = 0; i < this.windows.length; i++) {
                if (this.windows[i].id == id) {
                    var res = {
                        index: i,
                        object: this.windows[i]
                    }
                    return res
                }
            }
            return null
        },
        clearAllCurrent: function() {
            for (var i = 0; i < this.windows.length; i++) {
                var win = this.windows[i]

                win.current = false


                this.$set(this.windows, i, win)
            }
            console.log("清除所有当前状态")
        },
        //窗口小图片操作
        btnToggle: function(id) {
            var res = this.findWindowById(id)
            if (res) {
                if (res.object.hide) {
                    this.clearAllCurrent()
                    res.object.hide = false
                    res.object.current = true
                    this.$set(this.windows, res.index, res.object)
                } else {

                    res.object.hide = true
                    res.object.current = false
                    this.$set(this.windows, res.index, res.object)
                }
            }
        },
        //窗口操作触发
        windowctl: function(ctl) {
            // ctl结构
            // ctl = {
            //     id: "",
            //     mold: "", //操作类型，min 最小，close 关闭，max 最大，current 当前，normal 正常模式

            // }
            switch (ctl.mold) {
                case "min": //窗口最小化
                    res = this.findWindowById(ctl.id)
                    if (res) {

                        res.object.hide = true
                        res.object.current = false
                        this.$set(this.windows, res.index, res.object)
                        this.windowsort()
                    }
                    break;
                case "normal": //窗口正常化
                    res = this.findWindowById(ctl.id)
                    if (res) {
                        res.object.max = false
                        this.$set(this.windows, res.index, res.object)
                        this.windowsort()
                    }
                    break

                case "max": //窗口最大化
                    res = this.findWindowById(ctl.id)
                    if (res) {
                        res.object.max = true
                        this.$set(this.windows, res.index, res.object)
                        this.windowsort()
                    }
                    break

                case "current": //窗口当前化
                    res = this.findWindowById(ctl.id)
                    if (res) {
                        for (var i = 0; i < this.windows.length; i++) {
                            this.clearAllCurrent()
                            var win = this.windows[i]
                            win.current = true
                            this.$set(this.windows, res.index, win)
                        }

                        this.windowsort()
                    }
                    break
                case "close": //关闭窗口
                    break;


            }

        },
        windowsort: function() { //对窗口排序

        },

    },
    created: function() {

    }
})