import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';

import CinemaConfig from '../../../cinema.config.js';
import Movie from './Movie.jsx';
import SchedulePaginator from './SchedulePaginator.jsx';
import { ScheduleContentLoader } from '../ContentLoaders.jsx';


class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      schedule: null
    };
    
    this.load();
  }

  getScheduledMovies() {
    const currTimestamp = Math.floor((new Date()).getTime() / 1000);

    let schedule = this.state.schedule.slice(0);
    schedule.sort((a, b) => a.showtime - b.showtime);
    schedule = schedule.filter(item => item.showtime + (item.runtime + 30 * 60) > currTimestamp);
    return schedule;
  }

  getNextMovie() {
    return this.getScheduledMovies()[0];
  }

  load() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        let schedule = JSON.parse(xhr.responseText);
        this.setState({ schedule: schedule });
        this.props.screen.current.setState({ title: this.getNextMovie().name });
      }
    };
    xhr.open('GET', `${CinemaConfig.shedule_path}?t=${Date.now()}`, true);
    xhr.send();
  }

  render() {
    let scheduleComponent = null;
    if(this.state.schedule === null) {
      scheduleComponent = <ScheduleContentLoader/>;
    } else if(this.state.schedule.length === 0) {
      scheduleComponent = <p className="text-center">There are no shows currently scheduled.</p>;
    } else if (this.state.schedule.length >= 1) {
      const currTimestamp = Math.floor((new Date()).getTime() / 1000);

      let schedule = this.getScheduledMovies();
      const movieHasStarted = currTimestamp > schedule[0].showtime;
      const secondsToUpdate = Math.abs(schedule[0].showtime - currTimestamp) + (movieHasStarted ? schedule[0].runtime * 60 : 0);
      const updateIn = (secondsToUpdate + 5) * 1000;
      setTimeout(this.load.bind(this), updateIn);
      scheduleComponent = (
        <>
          <h2>{ schedule[0].showtime < currTimestamp ? 'Now Showing' : 'Up Next' }</h2><hr/>
          <Movie { ... schedule[0] } isNext={true} />
          
          <h3 className="mt-3">Coming Up</h3><hr/>
          <SchedulePaginator schedule={schedule.slice(1)} itemsPerPage={2} />
        </>
      );
    }

    return (
      <>
        <Card className="mb-2 mt-2">
          <Card.Header>Now Showing & Schedule</Card.Header>
          <Card.Body>
            {scheduleComponent}
          </Card.Body>
        </Card>
      </>
    );
  }
}

Schedule.propTypes = {
  screen: PropTypes.object.isRequired
};

export default Schedule;