import React, { Component, ComponentType } from 'react';
import Loadable, { LoadableComponent, Capture } from 'react-loadable';

interface PageModule {
  default: ComponentType,
  loadPageData: () => Promise<(StringKeyObject | null)>
}
interface PageData  {
  component: LoadableComponent & ComponentType,
  isDataLoaded: boolean,
}
interface PageLoaderProps {
  pageName: string,
};
interface PageLoaderState {
  lastPage: PageData | null,
  pageMap: {[pageName: string]: PageData},
};
const loadPage = (pageName: string): LoadableComponent & ComponentType => {
  const Page = Loadable({
    loader: () => {
      return import(`../pages/${pageName}`)
    },
    loading: () => <span>Loading loadable</span>,
  });
  // Page.preload();
  return Page;
}
export default class PageLoader extends Component<PageLoaderProps, PageLoaderState> {
  state: PageLoaderState = {
    lastPage: null,
    pageMap: {},
  }
  async loadComponent() {
    console.log('loading 1', this.props.pageName);
    const storedPageData = this.state.pageMap[this.props.pageName];
    if (storedPageData?.isDataLoaded) return;
    const PageComponent = loadPage(this.props.pageName);
    console.log('loaded', this.props.pageName);
    const pageData = {
      component: PageComponent,
      isDataLoaded: true,
    };
    this.setState({
      lastPage: pageData,
      pageMap: {
        ...this.state.pageMap,
        [this.props.pageName]: pageData,
      },
    });
  }
  UNSAFE_componentWillMount() {
    this.loadComponent();
  }
  componentDidUpdate(prevProps: PageLoaderProps) {
    if (prevProps.pageName !== this.props.pageName) this.loadComponent();
  }
  render() {
    const pageData = this.state.pageMap[this.props.pageName];
    console.log('pageData', pageData, this.props.pageName);
    if (!pageData?.isDataLoaded) {
      const lastPageData = this.state.lastPage;
      const LastComponent = lastPageData?.component;
      if (!LastComponent) return <div>Loading...</div>;
      return <LastComponent />;
    }
    const PageComponent = pageData.component;
    return (
      <Capture report={moduleName => {
        console.log('capture 2', moduleName);
      }}>
        <PageComponent />
      </Capture>
    )
  }
}
