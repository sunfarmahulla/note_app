import React, { Component } from 'react';
import pic from './../../note.png';
import { NotificationManager } from 'react-notifications';
import Loader from '../../LoadingSpinner';
import { login } from './../userFunction';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            emailError: "",
            passwordError: "",
            loading: '',

        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    validate = () => {
        let emailError = '';
        let passwordError = '';

        if (!this.state.email.includes('@')) {
            emailError = "invalid email";
        }
        if (!this.state.email) {
            emailError = "email can not be blank";
        }
        if (!this.state.password) {
            passwordError = "password can not be blank";
        }

        if (emailError || passwordError) {
            this.setState({ emailError, passwordError })
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
            const user = {
                email: this.state.email,
                password: this.state.password
            }

            login(user).then(res => {
                if (res) {
                    console.log(res.user._id);
                    localStorage.setItem('id', res.user._id);
                    localStorage.setItem('name', res.user.name);
                    this.props.history.push(`/u/home/`+res.user._id);
                    NotificationManager.success('Successfully Login', 'Successful!', 200);
                    this.setState({ loading: false });
                } else {
                    NotificationManager.error('Something occur error while login ', 'Error!');
                    this.setState({ loading: false });

                }
            })
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
                        <div className="col-sm-5">
                            <form className="text-center border border-light p-5" noValidate onSubmit={this.onSubmit}>

                                <p className="h4 mb-4">Sign in</p>


                                <input type="email"
                                    name="email"
                                    id="defaultLoginFormEmail"
                                    className="form-control mb-4"
                                    placeholder="E-mail"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                                <div style={{ fontSize: 12, color: "red" }}><center>{this.state.emailError}</center></div>



                                <input type="password"
                                    name="password"
                                    id="defaultLoginFormPassword"
                                    className="form-control mb-4"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                                <div style={{ fontSize: 12, color: "red" }}><center>{this.state.passwordError}</center></div>


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


                                <button className="btn btn-info btn-block my-4" type="submit"> {loading ? <Loader /> : null} Sign in</button>
                                <p>Not a member?
                                <a href="/u/register">Register</a>
                                </p>

                            </form>
                        </div>


                    </div>



                </section>

            </div >

        )
    }
}

export default Login;


