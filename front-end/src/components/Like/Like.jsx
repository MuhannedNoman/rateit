import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

library.add(emptyHeart, fullHeart);

const Like = ({ liked, onClick }) => {
  const classes = liked ? 'fas' : 'far';

  return <FontAwesomeIcon onClick={onClick} icon={[classes, 'heart']} />;
};

export default Like;
