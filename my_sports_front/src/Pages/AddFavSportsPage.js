import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import { getUserInfo } from '../util/user';
import { receiveErrors, clearErrors } from '../actions/error';
import { connect } from "react-redux";
import StarRatings from 'react-star-ratings';
import { clearSuccess, receiveSuccess } from '../actions/success';
import SuccessPage from '../components/SuccessPage';
import ErrorPage from '../components/ErrorPage';
import basketball from '../images/sport-images/basketball.png';
import bouldering from '../images/sport-images/bouldering.png';
import football from '../images/sport-images/football.png';
import pingpong from '../images/sport-images/pingpong.png';
import running from '../images/sport-images/running.png';
import volleyball from '../images/sport-images/volleyball.png';
import yoga from '../images/sport-images/yoga.png';
import { updateRatings } from '../util/user';
import Modal from "../components/TermsConditions";



const mapDispatchToProps = dispatch => ({
    receiveErrors: (payload) => dispatch(receiveErrors(payload)),
    receiveSuccess: (payload) => dispatch(receiveSuccess(payload)),
    clearErros: () => dispatch(clearErrors()),
    clearSuccess: () => dispatch(clearSuccess())
});

const mapStateToProps = ({ session, errors, success }) => ({
    session,
    errors,
    success
  }); 

