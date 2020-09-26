import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Like = ({ liked, onClick }) => {
  const classes = liked ? 'fas' : 'far';

  return <FontAwesomeIcon onClick={onClick} icon={[classes, 'heart']} />;
};

export default Like;
