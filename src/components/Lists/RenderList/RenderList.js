import React, { Component } from 'react';
import './RenderList.css';
import moment from 'moment';
import history from '../../../history';

export class RenderList extends Component {
  render() {
    const { title, description, createdAt, id } = this.props.note;
    return (
      <div
        className='m-t1   single__note-ctn'
        onClick={() => history.push(`/edit/${id}`)}
      >
        <h3>{title}</h3>
        <p className='m-t1'>{description}</p>
        <p className='time-stamp'>Created: {moment(createdAt).fromNow()}</p>
      </div>
    );
  }
}

export default RenderList;
