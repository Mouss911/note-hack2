
class BackgroundColor extends React.Component {
  render() {
    const { backgroundContainer, height, width } = this.props;

    return (
      <div className='container mb-5' style={{ backgroundColor: '#fff', borderRadius: '5px' }} >
        <div className='row'>
          <div className='col-12 col-md-6 align-items-center py-3 d-flex'>
            <h3>NoteHack</h3>
          </div>
          <div className='col-12 col-md-6 justify-content-end align-items-center py-3 d-flex' >
            <Palette width={width} height={height} backgroundImage='linear-gradient(90deg, #4dc9e6, #210cac)' onClick={() => backgroundContainer('linear-gradient(90deg, #4dc9e6, #210cac)')} />
            <Palette width={width} height={height} backgroundImage='linear-gradient(180deg, #a9c9ff, #ffbbec)' onClick={() => backgroundContainer('linear-gradient(180deg, #a9c9ff, #ffbbec)')} />
            <Palette width={width} height={height} backgroundImage='linear-gradient(45deg, #fa8bff, #2bd2ff 52%, #2bff88 90%)' onClick={() => backgroundContainer('linear-gradient(45deg, #fa8bff, #2bd2ff 52%, #2bff88 90%)')} />
            <Palette width={width} height={height} backgroundImage='linear-gradient(to bottom right, #ff512f, #dd2476)' onClick={() => backgroundContainer('linear-gradient(to bottom right, #ff512f, #dd2476)')} />
            <Palette width={width} height={height} backgroundImage='linear-gradient(to bottom right, #fd8451, #ffbd6f)' onClick={() => backgroundContainer('linear-gradient(to bottom right, #fd8451, #ffbd6f)')} />
            <Palette width={width} height={height} backgroundImage='linear-gradient(45deg, #85ffbd, #fffb7d)' onClick={() => backgroundContainer('linear-gradient(45deg, #85ffbd, #fffb7d)')} />
          </div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  render() {
    const { placeholder, type, value, onChange, onSubmit, isEditing } = this.props;

    return (
      <form className='container mt-5 py-3 gy-3' style={{ backgroundColor: '#fff', borderRadius: '5px' }} onSubmit={onSubmit}>
        <div className='row'>
          <div className='col-12 col-md-11'>
            <Input type={type} value={value} onChange={onChange} placeholder={placeholder} />
          </div>
          <div className='col-12 col-md-1 text-end'>
            <button className='btn btn-success px-3'>
              {isEditing ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

class ContainerNotes extends React.Component {
  render() {
    const { listeNote, handleEdit, handleDelete, handleDeleteAll, numberNote } = this.props;

    return (
        <div className='container' style={{ backgroundColor: '#fff', borderRadius: '5px' }}>
          <EnteteNotes handleDeleteAll={handleDeleteAll} numberNote={numberNote} />
          <div className='row mt-4 p-4' style={{ display: 'flex', justifyContent: 'center' }}>
            <Notes listeNote={listeNote} handleEdit={handleEdit} handleDelete={handleDelete} />
          </div>
        </div>
      
    );
  }
}

class Palette extends React.Component {
  render() {
    const { backgroundImage, onClick, height, width } = this.props;

    return (
      <button onClick={onClick} style={{ border: 'none', width: width, height: height, borderRadius: '50%', marginLeft: '15px', backgroundImage: backgroundImage }}></button>
    );
  }
}

class Input extends React.Component {
  render() {
    const { placeholder, type, value, onChange } = this.props;

    return (
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} className='form-control' />
    );
  }
}

class EnteteNotes extends React.Component {
  render() {
    const { handleDeleteAll, numberNote } = this.props;

    return (
      <div className='row mt-5 pt-4'>
        <div className="col-12 col-md-6 d-flex">
          <h5>Notes</h5>
          <div className='ms-2 d-flex justify-content-center' style={{ backgroundColor: '#e5e5e5', width: '20px', height: '25px', borderRadius: '50%' }}>{numberNote}</div>
        </div>
        <div className="col-12 col-md-6 text-end">
          <button onClick={() => handleDeleteAll()} className='btn btn-primary'>Clear all</button>
        </div>
      </div>
    );
  }
}

class Notes extends React.Component {
  render() {
    const { listeNote, handleEdit, handleDelete } = this.props;

    return (
      <div>
        {listeNote.map((note) => (
          <div className='col-md-4' key={note.id}>
            <div className="card mb-4" style={{ borderLeft: "5px solid blue", borderRadius: "10px" }}>
              <div className="card-body">
                <div className='row'>
                  <div className='col-12 col-md-6'>
                    <p>{note.value}</p>
                  </div>
                  <div className='col-12 col-md-6 text-end'>
                    <Button className='' onClick={() => handleEdit(note.id)} icone={<i className="fa-solid fa-pen"></i>} color='blue' />
                    <Button className='border-btn' onClick={() => handleDelete(note.id)} icone={<i className="fa-solid fa-trash"></i>} color='red' />
                  </div>
                  <div className='col-12'>
                    <p> {note.timestamp}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

class Button extends React.Component {
  render() {
    const { className, onClick, icone, color } = this.props;

    return (
      <button className={className} onClick={onClick} style={{ border: 'none', background: 'none', fontSize: '20px', color: color }}>{icone}</button>
    );
  }
}




class Notehack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInput: '',
      listeNote: JSON.parse(localStorage.getItem('listeNote')) || [],
      isEditing: false,
      noteEditingId: '',
      width: '20px',
      height: '20px',
      colorBackground: JSON.parse(localStorage.getItem('colorBackground')) || 'linear-gradient(90deg, #4dc9e6, #210cac)',
    };
  }

  handleChange = (e) => {
    this.setState({ valueInput: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { valueInput, isEditing, noteEditingId, listeNote } = this.state;

    if (valueInput !== '') {
      let note;
      if (isEditing) {
        note = listeNote.map(noteEdit =>
          noteEdit.id === noteEditingId ?
            {
              value: valueInput,
              timestamp: new Date().toLocaleString(),
              isEditing: noteEditingId
            }
            : noteEdit
        )
      } else {
        note = {
          id: Math.floor(Math.random() * 10000),
          value: valueInput,
          timestamp: new Date().toLocaleString(),
          isEditing: false
        };
        note = [...listeNote, note];
      }

      this.setState({
        listeNote: note,
        isEditing: false,
        valueInput: '',
      });
    } else {
      alert("Entrez d'abord une note!");
    }
  }

  handleEdit = (noteId) => {
    const { listeNote } = this.state;
    const note = listeNote.find(note => noteId === note.id);

    this.setState({
      isEditing: true,
      valueInput: note.value,
      noteEditingId: note.id,
    });
  }

  handleDelete = (noteId) => {
    const { listeNote } = this.state;
    const note = listeNote.filter(note => noteId !== note.id);

    this.setState({
      listeNote: note,
    });
  }

  handleDeleteAll = () => {
    this.setState({
      listeNote: [],
    });
  }

  backgroundContainer = (backgroundImage) => {
    this.setState({
      colorBackground: backgroundImage,
      width: "25px",
      height: "25px",
    });
  }
  

  componentDidUpdate() {
    const { listeNote, colorBackground } = this.state;
    localStorage.setItem('listeNote', JSON.stringify(listeNote));
    localStorage.setItem('colorBackground', JSON.stringify(colorBackground));
  }

  render() {
    const { valueInput, listeNote, isEditing, width, height, colorBackground } = this.state;
    const numberNote = listeNote.length;

    return (
      <div className="container-fluid pt-3 pb-5 corps" style={{ backgroundImage: colorBackground }}>
        <BackgroundColor height={height} width={width} backgroundContainer={this.backgroundContainer} />
        <Form type='text' value={valueInput} onChange={this.handleChange} onSubmit={this.handleSubmit} placeholder='Add note' isEditing={isEditing} />
        <ContainerNotes listeNote={listeNote} handleEdit={this.handleEdit} handleDelete={this.handleDelete} handleDeleteAll={this.handleDeleteAll} numberNote={numberNote} />
      </div>
    );
  }
}


ReactDOM.render(<Notehack />, document.getElementById('root'))