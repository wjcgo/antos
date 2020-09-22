// 定义一个名为 button-counter 的新组件
Vue.component('ant-window', {
    props: {
        currentwinid:Number,
        win: Object,
        screen: Object,

    },
    data: function() {
        return {
            limit: {
                width: 300,
                height: 60,
            },
            cWin: {}, //拷贝win 信息
            style: {
                "z-index": 1000,
                "width": " 893px",
                "height": "600px",
                "top": "302px",
                "left": "52px",
                "overflow": "visible",
                "position": "fixed",
            },
            iframeStyle: {
                "height": "565px",

            },
            url: "./text.html",
        }
    },
    watch: {
        win: {
            handler: function(win) {
                console.log("win参数改变", win)
                this.checkStyle()
            },
            deep: true,
            immediate: true,
        },
        screen:{
            handler:function(){
                this.checkStyle()
            },
            deep:true,
            immediate: true,
        }

    },
    template: `
    <div  class="ant-window ant-window-iframe ant-window-border" id="ant-window34" type="iframe" times="34" showtime="0" contype="string" :style="style"
            area="893,600,60,985" position="fixed" minleft="181px">
            <div class="ant-window-header" style="cursor: move;" @mousedown="mouseDown">
            <img class="ant-window-header-icon" :src="win.icon">
                <div class="ant-window-header-title" >{{win.title}}</div>
            </div>
            <div id="" class="ant-window-content"><iframe scrolling="auto" allowtransparency="true" id="ant-window-iframe34" name="ant-window-iframe34" onload="this.className='';" class="" frameborder="0" :src="url" :style="iframeStyle"></iframe>
           
            <div v-if="currentwinid!=win.id" @mousedown="contentDown" class="ant-window-content-mask"></div>
            </div><span class="ant-window-setwin">
                <button @click="btnMin" class="ant-window-ctlbtn ant-window-min"  ><i class="iconfont iconzuixiaohua_huaban1" style="font-size:24px"></i></button>
                <button @click="btnNormal" v-if="win.max" class="ant-window-ctlbtn ant-window-min" ><i class="iconfont iconhuifu_huaban1" style="font-size:24px"></i></button>
                <button @click="btnMax" v-if="!win.max" class="ant-window-ctlbtn ant-window-min" ><i class="iconfont iconzuidahua_huaban1" style="font-size:24px"></i></button>
                <button @click="btnClose" class="ant-window-ctlbtn ant-window-close" ><i class="iconfont iconguanbi_huaban1" style="font-size:24px"></i></button>
            </span>
            <span class="ant-window-resize"  @mousedown="resizeDown"></span>
        </div>
    `,
    methods: {

        mouseDown: function(e) {
            var self = this;

            self.$emit('drag', {drag:true,win:this.win})
            self.dragInfo.x = e.offsetX;
            self.dragInfo.y = e.offsetY;
            self.dragInfo.overX = this.win.left
            self.dragInfo.overY = this.win.top
            document.addEventListener("mousemove", self.mouseMove);
            document.addEventListener("mouseup", self.mouseUp);
        },
        mouseUp: function(e) {
            var self = this;
            
            this.win.top = this.dragInfo.overY;
            this.win.left = this.dragInfo.overX;
            this.$emit('drag', {drag:false,win:this.win});
            document.removeEventListener("mousemove", self.mouseMove);
            document.removeEventListener("mouseup", self.mouseUp);
        },
        mouseMove: function(e) {
            var self = this;
            var x = e.clientX - self.dragInfo.x;
            var y = e.clientY - self.dragInfo.y;
            this.dragInfo.overX = x
            this.dragInfo.overY = y
            self.style.left = x + "px";
            self.style.top = y + "px";
        },
        resizeDown: function(e) {
            var self = this;
            
            self.dragInfo.width = this.win.width
            self.dragInfo.height = this.win.height
            self.dragInfo.x = e.clientX;
            self.dragInfo.y = e.clientY;
            self.dragInfo.overWidth = this.win.width
            self.dragInfo.overHeight = this.win.height
            self.$emit('drag', {drag:true,win:this.win})
            document.addEventListener("mousemove", self.resizeMove);
            document.addEventListener("mouseup", self.resizeUp);
        },
        resizeUp: function(e) {
            var self = this;
            this.win.width = this.dragInfo.overWidth
            this.win.height = this.dragInfo.overHeight
            if (this.win.width<this.limit.width){
                this.win.width = this.limit.width
            }
            if(this.win.height<this.limit.height){
                this.win.height = this.limit.height
            }
            this.$emit('drag', {drag:false,win:this.win})
            document.removeEventListener("mousemove", self.resizeMove);
            document.removeEventListener("mouseup", self.resizeUp);
        },
        resizeMove: function(e) {
            var self = this;
            var width = self.dragInfo.width + e.clientX - self.dragInfo.x;
            var height = self.dragInfo.height + e.clientY - self.dragInfo.y;
            this.dragInfo.overWidth = width
            this.dragInfo.overHeight = height
            if (width >= self.limit.width) {
                self.style.width = width + "px";
            }
            if (height >= self.limit.height) {
                self.style.height = height + "px";
                self.iframeStyle.height = height - 35 + "px"
            }

        },
        contentDown:function(){
            this.$emit('changewin', {current:true,win:this.win})
        },
        /////控制界面通知
        btnMin: function() { //最小按钮
            this.win.hide = true
            this.$emit("changewin", { current: false, win: this.win })
        },
        btnNormal: function() { //窗口恢复正常模式
            this.win.max = false
            this.$emit("changewin", { current: true, win: this.win })

        },
        btnMax: function() { //最大化
            this.win.max = true
            this.$emit("changewin", { current: true, win: this.win })
        },
        
        btnClose: function() { //发送关闭信息
      
            this.$emit("changewin", { current: false, win: this.win, close:true })
        },
        //检测样式改变
        checkStyle:function(){
            if(this.win.max){//如果是最大窗口模式，无需改变
                var top = 0 + "px";
                if (this.style.top != top){
                    this.style.top = top;
                }
                var left = 0 + "px";
                if (this.style.left != left){
                    this.style.left = left
                } 
                var width = this.screen.width + "px"
                if (this.style.width != width){
                    this.style.width = width
                }
                var height = this.screen.height + "px"
                if (this.style.height != height){
                    this.style.height = height
                    this.iframeStyle.height = this.screen.height - 35 + "px"
                }
            }else{
                var top = this.win.top + "px";
                if (this.style.top != top){
                    this.style.top = top;
                }
                var left = this.win.left + "px";
                if (this.style.left != left){
                    this.style.left = left
                } 
                var width = this.win.width + "px"
                if (this.style.width != width){
                    this.style.width = width
                }
                var height = this.win.height + "px"
                if (this.style.height != height){
                    this.style.height = height
                    this.iframeStyle.height = this.win.height - 35 + "px"
                }
            }
            
            this.style["z-index"] = this.win.zIndex
        }
    },
    created: function() {
        this.dragInfo = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            overX:0,
            overY:0,
            overWidth:0,
            overHeight:0,
        }
     
        this.checkStyle()
        
        
    }
})