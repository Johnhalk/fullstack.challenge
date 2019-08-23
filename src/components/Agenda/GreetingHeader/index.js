// @flow

import React, { Component } from 'react'

import { DateTime } from 'luxon'
import greeting from 'lib/greeting'
import style from './style'

/**
 * Greeting header component
 * Displays greeting, changing on time of day
 */
type tProps = {
    currentHour: integer,
  }

class GreetingHeader extends Component<tProps> {
  constructor (props) {
    super(props)
    this.currentHour = DateTime.local().hour
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      this.currentHour = DateTime.local().hour
    }, 60 * 1000)
  }

  componentWillUnMount () {
    clearInterval(this.interval)
  }

  render () {
    const { currentHour } = this.props
    return (
      <div className={style.header}>
        {greeting(currentHour)}
      </div>
    )
  }
}

export default GreetingHeader
