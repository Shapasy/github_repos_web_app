import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Header } from './components/header'
import { Home } from './components/home'
// import { Footer } from './components/footer'
import { PageNotFound } from './components/page_not_found'
import './style/header_style.css'
import './style/repo_card_style.css'
import './style/footer_style.css'

export const App = () => {
  return <div>
    <BrowserRouter>
      <Header />
      <main>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='*' component={PageNotFound} exact />
        </Switch>
      </main>
      {/* <Footer /> */}
    </BrowserRouter>
  </div>
}

