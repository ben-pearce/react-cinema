import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';

import CinemaConfig from '../../cinema.config.js';

class Stand extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewers: 0
    };

    this.load();
  }

  load() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        if(xhr.status === 200 && xhr.responseText) {
          this.setState({ viewers: parseInt(xhr.responseText) });
          setTimeout(this.load.bind(this), 20000);
        }
      }
    };
    xhr.open('GET', `${CinemaConfig.stream_src}/count`, true);
    xhr.send();
  }

  render() {
    return (
      <>
        <Container fluid={true} className={'pt-2 pr-0 pl-0'}>
          <Row>
            <Col>
              <Button 
                variant="outline-secondary" 
                href={`${CinemaConfig.stream_rtmp}/${CinemaConfig.stream_key}`}
              >Watch via RTMP</Button>{' '}
            </Col>
            <Col md="auto" className="d-flex align-items-center">
              <span className=""><strong>{this.state.viewers}</strong> viewers</span>
            </Col>
          </Row>
        </Container>
        
      </>
    );
  }
}

Stand.propTypes = {
  screen: PropTypes.object.isRequired,
};

export default Stand;