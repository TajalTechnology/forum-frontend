import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from "../Layouts/NavBar";
import BottomFooter from "../Layouts/BottomFooter";
import Home from "../Pages/Home";
import Details from "../Pages/Details";
import Tag from "../Pages/Tag";
import AskQuestion from "../Pages/AskQuestion";
import PendingQuestion from "../Pages/PendinQuestion";
import UserList from "../Pages/UserList";
import GroupList from "../Pages/GroupList";
import AddGroups from '../Pages/AddGroups';
import EditAnswer from '../Pages/EditAnswer';
import AdminEditQuestion from '../Pages/AdminEditQuestion';
import EditQuestion from '../Pages/EditQuestion';
import AdminQuesDetails from '../Pages/AdminQuesDetails';
import AdminUserDetails from '../Pages/AdminUserDetails';
import MyProfile from '../Pages/MyProfile';
import EditProfile from '../Pages/EditProfile';
import ChangePassword from '../Pages/ChangePassword';
import AuthenticatedComponent from '../Auth/AuthenticatedComponent';
import EditGroup from '../Pages/EditGroup';
import DashBoard from '../Pages/DashBoard';
import FrogotPass from '../Pages/FrogotPass';
import DesignHome from '../Pages/DesignHome';
import NewPassword from '../Pages/NewPassword';
import VerifyEmail from '../Pages/VerifyEmail';
import About from '../Pages/About';
import AccessDenied from '../Pages/AccessDenied';




function BaseLayout() {
    return (
        <div className="BaseLayout">
            <BrowserRouter>

                <NavBar />
                <Switch>
                    <Route exact path="/question_list" component={Home} />
                    <Route exact path="/" component={DesignHome} />
                    <Route path="/details/:id" component={Details} />
                    <Route path="/tags" component={Tag} />
                    <Route exact path="/forgot_password" component={FrogotPass} />
                    <Route exact path="/update_new_password" component={NewPassword} />
                    <Route exact path="/email_verification/:id" component={VerifyEmail} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/access_denied" component={AccessDenied} />


                    <AuthenticatedComponent>
                        <Route path="/ask_question" component={AskQuestion} />
                        <Route path="/edit_question/:id" component={EditQuestion} />
                        <Route exact path="/edit_answer/:id" component={EditAnswer} />
                        <Route exact path="/my_profile" component={MyProfile} />
                        <Route exact path="/edit_profile" component={EditProfile} />
                        <Route exact path="/change_password" component={ChangePassword} />


                        {/* admin panel */}
                        <Route exact path="/dashboard" component={DashBoard} />
                        <Route exact path="/pending_question" component={PendingQuestion} />
                        <Route exact path="/admin_edit_question/:id" component={AdminEditQuestion} />
                        <Route exact path="/admin_question_details/:id" component={AdminQuesDetails} />
                        
                        <Route exact path="/user_list" component={UserList} />
                        <Route exact path="/user_details/:id" component={AdminUserDetails} />

                        <Route exact path="/group_list" component={GroupList} />
                        <Route exact path="/add_group" component={AddGroups} />
                        <Route exact path="/edit_group/:id" component={EditGroup} />


                    </AuthenticatedComponent>

                </Switch>
                <BottomFooter />
            </BrowserRouter>

        </div>
    );
}

export default BaseLayout;