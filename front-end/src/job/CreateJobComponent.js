import React, {Component} from 'react';
import '../user/signup/Signup.css';
import {Link, withRouter} from 'react-router-dom';
import Alert from 'react-s-alert';
import {PinkButton} from '../app/App';
import {createJob} from '../util/APIUtils';

class CreateJobComponent extends Component{
    constructor(props){
        super(props);
        console.log("CreateJobComponent.js의 Props 표시:  " + this.props.currentUser.id);
    }
    render(){
        return(
            <div className="signup-container">
                <div className="signup-content">
                    <h1>Add a New Job</h1>
                    <JobCreationFormComponent currentUser={this.props.currentUser} {...this.props}/> 
                    <span className="login-link">
                        Do you want to see the job application lists you applied? <br />
                        <Link to="/job">View Applications</Link>
                    </span>
                </div>
            </div>
        );
    }
}


class JobCreationFormComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            position: "",
            cId: "",
            description: "",
            url: "",
            uId: `${this.props.currentUser.id}`
        }
        console.log("JobCreationComponent.js의 Props 표시:  " + this.props.currentUser.uId);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        })
    }

    handleSubmit(event){
        event.preventDefault();
        this.setState({
            uId: this.props.currentUser.id
        })
        const createJobRequest = Object.assign({},  this.state); //{uId: this.props.currentUser.i},
        createJob(createJobRequest)
        .then(response => {
            Alert.success("Your job is successfully added.");
            this.props.history.push("/job");
            // this.props.history.push("/login");
        }).catch(error => {
            Alert.error(((error && error.message)) || 'Oops! Something went wrong. Please try again.');
        });   
    };
    

    render() {

        return(
            <form onSubmit={this.handleSubmit}>
                <div className='form-item'>
                    <input type='text' name = 'position'
                      className='form-control' placeholder='Job position'
                      value = {this.state.position} 
                      onChange={this.handleInputChange} required />
                </div>
                <div className="form-item">
                    <p id="profile-name-hint" className="input-hint">
                       Company Name: <samp>Amazon: 테스트할때는 숫자를 넣어주세요.</samp>. </p>
                    <input type="text" name="cId" 
                        className="form-control" placeholder="300"
                        value={this.state.cId} onChange={this.handleInputChange} required />
                </div>
                <div className="form-item">
                    <textarea type="text" name="description" 
                        style={{resize: "none", height: "100px"}}
                        className="form-control" placeholder="Job Description"
                        value={this.state.description} onChange={this.handleInputChange} />
                </div>
                <div className="form-item">
                    <input type="text" name="url" 
                        className="form-control" placeholder="URL - Job posting"
                        value={this.state.url} onChange={this.handleInputChange} />
                </div>
                <div className="form-item">
                    <input type="text" name="uId" 
                        className="form-control" placeholder={this.props.currentUser.id}
                        value={this.state.uId} onChange={this.handleInputChange} disabled/>
                </div>
                <div className="form-item">
                    <PinkButton type="submit">Add a Job</PinkButton>
                </div>
                {this.state.uId + "uId-state"} 
                <br />
                {this.props.currentUser.id+ "uId-state"}
            </form>
        )
    };
}


export default withRouter(CreateJobComponent);
export {JobCreationFormComponent};