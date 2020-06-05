<template>
    <div>
        <table class="table table-hover table-bordered table-dark table-responsive-md mb-5">
            <thead>
                <tr>
                    <th scope="col" class="text-center col-1">No</th>
                    <th scope="col" class="text-center col-2">Image</th>
                    <th scope="col" class="text-center col-4">Name</th>
                    <th scope="col" class="text-center col-1">Price/pcs (IDR)</th>
                    <th scope="col" class="text-center col-1">Quantity</th>
                    <th scope="col" class="text-center col-2">Total Price (IDR)</th>
                    <th scope="col" class="text-center col-2">Transaction Date</th>
                </tr>
            </thead>
            <tbody v-for="(transaction, i) in transactionList" :key="i"
            >
            <tr>
                <th scope="row">{{ i+1 }}.</th>
                <td>
                    <img v-if="transaction.Product.image_url === 'No image available'"
                        class="mx-auto"
                        style="width: 100%; height: 6vw; object-fit: contain;"
                        alt="NO IMAGE AVAILABLE"
                        src="../assets/noimage.png"
                    >
                    <img v-else
                        class="mx-auto"
                        style="width: 100%; height: 6vw; object-fit: contain;"
                        alt="IMAGE. . ."
                        :src="transaction.Product.image_url"
                    >
                </td>
                <td>{{ transaction.Product.name }}</td>
                <td class="text-right">{{ transaction.Product.price }}</td>
                <td class="text-center">{{ transaction.quantity }}</td>
                <td class="text-right">{{ transaction.totalPrice }}</td>
                <td class="text-right">{{ transaction.updatedAt | formatDate }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TransactionHistoryTable',
  computed: {
    ...mapState(['transactionList'])
  }
}
</script>

<style>
</style>
