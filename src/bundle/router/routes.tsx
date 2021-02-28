import {Switch, Route} from "react-router-dom";
import React, { Component, ComponentType } from 'react';

interface PageLoaderProps {
  path: string,
};
interface PageLoaderState {
  pageMap: {[x: string]: ComponentType},
};
class PageLoader extends Component<PageLoaderProps, PageLoaderState> {
  state: PageLoaderState = {
    pageMap: {},
  }
  componentWillMount() {
    import(`../pages/${this.props.path}`).then(({default: PageComponent}) => {
      this.setState({
        pageMap: {
          ...this.state.pageMap,
          [this.props.path]: PageComponent
        },
      })
    });
  }
  render() {
    const PageComponent = this.state.pageMap[this.props.path];
    if (!PageComponent) return <div>Loading...</div>;
    return <PageComponent/>;
  }
}

export const RouteSwitch = () => (
  <Switch>
    <Route exact path="/">
      <PageLoader path="authorized"/>
    </Route>
    <Route path="/login">
      <PageLoader path="login"/>
    </Route>
  </Switch>
);
