
class Weather extends React.Component {
    
    render() {

        if (!this.props.main) {
             return null;
        }

        return (
            <div>
                <h2>{this.props.name}</h2>

                <div>
                    
                    <h3 className= "weather-info">
                    <img src={this.props.iconURL} />{this.props.temp}° </h3>
                    <h4>{this.props.main} </h4>
                    <h5>({this.props.description})</h5>
                    
                </div>
            </div>
        );
    }


}
