<template>
    <div>
        <!-- Item Details -->
        <el-container>
        <div>
            <el-row>
            <el-col :span="4">
                <div class="block">
                <span class="demonstration"></span>
                <el-image
                    src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                    fit="cover"
                    :preview-src-list="picList"
                ></el-image>
                </div>
            </el-col>
            <el-col :span="18">
                <h3 style="margin-bottom: 10px; margin-top: 0px">
                NETEL Penganjur Dapur Ketuhar Ketuhar Ketuhar Rak Diperkembangkan
                Boleh Laras dan Ketinggian Boleh Laras Penyimpanan Dapur Rak
                1/2-Tier Kabinet Dapur Rak Penyimpanan rak Pemegang Peralatan
                </h3>
                <!-- Seller -->
                <el-popover
                  placement="right"
                  width="400"
                  trigger="hover">
                  数据
                  <div style="display: table;" slot="reference">
                    <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                    <div style="display: table-cell;vertical-align: middle;" class="sub-title">Zekizheng</div>
                  </div>
                </el-popover>

                <div class="price-title">
                $ 10.00
                </div>
                <el-tooltip class="item" effect="dark" content="Star" placement="bottom">
                  <el-button type="warning" icon="el-icon-star-off" circle></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="Add to Shopping Cart" placement="bottom">
                  <el-button type="info" icon="el-icon-shopping-cart-2" circle></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="Chat with Seller" placement="bottom">
                  <el-button type="primary" icon="el-icon-chat-line-round" circle></el-button>
                </el-tooltip>
                <el-button type="success" round>Buy</el-button>
            </el-col>
            </el-row>
        </div>
        </el-container>

        <el-container>
          <h2>
            Product Description
          </h2>
        </el-container>
        <!-- Desc -->
        <el-container style="margin-top: 0px">
          <ul style="line-height: 25px">
            <li>【brushed Microfiber Made】 4-piece Size Twin Bed Sheet Set: 2 Pillow Cases and a Top Sheet and Fitted Sheet. Top Sheet Fitted Sheet 2 Pillow Cases (20” X 30”). Spaceship Rockets Print Kids Bedding</li>
            <li>【KFZ COSMIC PLANET PRINTED BEDDING】 The Bed Sheet Sets include 1 Flat Sheet, 1 Fitted Sheet, and 2 Pillow Cases Twin Sheets Set Blue Color for Girls Kids Adults</li>
            <li>【TOP-GRADE MATERIAL】This polyester brushed microfiber fabric girls bed sheet set is super silky soft, luxuriously comfortable, and wholly breathable for all-season use. The Egyptian-quality fiber ensures that the full sheets sets are resistant to wrinkles, stains, and fading. Even more skin-friendly than 100% cotton sheets, these full bed sheets will keep you fresh and cool in summer and cozy-warm in winter. The top sheet is also suitable for use as a coverlet on summer days.</li>
            <li>【DEEP-POCKET SHEET SETS】The fitted bed sheet included is designed with a deep pocket, allowing it to comfortably fit any mattress less than 15” in thickness. With a matching pattern on the top flat sheet and European envelope-style pillowcases, you can easily upgrade your bedding with a distinctive style in no time at all. The bedding sets are 100% soft, meaning they are for kids.</li>
            <li>【CUTE DESIGN AND GENEROUS FITS】Our twin size sheets are designed with very realistic solar planets on navy blue background pattern. We included all the planets in solar system. It is suitable for use in any type of room, including in the bedroom, as kids’ room décor, especially for the little ones who are keen on astronomical science. The cool and fashionable design is a delightful and colorful addition to your home décor.</li>
          </ul>
        </el-container>
    </div>
</template>

<style scoped>
.text {
  font-size: 14px;
}
.el-container {
  margin-top: 30px;
}
.item {
  margin-bottom: 10px;
}
.label-style {
  text-align: center;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 400px;
}

.el-col {
  margin: 20px;
}

.sub-title {
  font-size: 15px;
  color: #8492a6;
}

.price-title {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 20px;
  color: crimson;
  text-align: left;
}

.item-label {
  text-align: center;
}
</style>

<script>
  export default {
    data() {
      return {
        picList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ]
      }
    }
  }
</script>