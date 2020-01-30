import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { handleTodoInputOnSubmit, handleTodoInputOnChange, handleTodoInputRemoveAll, handleRemoveTodoOutPutText, handleEditTodoOutputText } from './Store/Actions/todoInput';

class App extends React.Component {
  handleOnSubmit = (e) => {
    e.preventDefault()

    this.props.dispatchHandleOnSubmitForm();

  }

  handleTodoInputOnChange = (e) => {
    this.props.dispatchHandleTodoInputOnChange(e.target.value);
  }

  handleRemoveAll = () => {
    this.props.dispatchHandleRemoveAll();
  }

  handleRemoveTodoOutPutText = (ind) => {
    this.props.dispatchHandleRemoveOutputTodoText(ind)
  }

  handleEditTodoOutputText = (val, ind) => {
    this.props.dispatchHandleEditTodoOutputText(val, ind);
  }

  render() {

    return (
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-lg-6 m-auto text-center shadow p-5 bg-light'>
            <h2 className='text-info'>Redux Todo-app</h2>
            <form onSubmit={this.handleOnSubmit}>
              <input
                id='todoInput'
                onChange={this.handleTodoInputOnChange}
                className='form-control mt-3 text-center'
                type='text' value={this.props.input}
                placeholder='enter your todo text' />


              {this.props.Editable ? <button
                className='btn btn-sm btn-info float-right mt-2'>
                update
                </button> : <button
                  className='btn btn-sm btn-info float-right mt-2'>
                  submit
                </button>}

            </form>
            <button
              onClick={this.handleRemoveAll}
              className='btn btn-sm btn-danger float-left mt-2'>
              Remove All
                </button>
            {this.props.RemoveAllError && <p className='mt-2 text-danger'>There Is Nothing To Remove</p>}
            {this.props.SameInputTextError && <p className='mt-2 text-danger'>Input Text Already Exists</p>}
            {this.props.InputEmptyError && <p className='mt-2 text-danger'>Please Enter Some TodoText</p>}

          </div>
        </div>
        {this.props.TodoInput && (
          <div className='row mt-5'>
            <div className='col-lg-6 m-auto text-center shadow '>
              <h4>Todo-Output</h4>
              <ul className='list-group'>
                {this.props.TodoInput.map((val, ind) => {
                  return (
                    <React.Fragment key={ind}>
                      <li
                        style={{ textAlign: 'start' }}
                        className='list-group-item'

                      >
                        {val}
                        <button
                          onClick={() => this.handleRemoveTodoOutPutText(ind)}
                          className='btn btn-sm btn-danger float-right'
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => this.handleEditTodoOutputText(val, ind)}
                          className='btn btn-sm btn-info float-right mr-1'>
                          edit
                          </button>
                      </li><br></br>
                    </React.Fragment>
                  )
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

  TodoInput: state.TodoInput,
  input: state.input,
  Editable: state.editable,
  RemoveAllError: state.RemoveAllError,
  SameInputTextError: state.SameInputTextError,
  InputEmptyError: state.InputEmptyError,
})


const mapDispatchToProps = (dispatch) => ({
  dispatchHandleOnSubmitForm: () => dispatch(handleTodoInputOnSubmit()),
  dispatchHandleTodoInputOnChange: (eve) => dispatch(handleTodoInputOnChange(eve)),
  dispatchHandleRemoveAll: () => dispatch(handleTodoInputRemoveAll()),
  dispatchHandleRemoveOutputTodoText: (ind) => dispatch(handleRemoveTodoOutPutText(ind)),
  dispatchHandleEditTodoOutputText: (val, ind) => dispatch(handleEditTodoOutputText(val, ind))
}
)
export default connect(mapStateToProps, mapDispatchToProps)(App);
