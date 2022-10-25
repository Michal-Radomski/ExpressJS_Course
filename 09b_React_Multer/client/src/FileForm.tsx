import React from "react";
import axios from "axios";

class FileForm extends React.Component {
  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("Form Submitted");
    const field = document.getElementById("file-field") as HTMLInputElement;
    // console.log({ field });
    const files = field?.files as FileList;
    // console.log({ files });
    const file = files[0];
    console.log({ file });
    const url = "/upload_file";
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const data = new FormData();
    data.append("uploadFile", file);
    // console.log({ data });

    await axios.post(url, data, config).then((response) => {
      console.log("response.data:", response.data);
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} encType="multipart/form-data">
        <input id="file-field" type="file" name="uploadFile" />
        <input type="submit" value="submit" />
      </form>
    );
  }
}

export default FileForm;
