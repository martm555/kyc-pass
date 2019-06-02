<template>
    <div id="app">
        <h2>Exchange currency rate forecast</h2>
        <br><br>
        <b-container>
            <b-row class="mb-5">
                <b-col sm="2">
                    <b-form-input placeholder="Amount" v-model="amount"></b-form-input>
                </b-col>

                <b-col sm="2">
                    <b-form-select v-model="baseCurrency" :options="baseCurrencies"></b-form-select>
                </b-col>

                <b-col sm="2">
                    <b-form-select v-model="targetCurrency" :options="targetCurrencies"></b-form-select>
                </b-col>

                <b-col sm="2">
                    <b-form-select v-model="maxWaitingTime">
                        <option value="null">Waiting time</option>
                        <option v-for="i in 25" :key="i" :value="i">{{ i }} weeks</option>
                    </b-form-select>
                </b-col>

                <b-col sm="2" style="text-align: left;">
                    <b-button variant="primary" @click="getForecast">Submit</b-button>
                </b-col>
            </b-row>
            <div style="color: red;">{{ errorMessage }}</div>
            <b-row class="my-1">
                <b-col sm="1">
                    <b>Result: </b>
                </b-col>
                <b-col sm="7">
                    <b-row class="my-1">
                        <b-col sm="5"><b>Date</b></b-col>
                        <b-col sm="3"><b>Rate</b></b-col>
                        <b-col sm="2"><b>Amount</b></b-col>
                    </b-row>
                    <div v-for="day in result" :style="bestRate === day.value ? 'color: green; font-weight: bold;' : ''" :key="day.value">
                        <b-row class="my-1">
                            <b-col sm="5">{{ day.date }}</b-col>
                            <b-col sm="3">{{ day.value }}</b-col>
                            <b-col sm="2">{{ amount * day.value }}</b-col>
                        </b-row>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import axios from 'axios';
    import { currencies } from './utils/constants';
    import { FORECAST_API_URL } from './utils/config';
  export default {
    data() {
      return {
        errorMessage: null,
        maxWaitingTime: null,
        bestRate: null,
        amount: 0,
        baseCurrency: null,
        targetCurrency: null,
        result: null,
        baseCurrencies: [
          {value: null, text: 'Base currency'},
          ...currencies.map(currency => {
            return {
              value: currency,
              text: currency,
            }
          })
        ],
        targetCurrencies: [
          {value: null, text: 'Target currency'},
          ...currencies.map(currency => {
            return {
              value: currency,
              text: currency,
            }
          })
        ]
      }
    },
    methods: {
      async getForecast() {
        this.result = null;
        this.bestRate = null;
        this.errorMessage = null;
          axios.get(`${FORECAST_API_URL}/getForecast`, {
            params: {
              baseCurrency: this.baseCurrency,
              targetCurrency: this.targetCurrency,
              maxWaitingTime: this.maxWaitingTime
            },
            timeout: 5000,
          }).then(result => {
            const values = result.data.map(item => item.value);
            this.bestRate = Math.max(...values);
            this.result = result.data;
            if (!this.result.length) {
              this.errorMessage = 'No result found';
            }
          }).catch(e => {
            if (e.response) {
              this.errorMessage = e.response.data.message;
              return;
            }
            this.errorMessage = e.message;
          });
      }
    },
    name: 'app',
  }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
