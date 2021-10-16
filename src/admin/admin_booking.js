import React, { useState } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import fire from '../files/firebase';
import '../movie_details.css';

export const AdminBooking = () => {
    const history = useHistory();
    const location = useLocation();
    const profile = location.state.profile;
    const password = location.state.password;
    const name = location.state.name;
    const mobile = location.state.mobile;
    const email = location.state.email;
    const [progress, setprogress] = useState(false);
    const [bookingdate, setbookingdate] = useState('');
    const [username, setusername] = useState('');
    const [userbooking, setuserbooking] = useState([]);

    const getData = (e) => {
        e.preventDefault();
        if (bookingdate === "" || username === "") {
            alert("please fill date and username");
        } else {
            setprogress(!progress);
            fire.firestore().collection("Bookings").where("bookingdate", "==", bookingdate).where("username", "==", username).get().then((snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setprogress(progress);
                snapshot.forEach((ele) => {
                    var data = ele.data();
                    setuserbooking(arr => [...arr, { data: data }]);


                })
            })
        }

    }

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
                        <li className="nav-item active">
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
                        <li className="nav-item ">
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
                        <button class="navbar-toggler" id="admin-book-nav" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="navbar-toggler-icon icon-bar"></span>
                            <span class="navbar-toggler-icon icon-bar"></span>
                            <span class="navbar-toggler-icon icon-bar"></span>
                        </button>

                    </div>
                </nav>
                <div className="main-panel">
                    <div class="form-container sign-in-container" style={{ height: 'auto', left: '0', width: 'auto', zIndex: 2, marginLeft: '33%', marginTop: '9%' }}>
                        <form className="retrieve-form">
                            <h2 className="retrieve-bookings" style={{ fontWeight: "bold" }}>Retrieve Bookings</h2>
                            <br />
                            <input type="date" placeholder="Pick Booking Date" value={bookingdate} onChange={(e) => setbookingdate(e.target.value)} />
                            <input type="text" placeholder="Username" value={username} onChange={(e) => setusername(e.target.value)} />
                            <input type="button" style={{ background: "#ff4b2b", color: "white" }} value="Get Data" onClick={getData} />
                            <br />
                            {progress == true ? (<progress max="100" label={`${progress}%`} value={progress} />) : <p></p>}

                        </form>
                        <div >
                            {
                                userbooking.map((bookingdata, index) => {
                                    return <div key={index} className="card" id="retrieve-card">
                                        <p>Booking Date : {bookingdata.data.bookingdate}</p>
                                        <p>Username : {bookingdata.data.username}</p>
                                        <p>Email : {bookingdata.data.email}</p>
                                        <p>Mobile : {bookingdata.data.mobile}</p>
                                        <p>Moviename : {bookingdata.data.moviename}</p>
                                        <p>Total Ceats : {bookingdata.data.totalceats}</p>
                                        <p>Ceat Names : {bookingdata.data.ceatnames}</p>
                                        <p>Movie Watchers : {bookingdata.data.moviewatchers}</p>
                                        <p>Total Cost : {bookingdata.data.totalcost}</p>
                                        <p>Payment Status : {bookingdata.data.status}</p>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
