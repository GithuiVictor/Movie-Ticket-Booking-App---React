import React, { useEffect, useState } from 'react';
import '../bookingform.css';
import $ from 'jquery';
import { useHistory, useLocation } from 'react-router-dom';
import fire from '../files/firebase';
import '../movie_details.css'


export const Ticketbookingform = () => {
    const history = useHistory();
    const location = useLocation();
    var profile = location.state.profile;
    var password = location.state.password;
    var username = location.state.username;
    var mobile = location.state.mobile;
    var moviename = location.state.moviename;
    var ticketcost = location.state.ticketcost;
    var bookingdate = location.state.bookingdate;
    var movieimage = location.state.movieimage;
    var email = location.state.email;
    //console.log(username, mobile, moviename, ticketcost, bookingdate);
    const [name, setname] = useState('');
    const [ceats, setceats] = useState('');
    const allSeatarray = [];
    const [bookedceats, setbookedceats] = useState([]);


    const startSelect = (e) => {
        e.preventDefault();
        if (name === "" || ceats === "") {
            alert("please enter name and ceats");
        } else {
            $(".inputForm *").prop("disabled", true);
            $(".seatStructure *").prop("disabled", false);
            $(".title").hide();
            $(".sub-title").hide();
            $(".inputForm *").hide();
            $(".confirm-selection").show();

            document.getElementById("notification").innerHTML = "<p class='alert-message'style='margin-bottom:0px;background:yellow;'>Please Select your Seats NOW!</p>";
            fire.firestore().collection("movieceats").where("moviename", "==", moviename).where("bookingdate", "==", bookingdate).get().then((snapshot) => snapshot.forEach(ele => {
                var data = ele.data();
                console.log(data.ceatnames);
                //$("#" + data.ceatnames).attr("disabled", true);
                $("#" + data.ceatnames).attr("disabled", true);
                // $("#" + data.ceatnames).css("background-color", "red");
                setbookedceats(arr => [...arr, { data: data }]);
            }))
        }

    }


    const confirmSelection = () => {
        if ($("input:checked").length == ceats) {
            $(".seatStructure *").prop("disabled", true);
            $(".confirm-selection").hide();
            $(".pay-btn").show();
            var allNameVals = [];
            var allNumberVals = [];
            var allSeatsVals = [];

            //Storing in Array
            allNameVals.push(name);
            allNumberVals.push(ceats);
            $('#seatsBlock :checked').each(function () {
                allSeatsVals.push($(this).val());
                allSeatarray.push($(this).val());

            });

            //Displaying 
            $('#nameDisplay').val(allNameVals);
            $('#NumberDisplay').val(allNumberVals);
            $('#seatsDisplay').val(allSeatsVals);
        }
        else {
            alert("Please select " + (ceats) + " seats")
        }
    }

    const paymentFunction = (e) => {
        var currentDate = new Date()
        var day = currentDate.getDate()
        var month = currentDate.getMonth() + 1
        var fullyear = currentDate.getFullYear()
        var fulldate = day + "-0" + month + "-" + fullyear;
        e.preventDefault();
        var options = {
            key: "rzp_test_xz4tqVIIc6MRSi", // Enter the Key ID generated from the Dashboard
            key_secret: "7kMiCxUxaQrhuPQ7WJFs8AKn",
            amount: (ticketcost * 100) * ceats, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "AK CINEMAS ",
            description: moviename,
            image: movieimage,
            handler: function (response) {
                //alert(response.razorpay_payment_id);
                //alert(response.razorpay_order_id);
                //alert(response.razorpay_signature)
                //alert("working");
                fire.firestore().collection("Bookings").add({
                    currentdate: fulldate,
                    username: username,
                    email: email,
                    mobile: mobile,
                    bookingdate: bookingdate,
                    moviename: moviename,
                    moviewatchers: name,
                    totalceats: ceats,
                    ceatnames: allSeatarray,
                    totalcost: ticketcost * ceats,
                }).then(() => {
                    fire.firestore().collection("movieceats").add({
                        bookingdate: bookingdate,
                        moviename: moviename,
                        ceatnames: allSeatarray,
                    });
                    alert("Your Booking Was Successfull");
                    history.push({ pathname: "/success", state: { profile: profile, email: email, password: password, mobile: mobile, bookingdate: bookingdate, username: username, totalceats: ceats, ceatnames: allSeatarray, name: name, moviename: moviename, ticketcost: ticketcost } })
                }).catch((err) => console.log(err));

            },
            prefill: {
                name: username,
                email: email,
                contact: mobile
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            }
        };
        var pay = new window.Razorpay(options);
        pay.open();
    }


    useEffect(() => {
        $(".seatStructure *").prop("disabled", true);
        $(".displayerBoxes *").prop("disabled", true);
        $(".pay-btn").hide();
        $(".confirm-selection").hide();

        //$(".booking-pdf").hide();



    }, [])
    return (
        <div class="form-container sign-in-container" className="ticket-booking" >
            <form className="ceat-pick" style={{ background: '#f6f5f7', marginTop: "32%" }}>
                <h1 className="title">Pick Ceats</h1>
                <span className="sub-title">One Ticket Cost : 500</span>
                <br />
                <div className="inputForm">
                    <input type="text" placeholder="Username" value={name} onChange={(e) => setname(e.target.value)} />
                    <input type="number" placeholder="Enter Number Of Ceats" value={ceats} onChange={(e) => setceats(e.target.value)} />
                    <input type="button" value="Pick Cetas" className="pick-ceats" onClick={startSelect} />
                </div>

                <div class="seatStructure">
                    <center>
                        <p id="notification"></p>
                        <table id="seatsBlock" style={{ marginLeft: "15%" }}>

                            <tr>
                                <td colspan="14"><div class="screen" style={{
                                    width: '100%',
                                    height: '20px',
                                    background: '#ff4b2b',
                                    color: '#fff',
                                    lineHeight: '20px',
                                    fontSize: '15px'
                                }}>SCREEN</div></td>
                                <td rowspan="20">
                                    <div class="smallBox greenBox" style={{ width: 'max-content' }}> Selected Seat</div> <br />
                                    <div class="smallBox redBox" style={{ width: 'max-content' }}> Reserved Seat</div><br />
                                    <div class="smallBox emptyBox" style={{ width: 'max-content' }}> Empty Seat</div><br />
                                </td>

                                <br />
                            </tr>
                            <tr>
                                <td></td>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td></td>
                                <td>6</td>
                                <td>7</td>
                                <td>8</td>
                                <td>9</td>
                                <td>10</td>
                                <td>11</td>
                                <td>12</td>
                            </tr>
                            <tr>
                                <td>A</td>
                                <td><input type="checkbox" class="seats" value="A1" id="A1" /></td>
                                <td><input type="checkbox" class="seats" value="A2" id="A2" /></td>
                                <td><input type="checkbox" class="seats" value="A3" id="A3" /></td>
                                <td><input type="checkbox" class="seats" value="A4" id="A4" /></td>
                                <td><input type="checkbox" class="seats" value="A5" /></td>
                                <td class="seatGap"></td>
                                <td><input type="checkbox" class="seats" value="A6" /></td>
                                <td><input type="checkbox" class="seats" value="A7" /></td>
                                <td><input type="checkbox" class="seats" value="A8" /></td>
                                <td><input type="checkbox" class="seats" value="A9" /></td>
                                <td><input type="checkbox" class="seats" value="A10" /></td>
                                <td><input type="checkbox" class="seats" value="A11" /></td>
                                <td><input type="checkbox" class="seats" value="A12" /></td>
                            </tr>
                            <tr>
                                <td>B</td>
                                <td><input type="checkbox" class="seats" value="B1" /></td>
                                <td><input type="checkbox" class="seats" value="B2" /></td>
                                <td><input type="checkbox" class="seats" value="B3" /></td>
                                <td><input type="checkbox" class="seats" value="B4" /></td>
                                <td><input type="checkbox" class="seats" value="B5" /></td>
                                <td></td>
                                <td><input type="checkbox" class="seats" value="B6" /></td>
                                <td><input type="checkbox" class="seats" value="B7" /></td>
                                <td><input type="checkbox" class="seats" value="B8" /></td>
                                <td><input type="checkbox" class="seats" value="B9" /></td>
                                <td><input type="checkbox" class="seats" value="B10" /></td>
                                <td><input type="checkbox" class="seats" value="B11" /></td>
                                <td><input type="checkbox" class="seats" value="B12" /></td>
                            </tr>
                            <tr>
                                <td>C</td>
                                <td><input type="checkbox" class="seats" value="C1" /></td>
                                <td><input type="checkbox" class="seats" value="C2" /></td>
                                <td><input type="checkbox" class="seats" value="C3" /></td>
                                <td><input type="checkbox" class="seats" value="C4" /></td>
                                <td><input type="checkbox" class="seats" value="C5" /></td>
                                <td></td>
                                <td><input type="checkbox" class="seats" value="C6" /></td>
                                <td><input type="checkbox" class="seats" value="C7" /></td>
                                <td><input type="checkbox" class="seats" value="C8" /></td>
                                <td><input type="checkbox" class="seats" value="C9" /></td>
                                <td><input type="checkbox" class="seats" value="C10" /></td>
                                <td><input type="checkbox" class="seats" value="C11" /></td>
                                <td><input type="checkbox" class="seats" value="C12" /></td>
                            </tr>
                            <tr>
                                <td>D</td>
                                <td><input type="checkbox" class="seats" value="D1" /></td>
                                <td><input type="checkbox" class="seats" value="D2" /></td>
                                <td><input type="checkbox" class="seats" value="D3" /></td>
                                <td><input type="checkbox" class="seats" value="D4" /></td>
                                <td><input type="checkbox" class="seats" value="D5" /></td>
                                <td></td>
                                <td><input type="checkbox" class="seats" value="D6" /></td>
                                <td><input type="checkbox" class="seats" value="D7" /></td>
                                <td><input type="checkbox" class="seats" value="D8" /></td>
                                <td><input type="checkbox" class="seats" value="D9" /></td>
                                <td><input type="checkbox" class="seats" value="D10" /></td>
                                <td><input type="checkbox" class="seats" value="D11" /></td>
                                <td><input type="checkbox" class="seats" value="D12" /></td>
                            </tr>
                            <tr>
                                <td>E</td>
                                <td><input type="checkbox" class="seats" value="E1" /></td>
                                <td><input type="checkbox" class="seats" value="E2" /></td>
                                <td><input type="checkbox" class="seats" value="E3" /></td>
                                <td><input type="checkbox" class="seats" value="E4" /></td>
                                <td><input type="checkbox" class="seats" value="E5" /></td>
                                <td></td>
                                <td><input type="checkbox" class="seats" value="E6" /></td>
                                <td><input type="checkbox" class="seats" value="E7" /></td>
                                <td><input type="checkbox" class="seats" value="E8" /></td>
                                <td><input type="checkbox" class="seats" value="E9" /></td>
                                <td><input type="checkbox" class="seats" value="E10" /></td>
                                <td><input type="checkbox" class="seats" value="E11" /></td>
                                <td><input type="checkbox" class="seats" value="E12" /></td>
                            </tr>
                            <tr class="seatVGap"></tr>
                            <tr>
                                <td>F</td>
                                <td><input type="checkbox" class="seats" value="F1" /></td>
                                <td><input type="checkbox" class="seats" value="F2" /></td>
                                <td><input type="checkbox" class="seats" value="F3" /></td>
                                <td><input type="checkbox" class="seats" value="F4" /></td>
                                <td><input type="checkbox" class="seats" value="F5" /></td>
                                <td></td>
                                <td><input type="checkbox" class="seats" value="F6" /></td>
                                <td><input type="checkbox" class="seats" value="F7" /></td>
                                <td><input type="checkbox" class="seats" value="F8" /></td>
                                <td><input type="checkbox" class="seats" value="F9" /></td>
                                <td><input type="checkbox" class="seats" value="F10" /></td>
                                <td><input type="checkbox" class="seats" value="F11" /></td>
                                <td><input type="checkbox" class="seats" value="F12" /></td>
                            </tr>
                            <tr>
                                <td>G</td>
                                <td><input type="checkbox" class="seats" value="G1" /></td>
                                <td><input type="checkbox" class="seats" value="G2" /></td>
                                <td><input type="checkbox" class="seats" value="G3" /></td>
                                <td><input type="checkbox" class="seats" value="G4" /></td>
                                <td><input type="checkbox" class="seats" value="G5" /></td>
                                <td></td>
                                <td><input type="checkbox" class="seats" value="G6" /></td>
                                <td><input type="checkbox" class="seats" value="G7" /></td>
                                <td><input type="checkbox" class="seats" value="G8" /></td>
                                <td><input type="checkbox" class="seats" value="G9" /></td>
                                <td><input type="checkbox" class="seats" value="G10" /></td>
                                <td><input type="checkbox" class="seats" value="G11" /></td>
                                <td><input type="checkbox" class="seats" value="G12" /></td>
                            </tr>

                            <tr>
                                <td>H</td>
                                <td><input type="checkbox" class="seats" value="H1" /></td>
                                <td><input type="checkbox" class="seats" value="H2" /></td>
                                <td><input type="checkbox" class="seats" value="H3" /></td>
                                <td><input type="checkbox" class="seats" value="H4" /></td>
                                <td><input type="checkbox" class="seats" value="H5" /></td>
                                <td></td>
                                <td><input type="checkbox" class="seats" value="H6" /></td>
                                <td><input type="checkbox" class="seats" value="H7" /></td>
                                <td><input type="checkbox" class="seats" value="H8" /></td>
                                <td><input type="checkbox" class="seats" value="H9" /></td>
                                <td><input type="checkbox" class="seats" value="H10" /></td>
                                <td><input type="checkbox" class="seats" value="H11" /></td>
                                <td><input type="checkbox" class="seats" value="H12" /></td>
                            </tr>

                            <tr>
                                <td>I</td>
                                <td><input type="checkbox" class="seats" value="I1" /></td>
                                <td><input type="checkbox" class="seats" value="I2" /></td>
                                <td><input type="checkbox" class="seats" value="I3" /></td>
                                <td><input type="checkbox" class="seats" value="I4" /></td>
                                <td><input type="checkbox" class="seats" value="I5" /></td>
                                <td></td>
                                <td><input type="checkbox" class="seats" value="I6" /></td>
                                <td><input type="checkbox" class="seats" value="I7" /></td>
                                <td><input type="checkbox" class="seats" value="I8" /></td>
                                <td><input type="checkbox" class="seats" value="I9" /></td>
                                <td><input type="checkbox" class="seats" value="I10" /></td>
                                <td><input type="checkbox" class="seats" value="I11" /></td>
                                <td><input type="checkbox" class="seats" value="I12" /></td>
                            </tr>

                            <tr>
                                <td>J</td>
                                <td><input type="checkbox" class="seats" value="J1" /></td>
                                <td><input type="checkbox" class="seats" value="J2" /></td>
                                <td><input type="checkbox" class="seats" value="J3" /></td>
                                <td><input type="checkbox" class="seats" value="J4" /></td>
                                <td><input type="checkbox" class="seats" value="J5" /></td>
                                <td></td>
                                <td><input type="checkbox" class="seats" value="J6" /></td>
                                <td><input type="checkbox" class="seats" value="J7" /></td>
                                <td><input type="checkbox" class="seats" value="J8" /></td>
                                <td><input type="checkbox" class="seats" value="J9" /></td>
                                <td><input type="checkbox" class="seats" value="J10" /></td>
                                <td><input type="checkbox" class="seats" value="J11" /></td>
                                <td><input type="checkbox" class="seats" value="J12" /></td>
                            </tr>
                        </table>
                        <br /><input type="button" value="Confirm Selection" className="confirm-selection" id="con-select" onClick={confirmSelection} onclick="updateTextArea()" />
                    </center>
                </div>
                <br /><br />
                <div class="displayerBoxes">
                    <center>
                        <table class="Displaytable" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                            <tr>
                                <th>Name</th>
                                <th>Number of Seats</th>
                                <th>Seats</th>
                            </tr>
                            <tr>
                                <td><textarea id="nameDisplay"></textarea></td>
                                <td><textarea id="NumberDisplay"></textarea></td>
                                <td><textarea id="seatsDisplay"></textarea></td>
                            </tr>
                        </table>
                    </center>

                </div>
            </form>

            <br />
            <button className="pay-btn" style={{ marginLeft: "39%" }} onClick={paymentFunction}>Pay Now</button>
        </div>
    )
}
