import * as React from "react";
import AppContainer from './features/appContainer/AppContainer'

export type IAppProps = {

};
type IAppState = {
  value?: string;
}
export class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
  }

  render() {
    return (
        <AppContainer />
    );
  }
}
