import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class LoadMore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {

        return (
        	<div className="load-more" ref="wrapper">
        		{
        			this.props.isLoadingMore
        			?<span>加载中...</span>
        			:<span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
        		}
        	</div>
        )
    }
    loadMoreHandle(){
    	//执行传过来的参数
    	this.props.loadMoreFn()
    }
    componentDidMount(){
    	//实现上拉加载更多
    	const loadMoreFn = this.props.loadMoreFn
    	const wrapper = this.refs.wrapper
    	let timeoutId
    	function callback(){
    		const top = wrapper.getBoundingClientRect().top
    		const windowHeight = window.screen.height
    		if(top && top < windowHeight){
    			//当wrapper 已经被滚动到暴露在页面可视范围之内的时候
    			loadMoreFn()
    		}
    	}
    	window.addEventListener('scroll',function(){
    		if(this.props.isLoadingMore){
    			return
    		}
    		if(timeoutId){
    			clearTimeout(timeoutId)
    		}
    		timeoutId = setTimeout(callback,50)
    	}.bind(this),false)
    }
}

export default LoadMore