import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import Toggle from './components/toggler/toggler';

import { ThemeProvider } from 'styled-components';
import { useDarkMode } from './useDarkMode';
import { GlobalStyles } from './globalStyles';
import { lightTheme, darkTheme } from './Theme';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUpPage = lazy(() =>
  import('./pages/sign-in-and-sign-up-page/sign-in-and-sign-up.component')
);
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));

const App = ({ checkUserSession, currentUser }) => {
  const [theme, themeToggler, mountedComponent] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  if (!mountedComponent) return <div />;

  return (
    <div>
      <ThemeProvider theme={themeMode}>
        <>
          <GlobalStyles />
          <Header theme={theme} toggleTheme={themeToggler} />
          <Switch>
            <ErrorBoundary>
              <Suspense fallback={<Spinner />}>
                <Route exact path="/" component={HomePage} />
                <Route path="/shop" component={ShopPage} />
                <Route exact path="/checkout" component={CheckoutPage} />
                <Route
                  exact
                  path="/sign-in"
                  render={() =>
                    currentUser ? (
                      <Redirect to="/" />
                    ) : (
                      <SignInAndSignUpPage></SignInAndSignUpPage>
                    )
                  }
                />
              </Suspense>
            </ErrorBoundary>
          </Switch>
        </>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
