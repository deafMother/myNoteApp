import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getNotesType } from '../../actions';
import RenderList from './RenderList/RenderList';
import ButtonCreate from '../Button/CreateButton';

class Work extends React.Component {
  state = {
    type: 'work'
  };

  componentDidMount() {
    this.props.getNotesType(this.state.type);
  }

  render() {
    return (
      <div className='container'>
        <h3 className='header-medium primary in-b m-t1 m-b2'>
          <Link to='/'> Home </Link>| Work
        </h3>
        {this.props.list.length > 0 ? (
          this.props.list.map(item => <RenderList note={item} key={item.id} />)
        ) : (
          <React.Fragment>
            <span>list empty.. </span>
            <ButtonCreate />
          </React.Fragment>
        )}
      </div>
    );
  }
}

Work.protoTypes = {
  list: PropTypes.array.isRequired,
  getNotesType: PropTypes.func.isRequired
};

const mapStatetoProps = state => {
  return {
    list: state.list
  };
};

export default connect(
  mapStatetoProps,
  { getNotesType }
)(Work);
