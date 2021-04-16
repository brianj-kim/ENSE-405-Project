import { useState, useContext, useEffect } from 'react';
import UserContext from '../context/user';
import { getPostings, getAllPostings, getUserByUserId } from '../services/firebase';

export default function usePostings() {
  const [postings, setPostings] = useState(null);
  const {
    user: { uid: userId = '' }
  } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePostings() {
      /*
      const [{ following }] = await getUserByUserId(userId);
      let followedUserPostings = [];
      
      if (following.length > 0) {
        followedUserPostings = await getPostings(userId, following);
      }

      followedUserPostings.sort((a, b) => b.dateCreated - a.dateCreated);
      setPostings(followedUserPostings);
      */

      let getAllPosts = [];
      getAllPosts = await getAllPostings(userId);
      getAllPosts.sort((a, b) => b.dateCreated - a.dateCreated);
      setPostings(getAllPosts);

    }

    getTimelinePostings()
  }, [userId]);

  return { postings };
  }
