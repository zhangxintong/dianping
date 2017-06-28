import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {hashHistory} from 'react-router'
import './style.less'

class SearchInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        	value:''
        }
    }
    componentDidMount(){
    	this.setState({
    		value:this.props.value||''
    	})
    }
    render() {
        return (
        	<input className="search-input"
                   type="text" 
                   placeholder="请输入关键字"
                   onChange={this.ChangeHandle.bind(this)}
                   onKeyUp={this.KeyUpHandle.bind(this)}
                   value={this.state.value}/>

        )
    }
     ChangeHandle(e){
    	var val = e.target.value;
    	this.setState({
    		value:val
    	})
    }
    KeyUpHandle(e){
    	if(e.keyCode !== 13){
    		return
    	}
    	this.props.enterHandle(this.state.value)
    }

}

export default SearchInput
