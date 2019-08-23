// @flow

import { observable, computed, action } from 'mobx'

import createAccount from 'lib/createAccount'
import { DateTime } from 'luxon'

class AgendaStore {
    @observable
    currentHour = DateTime.local().hour
    // Initialize an Account populated with random values
    @observable
    account = createAccount()

    /**
   * Return events from all calendars, sorted by date-time.
   * Returned objects contain both Event and corresponding Calendar
   */
    @computed
    get events (): Array<{ calendar: Calendar, event: Event }> {
      const events = this.account.calendars
        .map((calendar) => (
          calendar.events.map((event) => (
            { calendar, event }
          ))
        ))
        .flat()

      // Sort events by date-time, ascending
      events.sort((a, b) => (a.event.date.diff(b.event.date).valueOf()))

      return events
    }

    // Set time to current hour
    @action
    setCurrentHour () {
      this.currentHour = DateTime.local().hour
    }
}

export default AgendaStore
