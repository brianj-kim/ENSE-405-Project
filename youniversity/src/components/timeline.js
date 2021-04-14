import Skeleton from 'react-loading-skeleton';
import usePostings from '../hooks/use-postings';
import Post from './post';

export default function Timeline() {
  const { postings } = usePostings();

  // console.log('postings', postings);

  return (
    <div className="container">
      {!postings ? (
        <d>
          {[...new Array(4)].map((_, index) => 
            <Skeleton key={index} count={4} width={1024} height={600} className="mx-auto max-w-screen-lg mb-5" />
          )}
        </d>
      ) : postings?.length > 0 ? (
        postings.map((content) => <Post key={content.docId} content={content} />
        /* <div className="flex flex-col">
          <div className="flex justify-center"><iframe width="800" height="450" src={retrieveVideoId(content.videoSrc)} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
          <div className="flex justify-around pb-5">            
            <p>{content.description}</p>
            <h3>{content.username}</h3>
          </div>
        </div> */
        )
      ) : (
        <div className="text-center text-sxl">No Postings</div>
      )}
    </div>
  );
}
