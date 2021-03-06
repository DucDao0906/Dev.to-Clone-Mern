import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';

// icons
import { Like, LikeFill, BookMark, UnBookMark, More } from '../icons/icons';

// component
import SharePost from './SharePost';
const ActionPostItem = ({
  post: { likesCount, bookmarksCount },
  auth,
  handleBookmarksAction,
  handleLikeAction,
  likedState,
  bookmarkedState,
  setAuth,
}) => {
  const [liked, setLiked] = useState(likedState);
  const [bookmarked, setBookMarked] = useState(bookmarkedState);
  const [share, setShare] = useState(false);
  const [likesState, setLikes] = useState(likesCount);
  const [bookmarksState, setBookMarks] = useState(bookmarksCount);

  const incLikes = () => setLikes(likesState + 1);
  const decLikes = () => setLikes(likesState - 1);
  const incBookMarks = () => setBookMarks(bookmarksState + 1);
  const decBookMarks = () => setBookMarks(bookmarksState - 1);
  useEffect(() => {
    setLiked(likedState);
  }, [likedState]);
  useEffect(() => {
    setBookMarked(bookmarkedState);
  }, [bookmarkedState]);
  const handleLike = () => {
    if (auth.isAuthenticated) {
      if (liked) {
        setLiked(false);
        decLikes();
        handleLikeAction();
      } else {
        setLiked(true);
        incLikes();
        handleLikeAction();
      }
    } else {
      return setAuth(true);
    }
  };
  const handleBookMark = () => {
    if (auth.isAuthenticated) {
      if (bookmarked) {
        setBookMarked(false);
        decBookMarks();
        handleBookmarksAction();
      } else {
        setBookMarked(true);
        incBookMarks();
        handleBookmarksAction();
      }
    } else {
      return setAuth(true);
    }
  };
  console.log('Action');
  return (
    <div className='post-item__action'>
      <div className='post-item__action-content wrap'>
        <div className='like-action'>
          <button
            onClick={handleLike}
            className='action-post'
            style={
              auth.isAuthenticated && liked
                ? {
                    border: '2px solid #dc1818',
                    backgroundColor: '#f8e4e4',
                  }
                : {}
            }
          >
            {auth.isAuthenticated && liked ? <LikeFill /> : <Like />}
          </button>
        </div>

        <span
          className='post-item__count'
          style={{
            display: 'block',
            marginBottom: '10px',
            color: auth.isAuthenticated && liked ? '#dc1818' : '',
          }}
        >
          {likesState >= 0 && likesState}
        </span>

        <div className='read-action'>
          <button
            onClick={handleBookMark}
            className='action-post'
            style={
              auth.isAuthenticated && bookmarked
                ? {
                    border: '2px solid royalblue',
                    backgroundColor: '#e8e9f9',
                  }
                : {}
            }
          >
            {auth.isAuthenticated && bookmarked ? <UnBookMark /> : <BookMark />}
          </button>
        </div>

        <span
          className='post-item__count'
          style={{
            display: 'block',
            marginBottom: '10px',
            color: auth.isAuthenticated && bookmarked ? 'royalblue' : '',
          }}
        >
          <span>{bookmarksState >= 0 && bookmarksState}</span>
        </span>

        <div className='more-action'>
          {share && <SharePost setShare={setShare} />}

          <button onClick={() => setShare(!share)} className='action-post'>
            <More />
          </button>
        </div>
      </div>
    </div>
  );
};

ActionPostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post.post,
});

export default connect(mapStateToProps)(ActionPostItem);
