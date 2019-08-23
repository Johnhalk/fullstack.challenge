// @flow

import React from 'react'

import style from './style'

/**
 * Greeting header component
 * Displays greeting, changing on time of day
 */
type tProps = {
  greetingMessage: string
  }

export default ({ greetingMessage }: tProps) => (
  <div className={style.header}>
    {greetingMessage}
  </div>
)
