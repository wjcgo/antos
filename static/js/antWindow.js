// 定义一个名为 button-counter 的新组件
Vue.component('ant-window', {
    props: {

        win: Object,

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
            },
            deep: true,
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
            self.$emit('drag', true)
            self.dragInfo.x = e.offsetX;
            self.dragInfo.y = e.offsetY;
            console.log(e)
            self.style["z-index"] += 1
            document.addEventListener("mousemove", self.mouseMove);
            document.addEventListener("mouseup", self.mouseUp);
        },
        mouseUp: function(e) {
            var self = this;
            this.$emit('drag', false)
            document.removeEventListener("mousemove", self.mouseMove);
            document.removeEventListener("mouseup", self.mouseUp);
        },
        mouseMove: function(e) {
            var self = this;
            var x = e.clientX - self.dragInfo.x;
            var y = e.clientY - self.dragInfo.y;

            self.style.left = x + "px";
            self.style.top = y + "px";
        },
        resizeDown: function(e) {
            var self = this;
            self.$emit('drag', true)
            self.dragInfo.x = e.clientX;
            self.dragInfo.y = e.clientY;
            var widthStr = this.style.width.replace("px", "")
            var heightStr = this.style.height.replace("px", "")
            self.dragInfo.width = parseInt(widthStr)
            self.dragInfo.height = parseInt(heightStr)

            // console.log(disX,disY)
            document.addEventListener("mousemove", self.resizeMove);
            document.addEventListener("mouseup", self.resizeUp);
        },
        resizeUp: function(e) {
            var self = this;
            this.$emit('drag', false)
            document.removeEventListener("mousemove", self.resizeMove);
            document.removeEventListener("mouseup", self.resizeUp);
        },
        resizeMove: function(e) {
            var self = this;
            var width = self.dragInfo.width + e.clientX - self.dragInfo.x;
            var height = self.dragInfo.height + e.clientY - self.dragInfo.y;
            if (width > self.limit.width) {
                self.style.width = width + "px";
            }
            if (height > self.limit.height) {
                self.style.height = height + "px";
                self.iframeStyle.height = height - 35 + "px"
            }

        },
        /////控制界面通知
        btnMin: function() { //最小按钮
            this.$emit("windowctl", { id: this.win.id, mold: "min" })
        },
        btnNormal: function() { //窗口恢复正常模式
            this.$emit("windowctl", { id: this.win.id, mold: "normal" })

        },
        btnMax: function() { //最大化
            this.$emit("windowctl", { id: this.win.id, mold: "max" })
        },
        btnCurrent: function() { //当前
            this.$emit("windowctl", { id: this.win.id, mold: "current" })
        },
        btnClose: function() { //发送关闭信息
            this.$emit("windowctl", { id: this.win.id, mold: "close" })
        }
    },
    created: function() {
        this.dragInfo = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        }
        console.log(this.win)
        this.style.top = this.win.top + "px"
        this.style.left = this.win.left + "px"
        this.style.width = this.win.width + "px"
        this.style.height = this.win.height + "px"
        this.iframeStyle.height = this.win.height - 35 + "px"
        this.style["z-index"] = this.win.zIndex
        this.url = this.win.url
    }
})