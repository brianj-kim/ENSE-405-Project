import { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Video from './video';
  

export default function Post({ content }) {
  // heaer, vide, actions (like comment icon, footer , comment) 
  const retrieveVideoId = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[7].length == 11) {
      return "https://www.youtube.com/embed/" + match[7];
    } else {
      return "https://www.youtube.com/embed/";
      console.log("could not retrieve video ID");
    }
  };

  return <div className="rounded col-span-4 border bg-white border-gray-primary mb-16">
          <Header username={content.username} />
          <Video src={retrieveVideoId(content.videoSrc)} description={content.description} />
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