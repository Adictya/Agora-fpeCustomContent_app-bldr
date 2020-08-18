import React, {useState} from 'react';
import Join from './pages/Join';
import VideoCall from './pages/VideoCall';
import Create from './pages/Create';
import {Router, Route, Switch, Redirect} from './components/Router';
import PrivateRoute from './components/PrivateRoute';
import OAuth from './components/OAuth';
import Navigation from './components/Navigation';
import StoreToken from './components/StoreToken';
import {StorageProvider} from './components/StorageContext';
import GraphQLProvider from './components/GraphQLProvider';
import JoinPhrase from './components/JoinPhrase';
import {SessionProvider} from './components/SessionContext';

const App: React.FC = () => {
  const [channel, onChangeChannel] = useState('');
  const [password, onChangePassword] = useState('');

  return (
    <StorageProvider>
      <GraphQLProvider>
        <Router>
          <SessionProvider>
            <Navigation />
            <Switch>
              <Route exact path={'/'}>
                <Redirect to={'/join'} />
              </Route>
              <Route exact path={'/authenticate'}>
                <OAuth />
              </Route>
              <Route path={'/auth-token/:token'}>
                <StoreToken />
              </Route>
              <Route exact path={'/join'}>
                <Join
                  channel={channel}
                  onChangeChannel={onChangeChannel}
                  password={password}
                  onChangePassword={onChangePassword}
                />
              </Route>
              <Route path={'/join/:phrase'}>
                <JoinPhrase />
              </Route>
              <PrivateRoute path={'/create'} failureRedirectTo={'/authenticate'}>
                <Create />
              </PrivateRoute>
              <Route path={'/:channel'}>
                <VideoCall />
              </Route>
            </Switch>
          </SessionProvider>
        </Router>
      </GraphQLProvider>
    </StorageProvider>
  );
};
export default App;
