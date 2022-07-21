<template>
  <form
    name="punchout_form"
    method="post"
    action="https://openapi.alipaydev.com/gateway.do?alipay_sdk=alipay-easysdk-net-2.1.0&app_id=2021000121619670&charset=UTF-8&format=json&method=alipay.trade.page.pay&notify_url=http%3a%2f%2f43.142.41.192%3a54686%2falipay&return_url=http%3a%2f%2f43.142.41.192%3a54686&sign=hZgrgHr6Zgc7lRZwqS7Nn1cJX4Ex2Zb2deLX%2b2XN8SgPhoO0U0N8hIjez0vVEBMWVn60VhW2SEIzm4VAV%2flWtY%2fFTGGKCPxKjD57g2qr5xdeuQpg4kXvnM1jwg%2b%2bD6UlkvDuFWqZl6H3HxibBL7%2buwIwx7C3w1vxH%2f8JhNJ4FbLPiD3d7LccWe8tUaBBgqa5o66TPitxlBXF5pgZKxKYuf0y3%2fzIcumRcTqwq1Rp5w4WtFLEljVhqYvxMqGJSDeoVMwRog3F9UT%2bEZ2tGwttKoOViTJXit8Jdyzpl%2bzHUKQ73X5B82vRDyd8tBWak445ZbLFLZXgbgA3xTB7sdy4pw%3d%3d&sign_type=RSA2&timestamp=2022-07-20+17%3a13%3a09&version=1.0"
  >
    <input
      type="hidden"
      name="biz_content"
      value='{"subject":"test","out_trade_no":"444444443333333","total_amount":"33","product_code":"FAST_INSTANT_TRADE_PAY"}'
    />
    <input type="submit" value="立即支付" style="display: none" />
  </form>
</template>

<script>
export default {
  method: {
    mounted() {
      document.forms[0].submit();
    },
    
  },
};
</script>

<style>

</style>