import React from 'react'
import { useLocation } from 'react-router-dom'
import '../movie_details.css';


export const MovieDetails = () => {
    const location = useLocation();
    var viedourl = location.state.viedourl;
    var moviename = location.state.moviename;
    var description = location.state.description;
    var actorname = location.state.actorname;
    var directorname = location.state.directorname;
    var releasedate = location.state.releasedate;
    var outdate = location.state.outdate;

    return (
        <div>
            <br /><br />

            <div ><iframe width="450" height="300" className="viedo" src={viedourl}></iframe></div>
            <div className="card" style={{ width: "70%", marginLeft: "16%", background: "lightpink" }}>
                <h2 style={{ fontWeight: "normal", fontSize: "larger" }}>moviename : {moviename}</h2>
                <h2 style={{ fontWeight: "normal", fontSize: "larger" }}>Description : {description}</h2>
                <h2 style={{ fontWeight: "normal", fontSize: "larger" }}>Actor Name : {actorname}</h2>
                <h2 style={{ fontWeight: "normal", fontSize: "larger" }}>Director Name : {directorname}</h2>
                <h2 style={{ fontWeight: "normal", fontSize: "larger" }}>Release Date : {releasedate}</h2>
                <h2 style={{ fontWeight: "normal", fontSize: "larger" }}>Out Date : {outdate}</h2>
            </div>

        </div>
    )
}
