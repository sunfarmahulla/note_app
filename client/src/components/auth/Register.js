import React, { Component } from 'react';
import pic from '../../note.png';
import Loader from './../../LoadingSpinner';
import { NotificationManager } from 'react-notifications';
import { register } from './../userFunction';
class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            cpassword: '',
            nameError: '',
            emailError: '',
            passwordError: '',
            cpasswordError: '',
            loading: '',

        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    validate = () => {
        let nameError = "";
        let emailError = "";
        let passwordError = "";
        let cpasswordError = "";
        let err = [];

        if (!this.state.name) {
            nameError = "name is required";
            err.push(nameError);
        }
        if (!this.state.email) {
            emailError = "email is required";
            err.push(emailError);
        }
        if (!this.state.password) {
            passwordError = "password is required";
            err.push(passwordError);

        }
        if (this.state.password < 5) {
            passwordError = "password must be greater than 5 characters";
        }
        if (!this.state.cpassword) {
            cpasswordError = "confirm password is required";
            err.push(cpasswordError);
        }
        if (!this.state.email.includes('@')) {
            emailError = "invalid email";
        }

        if (nameError || emailError || passwordError || cpasswordError) {
            this.setState({ nameError, emailError, passwordError, cpasswordError });
            return false;
        } else {
            return true;
        }


    }

    onSubmit(e) {
        e.preventDefault()
        const isValid = this.validate();
        if (isValid) {
            this.setState({ loading: true });
            const newUser = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }

            register(newUser).then((res) => {
                if(!res){
                    this.setState({ loading: false });
                    NotificationManager.error('Failed Login', 'Successful!', 200);
                }
                this.props.history.push(`/u/login`)
                console.log(res.data);
                NotificationManager.success('Successfully Login', 'Successful!', 200);
                this.setState({ loading: false });
               
            });


        }

    }

    render() {
        const loading = this.state.loading;
        return (
            <div className="container">
                <section>
                    <div className="row">
                        <div className="col-sm-7">
                            <img id="image" src={pic} width="450px" height="500px" alt="pic" />
                        </div>
                        <div className=" col-sm-5">
                            <form className="text-center border border-light p-5" noValidate onSubmit={this.onSubmit}>

                                <p className="h4 mb-4">Sign Up</p>
                                <input type="text"
                                    id="defaultLoginFormText"
                                    name="name"
                                    className="form-control mb-4"
                                    placeholder="Name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                />
                                <div style={{ fontSize: 12, color: "red" }}><center>{this.state.nameError}</center></div>


                                <input type="email"
                                    id="defaultLoginFormEmail"
                                    name="email"
                                    className="form-control mb-4"
                                    placeholder="E-mail"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                                <div style={{ fontSize: 12, color: "red" }}><center>{this.state.emailError}</center></div>


                                <input type="password"
                                    id="defaultLoginFormPassword"
                                    className="form-control mb-4"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                                <div style={{ fontSize: 12, color: "red" }}><center>{this.state.passwordError}</center></div>

                                <input type="password"
                                    id="defaultLoginFormPassword"
                                    className="form-control mb-4"
                                    name="cpassword"
                                    placeholder="Confirm Password"
                                    value={this.state.cpassword}
                                    onChange={this.onChange}
                                />
                                <div style={{ fontSize: 12, color: "red" }}><center>{this.state.cpasswordError}</center></div>


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


                                <button className="btn btn-info btn-block my-4" type="submit">
                                    {loading ? <Loader /> : null}Sign in
                                </button>
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

export default Register;