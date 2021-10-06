<template>
  <div>
      <el-container>
        <el-table
            ref="filterTable"
            :data="orderList"
            style="width: 100%">
            <el-table-column
            prop="orderDate"
            label="Order Date"
            sortable
            width="180"
            column-key="orderDate"
            >
            </el-table-column>
            <el-table-column
            prop="orderNo"
            label="Order No."
            width="200">
            </el-table-column>
            <el-table-column
            label="Pic."
            width="250">
            <template slot-scope="scope">
              <el-image 
                    style="width: 200px;"
                    :src="scope.row.pic.main" 
                    :preview-src-list="scope.row.pic.picList">
                </el-image>
            </template>
            </el-table-column>
            <el-table-column
            prop="item"
            label="Item"
            >
            </el-table-column>
            <el-table-column
            prop="price"
            label="Price"
            width="200">
            </el-table-column>
            <el-table-column
            prop='step'
            label="Current State"
            width="200"
            :filters="stepToText"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
                {{getStepName(scope.row.step)}}
            </template>
            </el-table-column>
            <el-table-column
            prop="tag"
            label="Operation"
            width="200">
            <template slot-scope="scope">
                <el-link style="margin: 5px" type="primary" @click="viewOrderDetails(scope.row.tag)">View Details</el-link>
                <el-link style="margin: 5px" type="danger" :disabled="false" @click="viewOrderDetails(scope.row.tag)">Delete</el-link>
            </template>
            </el-table-column>
        </el-table>
      </el-container>
  </div>
</template>

<style>

</style>

<script>
  export default {
    data() {
      return {
        stepToText:[
            { text: 'Created', value: '0'},
            { text: 'Paying', value: '1'},
            { text: 'Waiting Delivery', value: '2'},
            { text: 'Waiting Receive', value: '3'},
            { text: 'Waiting Confirm', value: '4'},
            { text: 'Waiting Evaluation', value: '5'},
            { text: 'Finish', value: '6'}
        ],
        orderList: [
            {
                orderDate: '2021-10-05 23:11:49',
                orderNo: '2127969037304475934',
                pic: {
                    main: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    picList: [
                        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                    ]
                },
                item: 'NETEL Penganjur Dapur Ketuhar Ketuhar Ketuhar Rak Diperkembangkan Boleh Laras dan Ketinggian Boleh Laras Penyimpanan Dapur Rak 1/2-Tier Kabinet Dapur Rak Penyimpanan rak Pemegang Peralatan',
                price: '$ 10.00',
                step: "1"
            }
        ],
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ]
      }
    },
     methods: {
      resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.step === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      viewOrderDetails(index){
          console.log("view order details " + index)
      },
      
      getStepName(step){
          for(var index in this.stepToText){
              if(step == this.stepToText[index].value){
                  return this.stepToText[index].text
              }
          }
        //   switch(step){
        //         case 0:
        //             return 'Created'
        //         case 1:
        //             return 'Paying'
        //         case 2:
        //             return 'Waiting Delivery'
        //         case 3:
        //             return 'Waiting Receive'
        //         case 4:
        //             return 'Waiting Confirm'
        //         case 5:
        //             return 'Waiting Evaluation'
        //         case 6:
        //             return 'Finish'
            
        //   }
      }
    }
  }
</script>