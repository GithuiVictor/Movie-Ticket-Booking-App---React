import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router';
import fire from '../files/firebase';
import { Link } from 'react-router-dom';

export const Retrievefeedback = () => {
    const history = useHistory();
    const location = useLocation();
    const profile = location.state.profile;
    const name = location.state.name;
    const email = location.state.email;
    const password = location.state.password;
    const mobile = location.state.mobile;
    const [data, setdata] = useState([]);
    useEffect(() => {
        fire.firestore().collection("feedback").get().then((snapshot) => {
            snapshot.forEach((ele) => {
                var data = ele.data();
                setdata(arr => [...arr, { data: data }]);
            });
        });
    }, [])
    return (
        <div className="wrapper ">
            <link href="../assets/css/material-dashboard.css?v=2.1.2" rel="stylesheet" />
            <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
                <div className="logo"><a href="http://www.creative-tim.com" className="simple-text logo-normal">
                    AK CINEMAS
                </a></div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link to={{ pathname: "/adminpage", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link">
                                <i className="material-icons">home</i>
                                <p>Home</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={{ pathname: "/movieupload", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link">
                                <i className="material-icons">dashboard</i>
                                <p>Movie Upload</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to={{ pathname: "/adminbooking", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link">
                                <i className="material-icons">content_paste</i>
                                <p>Retrieve Bookings</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to={{ pathname: "/adminprofile", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link">
                                <i className="material-icons">person</i>
                                <p>User Profile</p>
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to={{ pathname: "/retrievefeedback", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link" >
                                <i className="material-icons">notifications</i>
                                <p>Feedback</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to="" className="nav-link" >
                                <i className="material-icons">logout</i>
                                <p>Logout</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="main-panel">
                <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                    <div class="container-fluid">
                        <div class="navbar-wrapper">
                        </div>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="navbar-toggler-icon icon-bar"></span>
                            <span class="navbar-toggler-icon icon-bar"></span>
                            <span class="navbar-toggler-icon icon-bar"></span>
                        </button>

                    </div>
                </nav>

                <div>
                    <h2 style={{ fontWeight: "bold", marginTop: "10%" }}>User Feedback</h2>
                    {
                        data.map((datas) => {
                            return <div className="card" style={{ padding: "56px" }}>
                                <p>Username : {datas.data.username}</p>
                                <p>Email : {datas.data.email}</p>
                                <p>Feedback : {datas.data.feedback}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    );
}
