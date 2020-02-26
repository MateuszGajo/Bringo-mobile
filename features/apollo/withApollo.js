import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "../../config";

const withApollo = WrappedComponent => ({ children, ...props }) => (
  <ApolloProvider client={client}>
    <WrappedComponent {...props} apolloClient={client}>
      {children}
    </WrappedComponent>
  </ApolloProvider>
);

export default withApollo;
