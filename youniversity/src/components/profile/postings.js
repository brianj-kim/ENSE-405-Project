/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

export default function Postings({ postings }) {
  const retrieveVideoId = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[7].length === 11) {
      return "https://www.youtube.com/embed/" + match[7];
    } else {
      return "https://www.youtube.com/embed/";
    }
  };

  return (
    <div className="h-16 border-t border-gray-primary mt-12 pt-4">
      <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
        {!postings ? (
          <>
            <Skeleton count={12} width={800} height={600} />
          </>
        ) : postings.length > 0 ? (
          postings.map((posting) => (
            <div key={posting.docId} className="rounded col-span-4 border bg-white border-gray-primary mb-9">
              <div className="flex flex-col">
                <div className="flex justify-center py-4"><iframe width="800" height="450" src={retrieveVideoId(posting.videoSrc)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>
                <div className="flex justify-center pb-5">            
                  <p>{posting.description}</p>
                </div>
              </div>             
              
            </div>
          ))
        ) : null}
      </div>

      {!postings || (postings.length === 0 && <p className="text-center text-2xl">No Posts Yet</p>)}
    </div>
  );
}

Postings.propTypes = {
  postings: PropTypes.array.isRequired
};