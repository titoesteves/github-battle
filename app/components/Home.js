var React = require('react')
var ReactRouter = require('react-router')
var Link = ReactRouter.Link;
var MainContainer = require('./MainContainer')

var Home = React.createClass({
  render: function(){
    return (
      <MainContainer>
        <h1>Github battle</h1>
        <p className="lead">What even is a jQuery</p>
        <Link to='/playerOne'>
          <button type='button' className='btn btn-lf btn-success' autoFocus>Get Started</button>
        </Link>
      </MainContainer>
    )
  }
});

module.exports = Home;
