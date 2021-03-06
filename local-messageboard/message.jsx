
  var converter = new Showdown.converter();
    var MessageBox = React.createClass({
  getInitialState: function() {
    return {
      data: [
        {"id": "0001","author":"肠粉", "message":"鱼丸"},
        {"id": "0002","author":"耗烙", "message":"粗面"},
        {"id": "0003","author":"涨糯米", "message":"香香 " },
      ]
    };
  },

  // 根据id删除留言
  handlemessageDelete: function(messageId) {
    var data = this.state.data;
    data = data.filter(function(message) {
      return message.id !== messageId;
    });
    this.setState({data});
  },


  // 给新增的留言一个id---date
  generateId: function() {
    return Date.now();
  },

  // 新增留言
  handleSubmit: function(arg) {
    var data = this.state.data;
    var id = this.generateId();
    var author = this.generateId();
    //var complete = "false";
    data = data.concat([{"id": id, "author": arg.author, "message": arg.message}]);
    this.setState({data});
  },

  render: function() {

    return (
      <div className="well well-sm">
        <h1 className="text-center">Please Message</h1>
        <MessageList data={this.state.data}
          deletemessage={this.handlemessageDelete}
          />
        <MessageForm submitmessage={this.handleSubmit} />
      </div>
    )
  }
});

var MessageList = React.createClass({
  render: function() {
    var messageList = this.props.data.map(function(listItem) {
      return (
        <MessageItem
          messageId={listItem.id}
          author={listItem.author}
          key={listItem.id}
          message={listItem.message}
          //complete={listItem.complete}
          deletemessage={this.props.deletemessage}
          //toggleComplete={this.props.toggleComplete}
           />
      )
    }, this);

    return (
        <ul className="list-group">
          {messageList}
          <MessageFooter  />
        </ul>
    );
  }
});

var MessageItem = React.createClass({
  

  deletemessage: function() {
    this.props.deletemessage(this.props.messageId);
  },

  // 鼠标移入显示删除按钮
  handleMouseOver: function() {
    ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = "inline";
  },

  handleMouseOut: function() {
    ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = "none";
  },

  render: function() {

    var author = this.props.author;
    var message = this.props.message;
    var classes = "list-group-item"

    return (
      <li className={classes}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}>
        {author+" :  "}
      
        <span dangerouslySetInnerHTML={{__html: 
        converter.makeHtml(message.toString())}} />
        
        <div className="pull-right">
          <button type="button" className="btn btn-xs close" onClick={this.deletemessage} ref="deleteBtn">删除</button>
        	
        </div>
      	<br/>
      </li>
    );
  }
});

var MessageFooter = React.createClass({
  render: function() {
    return (
      <li className="list-group-item" >请不要搞事情</li>
    )
  }
});

var MessageForm = React.createClass({
  getInitialState: function() {
    return {author: '', message: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({message: e.target.value});
  },
  submitmessage: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var message = this.state.message.trim();
    if (!message|| !author) {
      return;
    }

    this.props.submitmessage({author: author, message: message});
    ReactDOM.findDOMNode(this.refs.message).value = "";
    ReactDOM.findDOMNode(this.refs.author).value = "";
  },

  render: function() {
    return (
      <div>
        <hr />
        <form className="form-horizontal" onSubmit={this.submitmessage}>
          <div className="form-group">
            <label for="message" className="col-md-2 control-label">author</label>
            <div className="col-md-10">
              <input type="text" id="author" ref="author" className="form-control" placeholder="你是谁"  onChange={this.handleAuthorChange}></input>
            </div>
          </div>
          <div className="form-group">
            <label for="message" className="col-md-2 control-label">message</label>
            <div className="col-md-10">
              <input type="text" id="message" ref="message" className="form-control" placeholder="你想做点什么" onChange={this.handleTextChange}></input>
            </div>
          </div>          
              
          <div className="row">
            <div className="col-md-12 text-right">
              <input type="submit" value="Save message" className="btn btn-primary" />
            </div>
          </div>
        </form>
      </div>
    )
  }
});

ReactDOM.render(
  <MessageBox />,
  document.getElementById('MessageBox')
);