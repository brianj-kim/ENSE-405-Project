import PropTypes from 'prop-types';

export default function Video({src, description}) {

  return (
    <div className="flex flex-col">
      <div className="flex justify-center py-4"><iframe width="800" height="450" src={src} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
      <div className="flex justify-center pb-5">            
        <p>{description}</p>
      </div>
    </div>
  )
}

Video.propTypes = {
  src: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};