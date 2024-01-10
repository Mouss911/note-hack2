// import React, { Component } from 'react';
// import { MdEdit, MdDelete } from 'react-icons/md';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

class Notehack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      newNoteTitle: '',
    };
  }

  addNote = () => {
    const { newNoteTitle, notes } = this.state;
    const newNote = {
      title: newNoteTitle,
      timestamp: new Date().toLocaleString(),
    };

    this.setState({
      notes: [...notes, newNote],
      newNoteTitle: '',
    });
  };

  clearAllNotes = () => {
    this.setState({
      notes: [],
    });
  };

  removeNote = (index) => {
    const { notes } = this.state;
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    this.setState({
      notes: updatedNotes,
    });
  };

  handleInputChange = (e) => {
    this.setState({
      newNoteTitle: e.target.value,
    });
  };

  render() {
    const { notes, newNoteTitle } = this.state;

    return (
      <div className="container p-4 corps">
        <div className='row rounded-3 p-3 bg-white d-flex justify-content-around my-4 ligne1'>
          <div className='col'>
            <p>NoteHack</p>
          </div>
          <div className='col gap-3 text-end'>
            <button className='b1'></button>
            <button className='b2'></button>
            <button className='b3'></button>
            <button className='b4'></button>
            <button className='b5'></button>
            <button className='b6'></button>
          </div>
        </div>

        <div className='row mt-5'>
          <div className='col d-flex p-3 bg-white rounded-2'>
            <input
              placeholder='Add note'
              className='form-control me-2 border-black'
              value={newNoteTitle}
              onChange={this.handleInputChange}
            />
            <button className='btn btn-success px-3' onClick={this.addNote}>
              Add
            </button>
          </div>
        </div>

        <div className='row mt-5 rounded-3 bg-white mb-4'>
          <div className='col-12 mt-4 p-3 d-flex justify-content-between'>
            <p className='fw-bold'>Notes : {notes.length}</p>
            <button className='btn btn-primary' onClick={this.clearAllNotes}>
              Clear All
            </button>
          </div>
          <hr />

          <div className='row my-4 gy-2'>
            {notes.map((note, index) => (
              <div key={index} className='col-md-4 col-sm-12'>
                <div className='card carte'>
                  <div className='card-body'>
                    <div className='d-flex justify-content-between'>
                      <h5 className='card-title'>{note.title}</h5>
                      <h5>
                        
                        {/* <MdEdit className='text-primary mod' /> */}
                        <i className="fa-solid fa-pen text-primary mod"></i>
                        {/* <FontAwesomeIcon icon="fa-solid fa-trash" /> */}
                        <i className="fa-solid fa-trash text-danger sup" 
                          onClick={() => this.removeNote(index)}
                        />
                        {/* <MdDelete
                          onClick={() => this.removeNote(index)}
                          className='text-danger sup'
                        /> */}
                        
                      </h5>
                    </div>
                    <p className='card-text'>{note.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

// export default Notehack;
ReactDOM.render(<Notehack />, document.getElementById('root'))