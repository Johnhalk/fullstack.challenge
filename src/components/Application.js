// @flow

import React, { Component } from 'react'
import { observer, Provider, disposeOnUnmount } from 'mobx-react'

import updateAccount from 'lib/updateAccount'
import runEvery from 'lib/runEvery'

import Agenda from './Agenda/index'
import AgendaStore from './Agenda/AgendaStore'

const REAL_TIME_UPDATES_INTERVAL = 10000

@observer
class Application extends Component {
  // Initialize a new Agenda Store for component
  store = new AgendaStore()

  // Set timer interval to check current hour
  componentDidMount () {
    this.interval = setInterval(() => {
      this.store.setCurrentHour()
    }, 1000)
  }

  componentWillUnMount () {
    clearInterval(this.interval)
  }

  // Simulate real-time updates by updating random events properties
  // at pre-defined intervals
  cancelRealTimeUpdates = disposeOnUnmount(this,
    runEvery(REAL_TIME_UPDATES_INTERVAL, () => {
      try {
        updateAccount(this.store.account)
      }
      catch (e) {
        console.error(e)
      }
    }),
  )

  render () {
    return (
      <Provider store={this.store}>
        <Agenda />
      </Provider>
    )
  }
}

export default Application
