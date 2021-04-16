import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}

// get user from the firestore where userId === userId (passed from the auth)
export async function getUserByUserId(userId) {
  const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  // console.log(user);
  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection('users').limit(10).get();

  // console.log('following', following);
  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}

// updateLoggedInUserFollowing, updateFollowedUserFollowers
export async function updateLoggedInUserFollowing(
  loggedInUserDocId, // currently logged in user document id
  profileId, // the user that current user requests to follow
  isFollowingProfile // true/false (am i currently following this person?)
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId)
    });
}

export async function updateFollowedUserFollowers(
  profileDocId, // currently logged in user document id
  loggedInUserDocId, // the user that current user requests to follow
  isFollowingProfile // true/false (am i currently following this person?)
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId)
    });
}

export async function getPostings(userId, following) {
  const result = await firebase
    .firestore()
    .collection('posting')
    // Bring all the postings
    // .where('userId', 'in', [...following, userId]) 
    .get();

  const userFollowedPostings = result.docs.map((posting) => ({
    ...posting.data(),
    docId: posting.id
  }));

  const postingsWithUserDetails = await Promise.all(
    userFollowedPostings.map(async (posting) => {
      let userLikedPosting = false;
      if (posting.likes.includes(userId)) {
        userLikedPosting = true;
      }

      const user = await getUserByUserId(posting.userId);
      const { username } = user[0];

      return { username, ...posting, userLikedPosting };
    })
  );

  return postingsWithUserDetails;
}

export async function getAllPostings(userId){
  const result = await firebase 
    .firestore()
    .collection('posting')
    .get();

    const userPostings = result.docs.map((posting) => ({
        ...posting.data(),
        docId: posting.id
    }));

    const postingsWithUserDetails = await Promise.all(
      userPostings.map(async (posting) => {
        let userLikedPosting = false;
        if (posting.likes.includes(userId)) {
          userLikedPosting = true;
        }

        const user = await getUserByUserId(posting.userId);
        const { username } = user[0];

        return { username, ...posting, userLikedPosting }

        
      })
    );

    return postingsWithUserDetails;
}

export async function getUserPostingsByUsername(username) {
  const [user] = await getUserByUsername(username);
  const result = await firebase
    .firestore()
    .collection('posting')
    .where('userId', '==', user.userId)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUserUsername) // karl (active logged in user)
    .where('following', 'array-contains', profileUserId)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return response.userId;
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  // 1st param: karl's doc id
  // 2nd param: raphael's user id
  // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);

  // 1st param: karl's user id
  // 2nd param: raphael's doc id
  // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
  await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}
