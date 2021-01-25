import React, {useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header';
import { getUserInfo } from '../util/user';
import StarRatings from 'react-star-ratings';
import { connect } from "react-redux";
import { clearErrors, receiveErrors } from '../actions/error';
import basketball from '../images/sport-images/basketball.png';
import bouldering from '../images/sport-images/bouldering.png';
import football from '../images/sport-images/football.png';
import pingpong from '../images/sport-images/pingpong.png';
import running from '../images/sport-images/running.png';
import yoga from '../images/sport-images/yoga.png';
import volleyball from '../images/sport-images/volleyball.png';

const mapDispatchToProps = dispatch => ({
    receiveErrors: (payload) => dispatch(receiveErrors(payload)),
    clearErros: () => dispatch(clearErrors())
});

const mapStateToProps = ({ session, errors }) => ({
    session,
    errors
  });  

const ProfilePage = ({ match, session, clearErrors, receiveErrors, errors }) => {
    const { id } = match.params

    const [userInfo, setUserInfo] = useState({});
    const [firstSportRating, setFirstSportRating] = useState(0);
    const [secondSportRating, setSecondSportRating] = useState(0);
    const [thirdSportRating, setThirdSportRating] = useState(0);
    const [firstSport, setFirstSport] = useState('');
    const [secondSport, setSecondSport] = useState('');
    const [thirdSport, setThirdSport] = useState('');

    useEffect( async () => {
        const response = await getUserInfo(id)
        if (response.data && response.data !== 'user not found') {
            setUserInfo(response.data)

            const sportRatings = {
                volleyball: response.data.volleyballRating,
                basketball: response.data.basketballRating,
                football: response.data.footballRating,
                bouldering: response.data.boulderingRating,
                yoga: response.data.yogaRating,
                pingpong: response.data.pingpongRating,
                running: response.data.runningRating
            }
        
            const ratingPicker = Object.keys(sportRatings).map(function(key) {
                return { key: key, value: this[key] };
            }, sportRatings);
            ratingPicker.sort(function(p1, p2) { return p2.value - p1.value; });
            const topThree = ratingPicker.slice(0, 3);

            setFirstSportRating(topThree[0].value)
            setSecondSportRating(topThree[1].value)
            setThirdSportRating(topThree[2].value)
            setFirstSport(topThree[0].key)
            setSecondSport(topThree[1].key)
            setThirdSport(topThree[2].key)
        } else {
            receiveErrors('User not found!')
        }
        return () => {
            clearErrors();
        }
    }, [])

    let isUser = false;
    if (userInfo._id === session.userId) {
      isUser = true;
    }

    const ageDifMs = Date.now() - Date.parse(userInfo.dob)
    const ageDate = new Date(ageDifMs)
    const age = Math.abs(ageDate.getUTCFullYear() - 1970)

    if (errors) {
        return (
            <div className="container-fluid silver-background">
                <h1 className="forgot-password-header">MYSPORTS</h1>
                <div className="form-box">
                    <i className="material-icons md-48 error-symbol forgot-password-error">clear</i>
                    <p className="forgot-password-error-message">Oops! {errors}</p>
                </div>
                <div className="row justify-content-center">
                <p className="col"><Link className="back-to-login-button" to="/dashboard">Back to Dashboard</Link></p>
                </div>
            </div>
        )
    }

    if (userInfo.username) {
        return (
            <div>
                <Header title='YOUR PROFILE' />
                <div className="silver-background container-fluid">
                <div className="registration-top-space"></div>
                <div className="form-box-white">
                    <div className="profile-box-top-space"></div>
                    <h3 className="initial-identifier-profile">{userInfo.username[0].toUpperCase()}</h3>
                    {isUser && <Link to={"/edit-profile/" + userInfo._id}><i id="edit-profile-button" className="pointer material-icons md-24 grey-icon">edit</i></Link>}
                    <h3 className="username-profile">{userInfo.username.toUpperCase()}</h3>
                    <div className="container-fluid">
                        <div className="row justify-content-between">
                            <div className="col">
                            <p className="profile-query">Age</p>
                            <p>{age || <span>N/A</span>}</p> 
                            </div>
                            <div className="col container-fluid row justify-content-end profile-right-spacing">
                                <p className="profile-favsports-title">My Top 3 Sports</p>
                                <img className="favsport" src={`../images/sport-images/${firstSport}.png`} />
                                <StarRatings
                                    rating={firstSportRating}
                                    starRatedColor="#E9B467"
                                    numberOfStars={5}
                                    starDimension="1.2em"
                                    starSpacing="0.7px"
                                    className="profile-display-stars"
                                    />
                            </div>
                        </div>
                        <div className="row justify-content-between">
                            <div className="col">
                            <p className="profile-query">Gender</p>
                            <p>{userInfo.gender}</p>  
                            </div>
                            <div className="col container-fluid row justify-content-end profile-right-spacing">
                                <img className="favsport" src={`../images/sport-images/${secondSport}.png`}/>
                                <StarRatings
                                    rating={secondSportRating}
                                    starRatedColor="#E9B467"
                                    numberOfStars={5}
                                    starDimension="1.2em"
                                    starSpacing="0.7px"
                                    className="profile-display-stars"
                                    />
                            </div>
                        </div>
                        <div className="row justify-content-between">
                            <div className="col">
                            <p className="profile-query">Lives in</p>
                            <p>{userInfo.location}</p>  
                            </div>
                            <div className="col container-fluid row justify-content-end profile-right-spacing">
                                <img className="favsport" src={`../images/sport-images/${thirdSport}.png`}/>
                                <StarRatings
                                    rating={thirdSportRating}
                                    starRatedColor="#E9B467"
                                    numberOfStars={5}
                                    starDimension="1.2em"
                                    starSpacing="0.7px"
                                    className="profile-display-stars"
                                    />
                            </div>
                        </div>
                        <p className="profile-query">About me</p>
                        <p>{userInfo.aboutMe}</p>
                    </div>
                    {isUser && <Link to={"/edit-profile/" + userInfo._id} className="profile-edit-button"><h3 className="pointer profile-edit-button">EDIT INFO</h3></Link>}
                    <div className="profile-box-bottom-space"></div>
                </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <p>Loading...</p>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProfilePage);