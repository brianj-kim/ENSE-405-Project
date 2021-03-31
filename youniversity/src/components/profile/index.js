import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Postings from './postings';
import { getUserPostingsByUsername } from '../../services/firebase';

export default function Profile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    postingsCollection: [],
    followerCount: 0
  };

  const [{ profile, postingsCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPostings() {
      const postings = await getUserPostingsByUsername(user.username);
      dispatch({ profile: user, postingsCollection: postings, followerCount: user.followers.length });
    }
    getProfileInfoAndPostings();
  }, [user.username]);

  return (
    <>
      <Header
        postingsCount={postingsCollection ? postingsCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Postings postings={postingsCollection} />
    </>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string
  })
};