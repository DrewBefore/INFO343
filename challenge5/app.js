var API_KEY = '8f77c53883031f3ce8beb15c4ac736ed';

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            saved: []
        };
    }

    render() {
        return (
            <div>
                <h1>DB Weather</h1>

                <Form
                    onSubmit = {(e) => this.onSearch(e)}
                    name={this.state.name}
                />

                <Weather
                    main= {this.state.main}
                    description= {this.state.description}
                    iconURL={this.state.iconURL}
                    temp={this.state.temp}
                    name={this.state.name}
                />

                <Save
                    onClick = {(name) => this.onSearch(name)}
                    main= {this.state.main}
                    description= {this.state.description}
                    iconURL={this.state.iconURL}
                    temp={this.state.temp}
                    name={this.state.name}
                />
  
            </div>
        );
    }


    onSearch(name) {
        var queryValue = name;

        var url = " https://www.bell-towne.com/api/weather/?q=" + queryValue + "&appid=" + API_KEY;
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            var weather = json.weather;
            var temp = json.main.temp;
            temp = Math.ceil((temp - 273.15) * 9/5 + 32);
            var name = json.name;
            var icon = weather[0].icon;
            var main = weather[0].main;
            var iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
            var description = weather[0].description;
            this.setState({
                name: name,
                temp: temp,
                weather: weather,
                main: weather[0].main,
                iconURL: iconURL,
                description: description
            });
        });
    }
}

var app = document.getElementById("app");

ReactDOM.render(<App />, app);
