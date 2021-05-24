import React from 'react'
import SignaturePad from 'signature_pad'
import { Button, message, PageHeader } from 'antd'
import './signature-board.less'
import {reqCommitSign} from '../../api/index'

export default class SignatureBoard extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.state = {
            signaturePad: {},
            width: 600,
            height: 250,
        }
    }

    componentDidMount() {
        const signaturePad = new SignaturePad(this.canvasRef.current, {
            backgroundColor: 'rgba(233, 235, 236, .3)',
            penColor: 'rgb(0, 0, 0)'
        })
        this.setState({ signaturePad }, ()=>{
            this.onSizeChange()
        })
        // 给window添加事件 这是signature-pad为了高低分辨率手机屏幕做的适配
        window.addEventListener('resize', this.onSizeChange)
        this.forceLandscape()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onSizeChange)
    }

    commitSignature = async () => {
        const imgBase64 = this.state.signaturePad.toDataURL('image/png')
        console.log(imgBase64)
        const {doc_id, uid} = this.props.location.state
        const result = await reqCommitSign(doc_id, uid, imgBase64)
        if(result.status === 0){
            message.success('签署成功')
        } else {
            message.error(result.msg)
        }
    }

    onSizeChange = () => {
        const canvas = this.canvasRef.current
        var ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
        this.state.signaturePad.clear(); // otherwise isEmpty() might return incorrect value
        // 获取视口宽高
        const viwportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        // 当前为竖屏
        if (viwportWidth < viewportHeight) this.forceLandscape()
    }

    // 不是横屏则强制横屏，需要更改画布的坐标原点适应书写
    forceLandscape = () => {
        const context = this.canvasRef.current.getContext("2d");
        context.save();
        context.translate(0, this.state.height)
        context.rotate(Math.PI / 2)
        context.scale(-1, -1)
    }

    render() {
        const { width, height, signaturePad } = this.state
        console.log(this.props)
        return (
            <>
                <div className="main">
                    <PageHeader
                        onBack={() => this.props.history.goBack()}
                        title="签名板"
                        subTitle="此处输入绘制签名，支持横竖屏切换。"
                    />
                    <div className="wrapper">
                        <canvas
                            id="signature-pad"
                            className="signature-pad"
                            width={width}
                            height={height}
                            ref={this.canvasRef}
                            // onClick={e => {
                            //     console.log('off',e.nativeEvent.offsetX, e.nativeEvent.offsetY)
                            //     console.log('page',e.nativeEvent.pageX, e.nativeEvent.pageY)
                            //     console.log('topleft',e.target.offsetWidth, e.target.offsetHeight)
                            // }}
                        ></canvas>
                    </div>
                    <div className="btn">
                        <Button type="primary" onClick={() => signaturePad.clear()}>清空</Button>
                        <Button type="primary" onClick={this.commitSignature}>签署</Button>
                    </div>
                </div>
            </>
        )
    }
}