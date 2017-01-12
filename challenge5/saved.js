class Save extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            saved: []
        };
    }    

    componentDidMount() {
        if (localStorage.length > 0){
        var savedWeatherJSON = localStorage.getItem('savedWeather');
        var savedWeather = JSON.parse(savedWeatherJSON);

       this.setState({
            saved: savedWeather
        });
        }
    }

    render() {
        if (!localStorage) {
             return null;
        }

        return (
            <div>
                <button onClick = {(e) => this.saveLocation(this.props.name)} className = "btn btn-default">Save</button>
                <h3 className ="saved-locations">Saved Locations</h3>
                <ul className="list-unstyled">
                    {
                        this.state.saved.map((weather) => (
                            <li onClick = {(e) => this.onSavedClick(e, weather)} className = "saved-list" key={weather}>{weather}</li>
                        ))
                    }
                </ul>               
            </div>
        )
    }

    onSavedClick(e, name) {
        e.preventDefault();
        this.props.onClick(name);
    }
    
 saveLocation(name) {
        var saved = this.state.saved;
        if(!saved.includes(name)) {
            this.state.saved.push(name);
        }
        this.setState({
            saved: saved
        });

        // save to local storage
        var savedJson = JSON.stringify(saved);
        localStorage.setItem('savedWeather', savedJson);
    }
}
