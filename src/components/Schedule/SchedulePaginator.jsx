import React from 'react';
import PropTypes from 'prop-types';

import Pagination from 'react-bootstrap/Pagination';
import Movie from './Movie.jsx';

class SchedulePaginator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0
    };
  }

  render() {
    if(this.props.schedule.length === 0) {
      return <p className="text-center">There are no shows coming up.</p>;
    }

    const scheduleItems = [];
    const paginatorItems = [];
    for(
      let i = this.props.itemsPerPage * this.state.page; 
      i < Math.min(this.props.schedule.length, this.props.itemsPerPage + (this.props.itemsPerPage * this.state.page)); 
      i++
    ) {
      scheduleItems.push(<Movie key={i} { ... this.props.schedule[i] } />);
    }

    if(this.props.schedule.length <= this.props.itemsPerPage) {
      return scheduleItems;
    }

    if(this.props.schedule.length > this.props.itemsPerPage) {
      for (let i = 1; i <= Math.round(this.props.schedule.length / this.props.itemsPerPage); i++) {
        paginatorItems.push(
          <Pagination.Item 
            key={i}
            active={i === this.state.page + 1} 
            onClick={() => this.setState({ page: i - 1 })}
          >
            {i}
          </Pagination.Item>
        );
      }
    }
    return (
      <>
        {scheduleItems}
        <Pagination className={'justify-content-center'}>
          <Pagination.Item
            disabled={this.state.page == 0}
            onClick={() => this.setState({ page : this.state.page - 1 })}
          >
            Previous
          </Pagination.Item>
          {paginatorItems}
          <Pagination.Item
            disabled={this.state.page + 1 == Math.round(this.props.schedule.length / this.props.itemsPerPage)}
            onClick={() => this.setState({ page : this.state.page + 1 })}
          >
            Next
          </Pagination.Item>  
        </Pagination>
      </>
    );
  }
}

SchedulePaginator.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  schedule: PropTypes.array.isRequired
};

export default SchedulePaginator;