import 'babel-polyfill';

import React from 'react';

import Relay from 'react-relay';

class App extends React.Component {
  render() {
    const records = this.props.viewer.records;
    return <div>
      { records.map(x => <div key={x.id} >{x.id} {x.title}</div>) }
    </div>
    ;
  }
}

const AppContainer = Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragments on Viewer {
        records {
          id
          title
        }
      }
    `
  }
});

class AppRoute extends Relay.Route {
  static queries = {
    viewer: () => Relay.QL`
      query {
        viewer
      }
    `
  };
  static routeName = "AppRoute";
}

const AppRenderer = () =>
  <Relay.Renderer
    Container={AppContainer}
    environment={Relay.Store}
    queryConfig={new AppRoute()}
    render={({done, error, props, retry, stale}) => {
      if (props) {
        return <AppContainer {...props}/>;
      }
    }}
  />
  ;

export default AppRenderer;
