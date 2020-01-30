import React, { Component } from 'react';
import './Profile.css';
import PinkButton from '../../app/App';
import {Link, Route,NavLink, Switch, withRouter} from 'react-router-dom';
import UpdateProfile from './UpdateProfile';
import { Button } from "@material-ui/core";
import PrivateRoute from '../../common/PrivateRoute';


class Profile extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        // this.state = {
        //   updateModeClicked: false
        // };
    }

    updateModeClicked = (props) => {
        this.setState({
            updateModeClicked: true
        });
        return (<PrivateRoute path="/profile/updateProfile" 
        {...this.props}></PrivateRoute>);
    }
    render() {
        const updateModeClicked = this.state;

        console.log("확인"+this.props.authenticated)
        return (
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <div className="profile-avatar">
                            { 
                                this.props.currentUser.imageUrl ? (
                                    <img src={this.props.currentUser.imageUrl} alt={this.props.currentUser.name}/>
                                ) : (
                                    <div className="text-avatar">
                                        <span>{this.props.currentUser.name && this.props.currentUser.name[0]}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="profile-name">
                           <h2>Current Logged-In User Information</h2>
                           <p className="profile-email">  User Name: {this.props.currentUser.name} </p>
                           <p className="profile-email">User Email: {this.props.currentUser.email}</p>
                        </div>
                        <hr/ >

                        {/* 개인정보 수정을 위한 버튼 */}
                        <div> 
                            <p className="profile-email">If you want to modify user information, Please click the "UPDATE" button.</p>
                                <Button  onClick = {this.updateModeClicked} className="modify" >Update </Button>
                                {/* <PinkButton  onClick = {this.updateModeClicked} className="modify" >Update </PinkButton> */}
                                {updateModeClicked && <UpdateProfile  
                                             currentUser = {this.props.currentUser}    {...this.props}></UpdateProfile>}
                                
                        </div>
                        
                    </div>
                </div>    
            </div>
        );
    }
}

export default withRouter(Profile);