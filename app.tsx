declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
//var logo = require('logo.svg');

export class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Footer siteName={this.props.siteName} siteURL={this.props.siteURL} />
                <Post />
            </div>
        );
    }
}

export class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const list = [];
        for (let i = 0; i < this.props.siteName.length; i++)
            list.push(<Site siteName={this.props.siteName[i]} siteURL={this.props.siteURL[0]} />);
        return (
            <div className="footer" id="footer">
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
            <input type="button" className="footer-button" value={this.props.siteName} data-url={this.props.siteURL} />
        );
    }
}

export class Post extends React.Component {

    render() {
        return (
            <div>
                <form method="post" action="/app/calc" onSubmit="">
                    <input type="text" name="first_name" value="Введите имя" onClick={this.value = ''} />
                    <input type="submit" value="Отправить" />
                </form>
            </div>
        );
    }
}


const siteName = ["Anison", "DTF", "empty", "3DNEWS", "Twitch"];
const siteURL = ["https://anison.fm"];
ReactDOM.render(<App siteName={siteName} siteURL={siteURL} />, document.getElementById('root'));