const EditProfilePage = ({ match, receiveErrors, clearErrors, session, errors, receiveSuccess, clearSuccess, success }) => {

    const { id } = match.params

    const [userInfo, setUserInfo] = useState({});
    const [volleyballRating, setVolleyballRating] = useState(0);
    const [basketballRating, setBasketballRating] = useState(0);
    const [footballRating, setFootballRating] = useState(0);
    const [boulderingRating, setBoulderingRating] = useState(0);
    const [yogaRating, setYogaRating] = useState(0);
    const [pingpongRating, setPingpongRating] = useState(0);
    const [runningRating, setRunningRating] = useState(0);

    useEffect( async () => {
        const response = await getUserInfo(id)
        if (response.data && response.data !== 'user not found') {
            setUserInfo(response.data)
            setVolleyballRating(response.data.volleyballRating)
            setBasketballRating(response.data.basketballRating)
            setFootballRating(response.data.footballRating)
            setBoulderingRating(response.data.boulderingRating)
            setYogaRating(response.data.yogaRating)
            setPingpongRating(response.data.pingpongRating)
            setRunningRating(response.data.runningRating)
        } else {
            receiveErrors('You are unauthorized to view this page!')
        }
        return () => {
            clearErrors();
            clearSuccess();
        }
    }, [])

    const sendRatings = async () => {
        const input = {
            id: userInfo._id,
            volleyballRating,
            basketballRating,
            footballRating,
            boulderingRating,
            yogaRating,
            pingpongRating,
            runningRating
        }
        const response = await updateRatings(input)
        if (response) {
            receiveSuccess('User profile updated!');
        } else {
            receiveErrors('Something went wrong!')
        }
    }

    const selectSport = (sport) => {
        const image = document.getElementById('add-fav-' + sport);
        const div = document.getElementById('add-' + sport + '-div')
        if (image.getAttribute('class') === 'sport-image-select') {
            div.classList.add('toggle-stars')
            return image.classList.remove('sport-image-select');
        } else {
            image.classList.add('sport-image-select');
            div.classList.remove('toggle-stars')
        }
    }

    const [isGeneralStarsVisible, setIsGeneralStarsVisible] = useState(false);

    const showGeneralStars = () => {
        setIsGeneralStarsVisible(true);
    }

    const hideGeneralStars = () => {
        setIsGeneralStarsVisible(false);
    }

    const [isBoulderingStarsVisible, setIsBoulderingStarsVisible] = useState(false);

    const showBoulderingStars = () => {
        setIsBoulderingStarsVisible(true);
    }

    const hideBoulderingStars = () => {
        setIsBoulderingStarsVisible(false);
    }

    const [isYogaStarsVisible, setIsYogaStarsVisible] = useState(false);

    const showYogaStars = () => {
        setIsYogaStarsVisible(true);
    }

    const hideYogaStars = () => {
        setIsYogaStarsVisible(false);
    }

    const [isRunningStarsVisible, setIsRunningStarsVisible] = useState(false);

    const showRunningStars = () => {
        setIsRunningStarsVisible(true);
    }

    const hideRunningStars = () => {
        setIsRunningStarsVisible(false);
    }

    let isUser = false;
    if (userInfo._id === session.userId) {
      isUser = true;
    }

    if (errors || !isUser) {
        return <ErrorPage errors={errors} />
    }

    if (success) {
        return <SuccessPage success={success} />
    }

    if (userInfo.username && isUser) {
        return (
            <div>
                <Header title='EDIT PROFILE' />
                <div className="silver-background container-fluid">
                    <div className="registration-top-space"></div>
                    <div className="form-box-white container-fluid">
                        <div className="profile-box-top-space"></div>
                        <h3 className="initial-identifier-profile">{userInfo.username[0].toUpperCase()}</h3>
                        <p className="registration-message">Add your favorite sports and rate yourself!.</p>
                            <div className="row justify-content-space-between">
                                <div className="col">
                                    <img id="add-fav-volleyball" onClick={() => selectSport('volleyball')} src={volleyball}/>
                                    <p className="sport-titles">Volleyball</p>
                                    <div id="add-volleyball-div" className="toggle-stars">
                                        <StarRatings
                                        rating={volleyballRating}
                                        changeRating={(rating) => setVolleyballRating(rating)}
                                        starRatedColor="#E9B467"
                                        starHoverColor="gold"
                                        numberOfStars={5}
                                        starDimension="1em"
                                        starSpacing="0.7px"
                                        className="add-fav-stars"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <img id="add-fav-basketball" onClick={() => selectSport('basketball')} src={basketball}/>
                                    <p className="sport-titles">Basketball</p>
                                    <div id="add-basketball-div" className="toggle-stars">
                                        <StarRatings
                                        rating={basketballRating}
                                        changeRating={(rating) => setBasketballRating(rating)}
                                        starRatedColor="#E9B467"
                                        starHoverColor="gold"
                                        numberOfStars={5}
                                        starDimension="1em"
                                        starSpacing="0.7px"
                                        className="add-fav-stars"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <img id="add-fav-football" onClick={() => selectSport('football')} src={football}/>
                                    <p className="sport-titles">Football</p>
                                    <div id="add-football-div" className="toggle-stars">
                                        <StarRatings
                                        rating={footballRating}
                                        changeRating={(rating) => setFootballRating(rating)}
                                        starRatedColor="#E9B467"
                                        starHoverColor="gold"
                                        numberOfStars={5}
                                        starDimension="1em"
                                        starSpacing="0.7px"
                                        className="add-fav-stars"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-space-between">
                                <div className="col">
                                    <img id="add-fav-bouldering" onClick={() => selectSport('bouldering')} src={bouldering}/>
                                    <p className="sport-titles">Bouldering</p>
                                    <div id="add-bouldering-div" className="toggle-stars">
                                        <StarRatings
                                        rating={boulderingRating}
                                        changeRating={(rating) => setBoulderingRating(rating)}
                                        starRatedColor="#E9B467"
                                        starHoverColor="gold"
                                        numberOfStars={5}
                                        starDimension="1em"
                                        starSpacing="0.7px"
                                        className="add-fav-stars"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <img id="add-fav-yoga" onClick={() => selectSport('yoga')} src={yoga}/>
                                    <p className="sport-titles">Yoga</p>
                                    <div id="add-yoga-div" className="toggle-stars">
                                        <StarRatings
                                        rating={yogaRating}
                                        changeRating={(rating) => setYogaRating(rating)}
                                        starRatedColor="#E9B467"
                                        starHoverColor="gold"
                                        numberOfStars={5}
                                        starDimension="1em"
                                        starSpacing="0.7px"
                                        className="add-fav-stars"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <img id="add-fav-pingpong" onClick={() => selectSport('pingpong')} src={pingpong}/>
                                    <p className="sport-titles">Table Tennis</p>
                                    <div id="add-pingpong-div" className="toggle-stars">
                                        <StarRatings
                                        rating={pingpongRating}
                                        changeRating={(rating) => setPingpongRating(rating)}
                                        starRatedColor="#E9B467"
                                        starHoverColor="gold"
                                        numberOfStars={5}
                                        starDimension="1em"
                                        starSpacing="0.7px"
                                        className="add-fav-stars"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-space-between">
                                <div className="col">
                                    <img id="add-fav-running" onClick={() => selectSport('running')} src={running}/>
                                    <p className="sport-titles">Running</p>
                                    <div id="add-running-div" className="toggle-stars">
                                        <StarRatings
                                        rating={runningRating}
                                        changeRating={(rating) => setRunningRating(rating)}
                                        starRatedColor="#E9B467"
                                        starHoverColor="gold"
                                        numberOfStars={5}
                                        starDimension="1em"
                                        starSpacing="0.7px"
                                        className="add-fav-stars"
                                        />
                                    </div>
                                </div>
                            </div>
                            <p>Guidance for star ratings:</p>
                            <div className="Terms">
                                <p className="registration-message">Guidance for <span onClick={showGeneralStars} className="pointer"><strong>General Sports.</strong></span></p>
                                {isGeneralStarsVisible ? (
                                    <Modal onClose={hideGeneralStars}>
                                        <h3>General</h3>
                                        <p>1 star - no competetive experience, I might not know the rules, and I don’t care, I just want to have fun.</p>
                                        <p>2 star - a little, not a lot, I have some basic understanding but I’m not very good, but thats ok!</p>
                                        <p>3 star - I know the rules and I have a little experience. I’m up for some light competition and a friendly game.</p>
                                        <p>4 star - I want to win. I have the energy and the skills to do my best and make a good and fair game.</p>
                                        <p>5 star - Go hard or go home. I take this sport seriously and I want to play with those at the highest level.</p>
                                    </Modal>
                                ) : null}
                            </div>
                            <div className="Terms">
                                <p className="registration-message">Guidance for <span onClick={showBoulderingStars} className="pointer"><strong>Bouldering.</strong></span></p>
                                {isBoulderingStarsVisible ? (
                                    <Modal onClose={hideBoulderingStars}>
                                        <h3>Bouldering</h3>
                                        <p>1 star bouldering - I’m a complete beginner. I don’t know what the V scale is but I want to try climbing.</p>
                                        <p>2 star bouldering - I have some bouldering experience but I can only manage entry level routes. V0-V2</p>
                                        <p>3 star bouldering - I’m experienced and I like to explore intermediate difficulty routes. V3-V6.</p>
                                        <p>4 star bouldering - I’m an advanced climber and I like high technical difficulty. V7-V10.</p>
                                        <p>5 star bouldering - Very strong climber looking for the hardest challenges. V11+</p>
                                    </Modal>
                                ) : null}
                            </div>
                            <div className="Terms">
                                <p className="registration-message">Guidance for <span onClick={showYogaStars} className="pointer"><strong>Yoga.</strong></span></p>
                                {isYogaStarsVisible ? (
                                    <Modal onClose={hideYogaStars}>
                                        <h3>Yoga</h3>
                                        <p>1 star yoga - I’m a complete beginner but I’m open to new experiences at a slow pace.</p>
                                        <p>2 star yoga - I have done yoga a few times and I am familiar with some of the poses. But I am still learning.</p>
                                        <p>3 star yoga - I have a good understanding of the basics and I know how to control my breath.</p>
                                        <p>4 star yoga - I’m developing advanced techniques and poses and I am mastering my breath and movement relationship. I enjoy longer and more difficult sessions.</p>
                                        <p>5 star yoga - I have been a devoted student of yoga for many years and my body and mind are capable of the highest forms of yoga practise.</p>
                                    </Modal>
                                ) : null}
                            </div>
                            <div className="Terms">
                                <p className="registration-message">Guidance for <span onClick={showRunningStars} className="pointer"><strong>Running.</strong></span></p>
                                {isRunningStarsVisible ? (
                                    <Modal onClose={hideRunningStars}>
                                        <h3>Running</h3>
                                        <p>1 star running - I’m a complete beginner, speed is not so important to me, I would like to get outside and move a bit.</p>
                                        <p>2 star running - I enjoy running from time to time and to get the heart rate up at jogging speeds.</p>
                                        <p>3 star running - I have been running for a while, I like to push the tempo and meet my time goals.</p>
                                        <p>4 star running - I am a fast runner and I will work my hardest at middle and long distance efforts. I enjoy a race.</p>
                                        <p>5 star running - I’m a speed machine. I have racing experience and perhaps I’m capable of a marathon. Looking for other like minded racers to push me.</p>
                                    </Modal>
                                ) : null}
                            </div>
                            <button onClick={sendRatings} className="add-fav-sports-button">Add Fav Sports</button>
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
  )(EditProfilePage);