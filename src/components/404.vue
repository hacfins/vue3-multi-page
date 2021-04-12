<template>
    <div class="not-exsit">
        <div class="no-exsit-imgC">
            <img src="~assets/404.png" alt="">
        </div>
        <div class="no-exsit-content">
            <h1>404</h1>
            <p>抱歉，{{text}}</p>
            <el-button @click="reback" type="primary">返回首页</el-button>
        </div>

    </div>
</template>

<script>
    export default {
        props:{
            addtitle:{
                type:Boolean,
                default:true
            },
            is_no_browse:{
                type:Boolean,
                default: false
            }
        },
        computed:{
            text(){
                var str = '你访问的页面不存在'
                if(this.is_no_browse){
                    str = '你没有浏览权限'
                }

                return str
            }

        },
        methods: {
            reback(){
                location.href = '/'
            }
        },
        mounted(){
            if(this.addtitle){
                document.title = 404
            }

        }

    }
</script>


<style lang="scss" rel="stylesheet/scss">
    @import "~@/style/common/variable";

    .not-exsit {
        height          : 100%;
        display         : flex;
        align-items     : center;
        justify-content : space-around;
        .no-exsit-imgC {
            width : 482px;
            img {
                width : 100%
            }
        }
        .no-exsit-content {
            h1 {
                font-size : 100px;
                margin    : 0 0 24px 0;
                color     : rgba(0, 0, 0, .7);
            }
            p {
                font-size : 20px;
                color     : $text-third-color;
                margin    : 0 0 24px 0;
            }

        }

    }
</style>
