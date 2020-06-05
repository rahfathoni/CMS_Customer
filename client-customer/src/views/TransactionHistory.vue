<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-lg">
                <h3 class="text-right">{{ emailLogin }} TRANSACTION HISTORY</h3>
                <hr style="border-top: 3px solid #8c8b8b;">
                <div v-if="transactionList !== false">
                    <TransactionHistoryTable />
                </div>
                <div v-else>
                    <div class="container mt-2">
                        <div class="text-center">
                        <h4>NO TRANSACTION HISTORY</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TransactionHistoryTable from '../components/TransactionHistoryTable'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'TransactionHistory',
  components: {
    TransactionHistoryTable
  },
  computed: {
    ...mapState(['transactionList', 'emailLogin'])
  },
  methods: {
    ...mapMutations(['SET_TRANSACTION_LIST', 'SET_EMAIL_LOGIN', 'SET_LOGIN']),
    ...mapActions(['readTransactionHistory']),
    getTransaction () {
      this.readTransactionHistory(localStorage.token)
        .then(({ data }) => {
          if (data.carts.length === 0) {
            this.SET_TRANSACTION_LIST(false)
          } else {
            this.SET_TRANSACTION_LIST(data.carts)
          }
        })
        .catch(_ => {
          this.SET_TRANSACTION_LIST(false)
        })
    }
  },
  created () {
    if (!localStorage.token) {
      this.$router.push('/')
      this.SET_EMAIL_LOGIN(null)
      this.SET_LOGIN(false)
    } else if (localStorage.token && !localStorage.email) {
      this.$router.push('/')
      localStorage.clear()
      this.SET_EMAIL_LOGIN(null)
      this.SET_LOGIN(false)
    } else {
      this.SET_LOGIN(true)
      this.SET_EMAIL_LOGIN(localStorage.email)
      this.getTransaction()
    }
  }
}
</script>

<style>
</style>
