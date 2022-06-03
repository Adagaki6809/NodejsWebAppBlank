declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');

export class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header pageName={this.props.pageName} pageURL={this.props.pageURL} />
                <Post />
                <Images />
            </div>
        );
    }
}

export class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const list = this.props.pageName.map((pagename, i) => <Pages key={pagename} pageName={pagename} pageURL={this.props.pageURL[i]} />);
        return (
            <div className="header" id="header">
                {list}
            </div>

        );  
    }
}

export class Pages extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <input type="button" className="header-button" value={this.props.pageName} data-url={this.props.pageURL} />
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
    
    async handleSubmit(event) {
        //alert('Отправленное имя: ' + this.state.value);

        event.preventDefault();
        let obj = { queryToDB: 'select * from trains;'};
        let response = await fetch('https://adagaki.herokuapp.com/upload', {
            method: 'POST', 
            body: JSON.stringify({queryToDB: this.state.value}), 
            headers: {
            'Content-type': 'application/json; charset=UTF-8'
            }
        });

        let array = await response.json();
        let s = '';
        
        for (let i = 0; i < array.length; i++) {
            s+=`Номер поезда: ${array[i].id_train}\tТип поезда: ${array[i].type}\n`;   
        }
        document.getElementById('responseFromDB').innerHTML = s;
        /*
        let body = await response.body;
        const reader = body.getReader();
        reader.read().then(response=>alert(response.value));
        */
    }

    render() {
        return (
            <div className="name" onSubmit={this.handleSubmit} >
                <form method="post" action="/upload">
                    <input id="query" type="text" name="queryToDB" value={this.state.value} onChange={this.handleChange} />
                    <input type="submit" value="Отправить" />
                </form>
                <textarea id="responseFromDB"></textarea>
            </div>
           
        );
    }
}

export class Images extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const images=[];

        for (let i=1; i<=20; i++)
        {
            images.push(<img id={"yourIdHere"+i} key={i} src={"/images/" + i.toString() + ".jpeg"} />)
        }

        return (
            <div className="images"> 
		<div className="images-row"> {images.filter(function(item, i) {  return i <= 9;})} </div>
                <div className="images-row"> {images.filter(function(item, i) {  return i > 9;})} </div>
            </div>
        );
    }
}


const pageName = ["заглушка", "заглушка", "заглушка", "заглушка", "заглушка"];
const pageURL = ["./upload", "https://dtf.ru", "#", "https://3dnews.ru", "https://twitch.tv"];
ReactDOM.render(<App pageName={pageName} pageURL={pageURL} />, document.getElementById('root'));
