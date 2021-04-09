<template>
	<div id="nav">
		<a href="/home">home</a>
		<a href="/about">about</a>
		<a @click="dd">set</a>
	</div>
	<div class="home">
		<el-button type="primary">主要按钮</el-button>

		<img :src="randomPoster('aa')" alt="">
		<i class="iconfont iconvideo"></i>

	</div>
</template>

<script>

import {mapActions, mapState} from 'vuex'
import {randomPoster} from '@/config/utils'


export default {
	components: {

	},
    setup() {

	},
    computed: {
        ...mapState(['userInfo','loginCode']),
    },
	mounted(){
	    this.getUserData()
	},
	methods:{
        ...mapActions(['getUserData','getAuthViewList']),
        randomPoster,
		dd(){
            this.$router.push({
                path:'/index/set'
			})
		}
	},
	watch:{
        userInfo(val,oldval){
            this.getAuthViewList(val.user_name)

		}
	}
}
</script>

<style lang="scss" rel="stylesheet/scss">
#nav {
	padding: 30px;
	display: flex;
	background: url(~assets/dlbj.png) no-repeat;
	a{
		font-weight: bold;
		color: $text-hover-color;
	}
	a.router-link-exact-active{
		color: #42b983;
	}
}
</style>
