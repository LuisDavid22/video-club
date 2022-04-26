/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const WithRouterHOC = (WrappedComponent) => (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <WrappedComponent
      {...props}
      params={params}
      navigate={navigate}
      location={location}
    />
  );
};

export default WithRouterHOC;
