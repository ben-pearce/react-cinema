import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

class Movie extends React.Component {
  render() {
    return (
      <div className={'media mt-3'}>
        <img className="mr-3" width={this.props.isNext ? '150px' : '110px'} height={this.props.isNext ? '225' : '165'} src={this.props.poster} />
        <div className="media-body">
          <h4 className="mt-0">{this.props.name}</h4>
          <h5><strong>Airs:</strong> {moment(new Date(this.props.showtime * 1000)).calendar(null, { sameElse: 'ddd, Do MMM [at] h:mm A' })}</h5>
          <p className="text-muted">{this.props.rating} | {this.props.category} | {this.props.release} | Runtime: {this.props.runtime} mins</p>
          <p>{this.props.synopsis}</p>
        </div>
      </div>
    );
  }
}

Movie.propTypes = {
  showtime: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  runtime: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  release: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  isNext: PropTypes.bool
};

Movie.defaultProps = {
  isNext: false
};

export default Movie;