class Form extends React.Component {
    
    render() {

        return (
            <div>
                <form onSubmit= {(e) => this.onSubmission(e, this.refs.query.value)} className = "form-inline">
                    <input type="text" ref="query" className="form-control" placeholder = "e.g Seattle, 98115" />
                    <button type="submit" className ="btn btn-primary">Search</button>
                </form>

            </div>
        );
    }

    onSubmission(e, name) {
        e.preventDefault();
        this.props.onSubmit(name);
    }


}

