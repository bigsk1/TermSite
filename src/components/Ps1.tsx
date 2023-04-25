import React from 'react';
import config from '../../config.json';

export const Ps1 = () => {
  return (
    <div className="p-2 md:p-4">
      <div>
        <span className="text-light-yellow dark:text-dark-yellow">
          {config.ps1_username}
        </span>
        <span className="text-light-gray dark:text-dark-gray">@</span>
        <span className="text-light-green dark:text-dark-green">
          {config.ps1_hostname}
        </span>
        <span className="text-light-gray dark:text-dark-gray">:$ ~ </span>
      </div>
    </div>
  );
};

export default Ps1;
