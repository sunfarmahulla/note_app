import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { NotificationManager } from 'react-notifications';
import Loader from '../../LoadingSpinner';
import axios from 'axios';

class UpdateNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            title: '',
            note: EditorState.createEmpty(),
            loading: '',

        };
    }

    onChange = (e) => {

        this.setState({ [e.target.name]: e.target.value });
    }
    onEditorStateChange = (note) => {
        this.setState({
            note
        });
    }
    async componentDidMount() {
        const url = "/notes/get/";
        const response = await fetch(url + this.props.match.params.id);
        const data = await response.json();
        this.setState({ user_id: data._id });
        this.setState({ title: data.title, note: data.note });

    }

    onSubmit = (e) => {
        e.preventDefault();
            const notes = this.state.note.getCurrentContent().getPlainText();
            this.setState({ loading: true });
            axios.put('/notes/update/' + this.props.match.params.id, { title:this.state.title, note:notes })
                .then((result) => {
                    if (result) {
                        this.setState({ loading: false });
                        NotificationManager.success('Successfully posted', 'Successful!')
                    } else {
                        this.setState({ loading: false });
                        NotificationManager.error('Failed posted', 'Failed!')
                    }

                });
        
    }

    render() {
        const loading = this.state.loading;
        const { title, note } = this.state;
        return (

            <div className="container">

                <section>
                    <div className="row">
                        <div className="col-sm-12">
                            <form className="text-center border border-light p-5" noValidate onSubmit={this.onSubmit}>

                                <p className="h4 mb-4"><u><b>Update Your Note </b></u></p>

                                <input type="text"
                                    name="title"
                                    id="defaultLoginFormtext"
                                    className="form-control mb-4"
                                    placeholder="Title"
                                    value={title}
                                    onChange={this.onChange}

                                />
                                <div style={{ fontSize: 12, color: "red" }}><center>{this.state.titleError}</center></div>


                                <div style={{ border: '1px solid transparent' }}>

                                    <Editor
                                        name="note"
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        placeholder="Note"
                                        value={note}
                                        onEditorStateChange={this.onEditorStateChange}
                                    />

                                    <div style={{ fontSize: 12, color: "red" }}><center>{this.state.newNoteError}</center></div>

                                </div>
                                <button className="btn btn-info btn-block my-4" type="submit"> {loading ? <Loader /> : null} Submit</button>


                            </form>

                        </div>
                        <div className="col-sm-5">

                        </div>
                    </div>

                </section>

            </div>
        )
    }
}
export default UpdateNote;