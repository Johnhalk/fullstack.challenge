// @flow

import { observable, computed, action } from 'mobx'
import { filter, groupBy } from 'lodash'
import createAccount from 'lib/createAccount'
import greeting from 'lib/greeting'
import { DateTime } from 'luxon'

class AgendaStore {
// OBSERVABLE STATE
    @observable
    currentHour = DateTime.local().hour
    // Initialize an Account populated with random values
    @observable
    account = createAccount()
    // Initialize default selected calendar as All
    @observable
    selectedCalendar = 'All'
    // Boolean to determine wether to sort events by depeartment
    @observable
    sortByDepartment = false;

    // COMPUTED STATE

    // Set the greeting message depending on time of day
    @computed
    get greetingMessage (): string {
      return greeting(this.currentHour)
    }

    /**
   * Return events from all calendars, sorted by date-time.
   * Returned objects contain both Event and corresponding Calendar
   */
    @computed
    get events (): Array<{ calendar: Calendar, event: Event }> {
      let events = this.account.calendars
        .map((calendar) => (
          calendar.events.map((event) => (
            { calendar, event }
          ))
        ))
        .flat()
      let selectedCalendar = this.selectedCalendar

      // Sort events by date-time, ascending
      if (selectedCalendar !== 'All') {
        events = filter(events, function (event) { return event.calendar.id === selectedCalendar })
      }
      events.sort((a, b) => (a.event.date.diff(b.event.date).valueOf()))

      return events
    }

    // List of all sorted calendars
    @computed
    get sortedCalendars (): Array<{calendar: Calendar}> {
      return this.account.calendars
        .map((calendar) => (
          { calendar }
        ))
        .flat()
    }

    // Sort Events by department
    @computed
    get agendaEventsByDepartment (): Object<{ calendar: Calendar, event: Event }> {
      let events = this.events
      return groupBy(events, 'event.department')
    }

    // ACTION STATE

    // Set selected Calendar Id
    @action.bound
    setSelectedCalendar (calendarId) {
      this.selectedCalendar = calendarId
    }

    // Select if events are sorted by department or not
    @action.bound
    setSortByDepartment () {
      this.sortByDepartment = !this.sortByDepartment
    }

    // Set time to current hour
    @action.bound
    setCurrentHour () {
      this.currentHour = DateTime.local().hour
    }
}

export default AgendaStore
