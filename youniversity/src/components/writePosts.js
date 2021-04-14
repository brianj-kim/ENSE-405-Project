import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';
import useUser from '../hooks/use-user';

export default function Write () {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid); // useContext(UserContext);

  const [videoSrc, setVideoSrc] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const isInvalid = videoSrc === '' || description === '';
  const matchRegExp = videoSrc.match(/(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)\/(watch)?(\?v=)?(\S+)?/);

  const handleWrite = async (event) => {
    event.preventDefault();

    if (matchRegExp == null) {
      setVideoSrc('');
      setError("Only YouTube sharable links allowed here.");
      return;
    }
    try {
      // firebase 
      await firebase.firestore().collection('posting').add({
        userId: user.userId,
        videoSrc: videoSrc,
        description: description,
        likes: [],
        comments: [],
        userLatitude: "",
        userLongitude: "",
        dateCreated: Date.now()
      });

      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setVideoSrc('');
      setDescription('');
      setError(error.message);
    }

  };

  useEffect(() => {
    document.title = "Write a post";
  }, []);

  return (
    <div className="container">
      <form onSubmit={handleWrite} mehtod="POST">
      <div className="flex flex-col w-full h-96 justify-center rounded border bg-white border-gray-primary mb-9">

        <p className="flex justify-center my-4">Write a Post</p>
        <div className="w-full flex justify-center">{error && <p className="mb-4 text-xs text-red-primary">{error}</p>}</div>

        <div className="flex justify-center">
          <input
            aria-label="Paste the Youtube Link here"
            type="text"
            placeholder="videoSrc"
            className="w-11/12 h-2 py-5 px-4 mx-5 text-sm text-gray-base border border-gray-primary rounded"
            onChange={({ target }) => setVideoSrc(target.value)}
            value={videoSrc}
          />
        </div>
        
        <div className="w-full h-full flex justify-center">
          <textarea
            aria-label="Describe about the video"
            type="text"
            placeholder="Description"
            className="w-11/12 h-5/6 py-5 px-4 mx-5 text-sm text-gray-base border border-gray-primary rounded my-3"
            onChange={({ target }) => setDescription(target.value)}
            value={description}
          ></textarea>
        </div>

        <div className="flex flex-row justify-center w-full ">
          <button
            disabled={isInvalid}
            type="submit"
            className={`
              bg-blue-medium text-white w-11/12 rounded h-9 mb-3 font-bold
              ${isInvalid && 'opacity-50'}`}
          >
            Post
          </button>
        </div>


      </div>
      </form>
    </div>
  );
}
