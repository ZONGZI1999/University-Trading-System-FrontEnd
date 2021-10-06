<template>
  <div>
      <el-container>
        <el-table
            ref="filterTable"
            :data="showList"
            style="width: 100%">
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
            prop="tag"
            label="Operation"
            width="200">
            <template slot-scope="scope">
                <el-link style="margin: 5px" type="primary" @click="viewOrderDetails(scope.row.tag)">View</el-link>
            </template>
            </el-table-column>
        </el-table>
      </el-container>

      <el-container>
        <el-pagination
            :hide-on-single-page="false"
            :total="orderList.length"
            layout="prev, pager, next"
            style="margin: 0 auto; margin-top: 15px"
            @current-change="pageChange"
        >
        </el-pagination>
      </el-container>
  </div>
</template>

<style>

</style>

<script>
  import $ from 'jquery'
  export default {
    data() {
      return {
        orderList: [
            {
                pic: {
                    main: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    picList: [
                        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                    ]
                },
                item: 'NETEL Penganjur Dapur Ketuhar Ketuhar Ketuhar Rak Diperkembangkan Boleh Laras dan Ketinggian Boleh Laras Penyimpanan Dapur Rak 1/2-Tier Kabinet Dapur Rak Penyimpanan rak Pemegang Peralatan',
                price: '$ 10.00',
            },
        ],
        showList: [

        ]
      }
    },
    methods: {
        pageChange(page){
            $('html, body').animate({scrollTop:0}, 400); //Scroll to Top
            this.showList = []
            for(var i = (page-1)*10; i < page*10 && i < this.orderList.length; i++){
                this.showList.push(this.orderList[i])
            }
        }
    },
    created(){
        for(var i = 0;i < 100; i++){
            this.orderList.push({
                pic: {
                    main: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    picList: [
                        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                    ]
                },
                item: 'NETEL Penganjur Dapur Ketuhar Ketuhar Ketuhar Rak Diperkembangkan Boleh Laras dan Ketinggian Boleh Laras Penyimpanan Dapur Rak 1/2-Tier Kabinet Dapur Rak Penyimpanan rak Pemegang Peralatan',
                price: i + '',
            })
        }
        for(var i = 0; i < 10; i++){
            this.showList.push(this.orderList[i])
        }
    }
  }
</script>