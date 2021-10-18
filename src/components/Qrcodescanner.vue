<template>
    <div class="flex h-screen">
        <div class="border-4 border-gray-300 w-1/2 h-96 m-auto" >
            <qrcode-stream @decode='decode' :track='drawOutline'></qrcode-stream>
        </div>
    </div>
</template>

<script>
import {QrcodeStream} from 'vue3-qrcode-reader'

export default {
  components: {   
    QrcodeStream
  },
  methods: {
    decode(decodeString){
      console.log(decodeString)
    },
    drawOutline(decodeData, context){
      var points = []
      for(var k in decodeData){
        switch (k) {
        case 'topLeftCorner':
          points[0] = decodeData[k]
          break   
        case 'topRightCorner':
          points[1] = decodeData[k]
          break   
        case 'bottomRightCorner':
          points[2] = decodeData[k]
          break   
        case 'bottomLeftCorner':
          points[3] = decodeData[k]
          break            
        default:
          break
        }   
      }
      context.lineWidth = 5
      context.strokeStyle = 'green'
      context.beginPath()
      console.log(points[0])
      context.moveTo(points[0].x, points[0].y)

      for(const {x,y} of points){
        context.lineTo(x,y)
      }

      context.lineTo(points[0].x, points[0].y)
      context.closePath()
      context.stroke()
    }
  }
}
</script>
