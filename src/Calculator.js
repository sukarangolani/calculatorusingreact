import React from 'react'
import './App.css'

class Calculator extends React.Component {
    constructor() {
        super()
        this.state = {
            inp: "0",
            n1: null,
            operator: "None",
            workspace:"",
            count:0
        }
    }
    handleClick = (event) => {
        if(this.state.inp==="Error! Click AC to reset" || this.state.inp==="Cannot divide by 0"){
            this.setState({})
        }
        else if(this.state.inp === "0" & event.target.value !== "0") {
            this.setState({ inp: event.target.value })
            this.setState({workspace:this.state.workspace+event.target.value})
        }
        else {
            this.setState({ inp: this.state.inp + event.target.value })
            this.setState({workspace:this.state.workspace+event.target.value})
        }
    }
    handleOperator = (event) => {
        this.setState({ operator: event.target.value})
        if(this.state.operator!==event.target.value){
            this.setState({count:this.state.count+1})
        }
        if(this.state.inp!=="Error! Click AC to reset" || this.state.inp!=="Cannot divide by 0"){
            if(this.state.inp!=="0"){
                this.setState({ n1: this.state.inp, inp: "0" })
            }
            
            if(this.state.workspace!=="" && this.state.workspace.slice(-1)!=="+" && this.state.workspace.slice(-1)!=="-" && this.state.workspace.slice(-1)!=="x" && this.state.workspace.slice(-1)!=="/" && this.state.workspace.slice(-1)!=="%"){
                this.setState({workspace:this.state.workspace+event.target.value})
            }  
            else if(this.state.workspace!=="" && this.state.workspace.slice(-1)!==event.target.value){
                this.setState({workspace:this.state.workspace.slice(0,-1)+event.target.value})
            }          
        }
        else{
            this.setState({ n1: "0", inp: "0" })
        }
        if(this.state.count+1>1 && this.state.inp!=="0"){
            this.handleMultiple() 
            this.setState({inp:"0"})
        }
        
    }
    reset = () => {
        this.setState({
            inp: "0",
            n1: null,
            workspace:"",
            operator: "None",
            count:0
        })
    }
    handleSubmit = () => {
        switch (this.state.operator) {
            case "None": this.setState({ inp: "Error! Click AC to reset" })
                break;
            case "+": this.setState({ inp:Number(this.state.n1) + Number(this.state.inp),n1:Number(this.state.n1) + Number(this.state.inp) })
                break;
            case "-": this.setState({ inp:Number(this.state.n1) - Number(this.state.inp),n1:Number(this.state.n1) - Number(this.state.inp)})
                break;
            case "x": this.setState({ inp:Number(this.state.n1) * Number(this.state.inp),n1:Number(this.state.n1) * Number(this.state.inp) })
                break;
            case "/": if(this.state.inp==="0"){
                        this.setState({inp:"Cannot divide by 0"})
                    }
                    else{
                        this.setState({ inp:Number(this.state.n1) / Number(this.state.inp),n1:Number(this.state.n1) / Number(this.state.inp)})
                    }
                    break;
            case "%": this.setState({ inp:(Number(this.state.n1) * Number(this.state.inp))/100,n1:(Number(this.state.n1) * Number(this.state.inp))/100 })
                break;
            default:    break;
        }
        if(this.state.inp==="0"){
            this.setState({ inp: "Error! Click AC to reset" })
        }
        this.setState({operator:"None"})
    }
    handleMultiple = () => {
        switch (this.state.operator) {
            case "None": this.setState({ inp: "Error! Click AC to reset" })
                break;
            case "+": this.setState({ inp:Number(this.state.n1) + Number(this.state.inp),n1:Number(this.state.n1) + Number(this.state.inp) })
                break;
            case "-": this.setState({ inp:Number(this.state.n1) - Number(this.state.inp),n1:Number(this.state.n1) - Number(this.state.inp)})
                break;
            case "x": this.setState({ inp:Number(this.state.n1) * Number(this.state.inp),n1:Number(this.state.n1) * Number(this.state.inp) })
                break;
            case "/": if(this.state.inp==="0"){
                        this.setState({inp:"Cannot divide by 0"})
                    }
                    else{
                        this.setState({ inp:Number(this.state.n1) / Number(this.state.inp),n1:Number(this.state.n1) / Number(this.state.inp)})
                    }
                    break;
            case "%": this.setState({ inp:(Number(this.state.n1) * Number(this.state.inp))/100,n1:(Number(this.state.n1) * Number(this.state.inp))/100 })
                break;
            default:    break;
        }
    }
    backspace=()=>{
        let str=String(this.state.inp)
        if(str.length===1){
            this.setState({inp:"0",workspace:this.state.workspace.slice(0,-1)})
        }
        else if(str!=="Error! Click AC to reset"){
            this.setState({inp:str.slice(0,-1),workspace:this.state.workspace.slice(0,-1)})
        }
    }
    cond=()=>{
        if(this.state.workspace!==""){
            return <div className="text-right" style={{fontSize:"13px"}}>Workspace - {this.state.workspace}</div>
        }
        else{
            return null
        }
    }
    render() {
        return <React.Fragment>
            <div className="card col-md-4 col-sm-12  mt-3 offset-md-4">
                <div className="card-body">
                    <h5 className="card-title">Calculator App</h5>
                    {this.cond()}
                    <input type="text" value={this.state.inp} style={{backgroundColor:"black",color:"white",fontSize:"1.5em"}} className="form-control text-right mt-1 mb-2" disabled />
                    <table className="table table-bordered text-center">
                        <thead>
                            <tr>
                                <td className="function"><button className="btn btn-block btn-sm" onClick={this.reset}>AC</button></td>
                                <td className="function"><button className="btn btn-block btn-sm" onClick={this.backspace}><i className="fa fa-angle-left"></i></button></td>
                                <td className="function"><button className="btn btn-block btn-sm" onClick={this.handleOperator} value="%">%</button></td>
                                <td className="operator"><button className="btn btn-block btn-sm" style={{color:"white"}} onClick={this.handleOperator} value="/">/</button></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="digit"><button className="btn btn-block btn-sm" onClick={this.handleClick} value="7">7</button></td>
                                <td className="digit"><button className="btn btn-block btn-sm" onClick={this.handleClick} value="8">8</button></td>
                                <td className="digit"><button className="btn btn-block btn-sm" onClick={this.handleClick} value="9">9</button></td>
                                <td className="operator"><button className="btn btn-block btn-sm" style={{color:"white"}} onClick={this.handleOperator} value="x">x</button></td>
                            </tr>
                            <tr>
                                <td className="digit"><button className="btn btn-block btn-sm" onClick={this.handleClick} value="4">4</button></td>
                                <td className="digit"><button className="btn btn-block btn-sm" onClick={this.handleClick} value="5">5</button></td>
                                <td className="digit"><button className="btn btn-block btn-sm" onClick={this.handleClick} value="6">6</button></td>                                
                                <td className="operator"><button className="btn btn-block btn-sm" style={{color:"white"}} onClick={this.handleOperator} value="-">-</button></td>
                            </tr>
                            <tr>
                                <td className="digit"><button className="btn btn-block btn-sm" onClick={this.handleClick} value="1">1</button></td>
                                <td className="digit"><button className="btn btn-block btn-sm" onClick={this.handleClick} value="2">2</button></td>
                                <td className="digit"><button className="btn btn-block btn-sm" onClick={this.handleClick} value="3">3</button></td>
                                <td className="operator"><button className="btn btn-block btn-sm" style={{color:"white"}} onClick={this.handleOperator} value="+">+</button></td>
                            </tr>
                            <tr>
                                <td className="digit"><button className="btn btn-block btn-sm" onClick={this.handleClick} value="0">0</button></td>
                                <td className="digit"><button className="btn btn-block btn-sm" onClick={this.handleClick} value=".">.</button></td>
                                <td colSpan="2" className="align-middle operator"><button  style={{color:"white"}} className="btn btn-block btn-sm" onClick={this.handleSubmit}>=</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    }
}

export default Calculator