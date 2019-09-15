<template>
    <div class="card">
        <div class="card-header">
            <h6 class="text-uppercase mb-0">Veranstaltungen in der nächsten Zeit</h6>
        </div>
        <div class="card-body">
            <div class="row">
                <canvas id="startsAt" class="w-100 w-75"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
import { ENDPOINT } from '../../utils'
import Chart from 'chart.js'
import 'chartjs-adapter-date-fns'
import de from 'date-fns/locale/de'

/**
 * Returns a counter for all the items in the collection.
 * @see {@link https://stackoverflow.com/a/44189621}
 * @param {Array} array
 * @constructor
 */
function Counter(array) {
  array.forEach(val => this[val] = (this[val] || 0) + 1);
}

export default {
  name: 'StartsAt',
  methods: {
    prepareData (events) {
      let event_dates = events.map((event) => event.starts_at)
      let counter = new Counter(event_dates)
      return event_dates.map((starts_at) => {
        return {
          x: starts_at,
          y: counter[starts_at]
        }
      })
    }
  },
  mounted () {
    let vm = this
    fetch(`${ENDPOINT}/events?select=starts_at`)
        .then((response) => response.json())
        .then((events) => {
          new Chart(document.getElementById('startsAt'), {
            type: 'bar',
            data: {
              datasets: [{
                label: 'Veranstaltungen',
                data: vm.prepareData(events),
              }]
            },
            options: {
              adapters: {
                date: {
                  locale: de
                }
              },
              scales: {
                xAxes: [{
                  type: 'time',
                  ticks: {
                    source: 'data',
                    autoSkip: true
                  },
                  time: {
                    unit: 'month'
                  }
                }],
                yAxes: [{
                  scaleLabel: {
                    barThickness: 'flex',
                    display: true,
                    labelString: 'Anzahl'
                  }
                }]
              }
            }
          })
        })
  }
}
</script>
