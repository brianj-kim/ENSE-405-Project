import { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Video from './video';
import Actions from './actions';
import Comments from './comments';  

export default function Post({ content }) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  // heaer, vide, actions (like comment icon, footer , comment) 
  const getVideoId = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);

    if(match && match[7].length === 11) {
      return match[7];
    } else {
      return null;
    }
  }

  const retrieveVideoSrc = (url) => {
    const videoId = getVideoId(url);

    if (videoId != null) {
      return "https://www.youtube.com/embed/" + videoId;
    } else {
      return "https://www.youtube.com/embed/";
    }
  };
  console.log(content)
  return <div className="rounded col-span-4 border bg-white border-gray-primary mb-9">
          <Header username={content.username} />
          <Video src={retrieveVideoSrc(content.videoSrc)} description={content.description} />
          <Actions 
            docId={content.docId}
            totalLikes={content.likes.length}
            likedPosting={content.userLikedPosting}
            handleFocus={handleFocus}
          />
          <Comments
            docId={content.docId}
            comments={content.comments}
            posted={content.dateCreated}
            commentInput={commentInput}
          />

        </div>;

}

Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    videoSrc: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    userLiked: PropTypes.bool.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired
  })
};