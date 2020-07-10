//import ReactDOM from 'react-dom'
import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import Moment from 'react-moment';
class Welcome extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            offset: 0,
            isLoading: true,
            users: [],
            error: null,
            perPage: 5,
            currentPage: 0,
            copied: false,

        };

        this.handlePageClick = this.handlePageClick.bind(this);
    }

    receivedData() {
        axios
            .get(`/notes/get/all`)
            .then(res => {
                this.setState({ isLoading: false });
                const data = res.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.map(pd =>

                    <React.Fragment>
                        <div class="section2 ">
                            <div class="card card-body col-sm-10" key={pd.name}>
                                <h4 class="card-title text-uppercase" style={{color:'#ff726f'}}>{pd.title}</h4>
                                <p class="card-text">{pd.note.substring(0,500)}...... </p>
                                <div class="flex-row">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <a type="button" class="btn btn-outline-info btn-rounded waves-effect" href={"/notes/get/" + pd._id}>Reand More...</a>
                                        </div>
                                        <div class="col-md-6">
                                            <p class="card-text"> <Moment format='MMMM Do YYYY, h:mm:ss a'>{pd.date}</Moment> </p>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <div class="alert alert-success">
                                    <p>Copy link to share ( {"http://127.0.0.1:5000/notes/get/"+pd._id})</p>
                                </div>
                            </div>

                        </div>
                    </React.Fragment>)

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),

                    postData
                })
            }).catch(error => this.setState({ error, isLoading: false }));
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };

    componentDidMount() {
        this.receivedData()
    }

    render() {
        const { isLoading, error } = this.state;
        return (
            <div className="container">
                <section>
                    <div className="row">
                        <div className="col-lg-12">
                            <div class="card">
                                <h3 class="card-header light-blue lighten-1 white-text text-uppercase font-weight-bold text-center py-5">
                                    View Public Note List
                                </h3>
                            </div>
                            <div class="card card-body">
                                <ReactPaginate
                                    previousLabel={"prev"}
                                    nextLabel={"next"}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={this.state.pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"} />
                                {error ? <p>{error.message}</p> : null}
                                {!isLoading ? <center>{(this.state.postData)}</center>
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


export default Welcome;


















