import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';


export default function Header({ username, posted }) {
  return (
    <div className="flex border-b border-gray-primary h4 p-4 py-2.5">
      <div className="w-full flex items-center justify-between">
        <Link to={`/p/${username}`} className="flex items-center">
          <p className="font-bold">{username}</p>          
        </Link>
        <div className="text-gray-base uppercase text-xs">
          {formatDistance(posted, new Date())} ago
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
  posted: PropTypes.number.isRequired
};
