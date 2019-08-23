// @flow

import React from 'react'

import greeting from 'lib/greeting'
import style from './style'

/**
 * Greeting header component
 * Displays greeting, changing on time of day
 */
type tProps = {
    currentHour: integer
  }

export default ({ currentHour }: tProps) => (
  <div className={style.header}>
    {greeting(currentHour)}
  </div>
)
