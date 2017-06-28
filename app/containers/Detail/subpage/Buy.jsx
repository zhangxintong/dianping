import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import BuyAndStore from '../../../components/BuyAndStore'
import {hashHistory} from 'react-router'
import * as storeAtionsFromFile from '../../../actions/store'

class Buy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        	isStore:false
        }
    }
    render() {
        return (
            <BuyAndStore isStore={this.state.isStore} buyHandle={this.buyHandle.bind(this)} storeHandle = {this.storeHandle.bind(this)} />
        )
    }
    //验证登录
    loginCheck(){
    	const id = this.props.id
    	const userinfo = this.props.userinfo
    	if(!userinfo.username){
    		//跳转到登录页面
    		hashHistory.push('/Login/'+encodeURIComponent('/detail/'+id))
    		return false
    	}
    		return true

    }
    //检验当前商户是否已被收藏
    checkStoreState(){
    	const id = this.props.id
    	const store = this.props.store
    	//some只要有一个满足即可
    	store.some(item=>{
    		if (item.id === id){
    			this.setState({
    				isStore:true
    			})
    			//跳出循环
    			return true
    		}
    	})
    }
    //购买事件
    buyHandle(){
    	//验证登录
    	const loginFlag = this.loginCheck()
    	if(!loginFlag){
    		return
    	}
    	//购买的流程

    	//跳转到用户主页
    	hashHistory.push('/User')
    }
    //收藏事件
    storeHandle(){
    	//验证登录
    	const loginFlag = this.loginCheck()
    	if(!loginFlag){
    		return
    	}
    	const id = this.props.id
    	const storeActions = this.props.storeActions
    	if(this.state.isStore){
    		//当前商户 已经被收藏，点击时取消收藏
    		storeActions.rm({id:id})
    	}else{
    		//当前商户尚未被收藏，点击收藏
    		storeActions.add({id:id})
    	}
    	//修改状态
    	this.setState({
    		isStore:!this.state.isStore
    	})
    }
}
function mapStateToProps(state) {
    return {
    	userinfo:state.userinfo,
    	store:state.store
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storeActions: bindActionCreators(storeAtionsFromFile, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)
