declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
//var logo = require('logo.svg');
//var Server = require('./server.js');

export class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header siteName={this.props.siteName} siteURL={this.props.siteURL} />
                <Post />
                <Products />
            </div>
        );
    }
}

export class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const list = this.props.siteName.map((sitename, i) => <Site key={sitename} siteName={sitename} siteURL={this.props.siteURL[i]} />);
        return (
            <div className="header" id="header">
                {list}
            </div>

        );  
    }
}

export class Site extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <input type="button" className="header-button" value={this.props.siteName} data-url={this.props.siteURL} />
        );
    }
}

export class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        //for (let i = 0; i < event.target.files.length; i++)
            //console.log(event.target.files[i].name);
            
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        //alert('Отправленное имя: ' + this.state.value);
        //event.preventDefault();
    }

    render() {
        return (
            <div className="name" onSubmit={this.handleSubmit} >
                <form method="post" action="/test" >
                    <input type="text" name="first_name" value={this.state.value} onChange={this.handleChange} />
                    <input type="submit" value="Отправить" />
                </form>
            </div>
        );
    }
}

export class Products extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const images=[];

        for (let i=1; i<=20; i++)
        {
            images.push(<img src={"/images/" + i.toString() + ".jpeg"} />)
        }

        return (
            <div className="images"> 
		<span className="images-row"> {images.filter(function(item, i) {  return i <= 9;})} </span>
                <span className="images-row"> {images.filter(function(item, i) {  return i > 9;})} </span>
            </div>
        );
    }
}


const siteName = ["Anison", "DTF", "empty", "3DNEWS", "Twitch"];
const siteURL = ["https://anison.fm", "https://dtf.ru", "#", "https://3dnews.ru", "https://twitch.tv"];
ReactDOM.render(<App siteName={siteName} siteURL={siteURL} />, document.getElementById('root'));
