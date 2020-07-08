import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import pic from '../../note.png';
class Register extends Component {

    render() {
        return (
            <div className="container">
                <section>
                    <div className="row">
                    <div  className="col-sm-7">
                            <img id="image"  src={pic} width="450px" height="500px" alt="pic"/>
                        </div>
                        <div className=" col-sm-5">
                            <form className="text-center border border-light p-5" action="#!">

                                <p className="h4 mb-4">Sign Up</p>
                                <input type="text" id="defaultLoginFormName" className="form-control mb-4" placeholder="Name" />


                                <input type="email" id="defaultLoginFormEmail" className="form-control mb-4" placeholder="E-mail" />


                                <input type="password" id="defaultLoginFormPassword" className="form-control mb-4" placeholder="Password" />
                                
                                <input type="password" id="defaultLoginFormPassword" className="form-control mb-4" placeholder="Confirm Password" />

                                <div className="d-flex justify-content-around">
                                    <div>

                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="defaultLoginFormRemember" />
                                            <label className="custom-control-label" for="defaultLoginFormRemember">Remember me</label>
                                        </div>
                                    </div>
                                    <div>

                                        <a href="">Forgot password?</a>
                                    </div>
                                </div>


                                <button className="btn btn-info btn-block my-4" type="submit">Sign in</button>
                                <p>already member?
                                <a href="/u/login">Login</a>
                                </p>

                            </form>
                        </div>
                       

                    </div>



                </section>

            </div >



        )
    }
}

export default withRouter(Register);