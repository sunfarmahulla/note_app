import React, { Component } from 'react';
import Moment from 'react-moment';
class ReadNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            note: '',
            error: '',
            loading: '',
        }

    }

    async componentDidMount() {
        try {
            this.setState({ loading: true });
            const url = "/notes/get/";
            const response = await fetch(url + this.props.match.params.id)
            const data = await response.json();
            //console.log(data.note);
            this.setState({ title: data.title, note: data.note, data:data.date });
        } catch (error) {
            this.setState({ loading: false });
            console.log(error);
        }
    }


    render() {
        const { loading , error} = this.state;
        return (
            <div className="container">
                <section>
                    <div className="row">
                        <div className="col-lg-12">
                            <div class="card">
                                <h3 class="card-header light-blue lighten-1 white-text text-uppercase font-weight-bold text-center py-5">
                                    <p style={{ color:'#fff'}}>{this.state.title}</p> published in <Moment format='MMMM Do YYYY, h:mm:ss a'>{this.state.date}</Moment> 
                            </h3>
                            </div>
                            {error ? <p>{error.message}</p> : null}
                            <div class="card card-body">
                                {loading ? <center>{(this.state.note)}</center>
                                    : (
                                        <h3> <i style={{ fontSize: 20 }} className="fa fa-spinner fa-spin" /> Loading...</h3>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                </section>
            </div>


        )
    }
}
export default ReadNote;