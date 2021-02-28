import React, { Component } from "react";
import ModalComp from "./../components/Modal";
import Swal from "sweetalert2";

import { BsPlusCircle } from "react-icons/bs";

import Card from "../components/Card";

class Home extends Component {
  state = {
    data: [
      {
        foto:
          "https://asset.kompas.com/crops/tLyo6RoXhisZPe3R3J9k9bTIA8s=/30x0:1000x647/750x500/data/photo/2020/02/24/5e538e7bb5ef5.jpg",
        caption: "liburanku kali ini dihabiskan di labuan bajo",
      },
      {
        foto:
          "https://static.republika.co.id/uploads/images/inpicture_slide/190503161208-801.jpg",
        caption: "muncak kuyy di semeru",
      },
    ],
    captionInp: "",
    fotoInp: "",
    indexdelete: -1,
    modal: false,
    editmodal: false,
    indexedit: -1,
    EditData: {
      foto: "",
      caption: "",
    },
  };

  renderCard = () => {
    return this.state.data.map((val, index) => {
      return (
        <div className="col-md-3" key={index}>
          <Card
            foto={val.foto}
            caption={val.caption}
            delete={this.onDeleteClick}
            edit={() => this.onEditClick(index)}
          />
        </div>
      );
    });
  };

  onDeleteClick = () => {
    Swal.fire({
      title: "Yakin nih mau dihapus?",
      text: "Jangan sampe nyesel ya!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yakin 100%!",
    }).then((result) => {
      if (result.isConfirmed) {
        const { data, indexdelete } = this.state;
        let dataUsers = data;
        dataUsers.splice(indexdelete, 1);
        this.setState({ data: dataUsers, indexdelete: -1 });
        Swal.fire("Terhapus!", "Postinganmu sudah di hapus.", "berhasil");
      }
    });
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  toggleEdit = () => {
    this.setState({ editmodal: !this.state.editmodal });
  };

  onFotoChange = (event) => {
    this.setState({ fotoInp: event.target.value });
  };

  onCaptionChange = (event) => {
    this.setState({ captionInp: event.target.value });
  };

  onInputEditChange = (event) => {
    let Editdata = this.state.EditData;
    Editdata[event.target.name] = event.target.value;
    this.setState({ EditData: Editdata });
  };

  onEditClick = (index) => {
    let EditData = this.state.EditData;
    let data = this.state.data;
    EditData = {
      ...EditData,
      foto: data[index].foto,
      caption: data[index].caption,
    };
    this.setState({ indexedit: index, EditData: EditData, editmodal: true });
  };

  onCancelEditClick = () => {
    this.setState({
      EditData: {
        foto: "",
        caption: "",
      },
      indexedit: -1,
      editmodal: false,
    });
  };

  onAddClick = () => {
    const { fotoInp, captionInp, data } = this.state;
    if (fotoInp && captionInp) {
      let datak = {
        foto: fotoInp,
        caption: captionInp,
      };
      let datauser = data;
      datauser.push(datak);
      this.setState({ data: datauser, fotoInp: "", captionInp: "" });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Data belum diisi",
        footer: "<a href>Why do I have this issue?</a>",
      });
    }
  };
  onSaveEditClick = () => {
    const { EditData, data, indexedit } = this.state;
    const { foto, caption } = EditData;

    if (foto && caption) {
      let datak = {
        foto: foto,
        caption: caption,
      };
      let datauser = data;
      datauser.splice(indexedit, 1, datak);
      this.setState({
        data: datauser,
        indexedit: -1,
        editmodal: false,
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Berhasil disimpan",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      this.setState({
        EditData: {
          data: "",
          caption: "",
        },
        indexedit: -1,
      });
      alert("gagal");
    }
  };

  onAddModalClick = () => {
    this.setState({ modal: true });
  };

  render() {
    return (
      <div>
        <ModalComp
          isOpen={this.state.modal}
          toggle={this.toggle}
          title={"Add Users"}
          saveData={this.onAddClick}
        >
          <input
            foto="fotoInp"
            type="text"
            placeholder="url"
            className="form-control my-2"
            value={this.state.fotoInp}
            onChange={this.onFotoChange}
          />
          <input
            name="captionInp"
            type="text"
            placeholder="caption"
            className="form-control my-2"
            value={this.state.captionInp}
            onChange={this.onCaptionChange}
          />
        </ModalComp>
        <ModalComp
          isOpen={this.state.editmodal}
          toggle={this.toggleEdit}
          title={"Edit Data"}
          saveData={this.onSaveEditClick}
          Cancel={this.onCancelEditClick}
          Edit={true}
        >
          <input
            foto="foto"
            type="text"
            placeholder="foto"
            className="form-control my-2"
            value={this.state.EditData.foto}
            onChange={this.onInputEditChange}
          />

          <input
            caption="caption"
            type="caption"
            placeholder="caption"
            className="form-control my-2"
            value={this.state.EditData.caption}
            onChange={this.onInputEditChange}
          />
        </ModalComp>

        <div className="row">{this.renderCard()}</div>
        <div className=" mt-5 d-flex flex-column justify-content-center align-items-center">
          <button
            onClick={this.onAddModalClick}
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            <BsPlusCircle style={{ fontSize: "3em", fontWeight: "700" }} />
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
