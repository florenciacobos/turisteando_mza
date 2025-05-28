import React from 'react';
import ActionButton from './ActionButton';

const ActionBar = ({ 
  onSearch, 
  onLocationClick, 
  onPlaceClick,
  isLocationTracking 
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
      <ActionButton 
        onClick={onLocationClick}
        icon={isLocationTracking ? '🔴' : '📍'}
        label={isLocationTracking ? 'Detener seguimiento' : 'Mi ubicación'}
      />
    </>
  );
};

export default ActionBar;
