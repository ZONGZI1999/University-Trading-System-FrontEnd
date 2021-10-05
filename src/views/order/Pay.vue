<template>
  <div>
    <el-steps
      :active="1"
      finish-status="success"
      simple
      style="margin-top: 20px"
    >
      <el-step title="Create Order"></el-step>
      <el-step title="Paid Money"></el-step>
      <el-step title="Delivery Item"></el-step>
      <el-step title="Confirm Order"></el-step>
      <el-step title="Evaluation"></el-step>
    </el-steps>
    <!-- pay -->
    <el-container>
        <h2>
            
        </h2>
    </el-container>
    <el-container >
        <el-descriptions title="Order Details" direction="vertical" :column="4" border style="width: 70%" class="align-center">
        <el-descriptions-item label="Name">kooriookami</el-descriptions-item>
        <el-descriptions-item label="Phone No.">18100000000</el-descriptions-item>
        <el-descriptions-item label="Delivery Address" :span="2">苏州市</el-descriptions-item>
        <el-descriptions-item label="Item" :span='3'>
            XXX
        </el-descriptions-item>
        <el-descriptions-item label="Price">$ 10.00</el-descriptions-item>
        <el-descriptions-item label='Payment'>
            <el-radio v-model="payment" label="1" border>Balance</el-radio>
            <el-radio v-model="payment" label="2" border disabled>Credit Card</el-radio> 
        </el-descriptions-item>
        </el-descriptions>
    </el-container>
    <el-container>
        <div style="margin-top: 30px" class="align-center">
            <el-button type="primary">Pay</el-button>
            <el-button type="warning">Cancel</el-button>
        </div>
    </el-container>
  </div>
</template>

<style scoped>
.align-center{
    margin: 0 auto
}

</style>

<script>
  export default {
    data () {
      return {
        payment: '',
      };
    }
  }
</script>