import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getNotesType } from '../../actions';
import RenderList from '../Lists/RenderList/RenderList';
import ButtonCreate from '../Button/CreateButton';

class UnCat extends React.Component {
  state = {
    type: 'uncategory'
  };

  componentDidMount() {
    this.props.getNotesType(this.state.type);
  }

  render() {
    return (
      <div className='container'>
        <h3 className='header-medium primary in-b m-t1 m-b2'>
          <Link to='/'> Home </Link>| Un-Categorised
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

UnCat.protoTypes = {
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
)(UnCat);
