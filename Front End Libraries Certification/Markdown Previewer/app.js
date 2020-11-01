const initialState = `
This paragraph

**This is a bolded text**

> Block Quotes!

# heading
## heading 2

- list item 1
- list item 2
- list item 3
[Visit my twitter](https://twitter.com/AndresJiAr)

This is a inline \`<div></div>\`

This is a block of code:

\`\`\`
    let x = 1
    let y = 2
    let z = x + y;
\`\`\`

![React](https://goo.gl/Umyytc)
`;



class App extends React.Component{
  state ={
    text: initialState
  }
  
  handleChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }
  render(){
    const { text } = this.state;
    
    const markdown = marked(text, {breaks: true});
    
    return(
    <div>
        <h2 className= "text-center m-4">Markdown</h2>
        <div className="row">
          <div className="col-6">
            <h6 className= "text-center">Enter your markdown here: </h6>
            <textarea className="form-control p-2" id="editor" value={text} onChange={this.handleChange}/>
          </div>
          <div className="col-6">
            <h6 className= "text-center">See the result:  </h6> 
            <div className="preview rounded" dangerouslySetInnerHTML={{__html: markdown }}  id="preview"/>

          </div>
        </div>
      </div>
        );
  }
}

ReactDOM.render(<App/>, document.getElementById("app"));