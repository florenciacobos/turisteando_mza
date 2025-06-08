import React from 'react';
import ActionButton from './ActionButton';

const ActionBar = ({
  onSearch,
  onPlaceClick,
}) => {
  return (
    <>
      <ActionButton
        onClick={onSearch}
        icon="🔍"
        label="Buscar"
      />
      <ActionButton
        onClick={onPlaceClick}
        icon="Lugar"
        label="Ver lugar"
      />
    </>
  );
};

export default ActionBar;
