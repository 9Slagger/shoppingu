import React, { Component } from "react";
import { Upload, Icon } from "antd";
import axios from "../_helper/axios"

export default class UploadFile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: [],
      percent: 0
    }
  }
  onChange = ({ file, fileList, event }) => {
    this.setState({ file: fileList })
  }

  customRequest = async ({ onSuccess, onError, file, onProgress }) => {
    const dataFile = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: event => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        this.setState({ percent})
        if (percent === 100) {
          setTimeout(() => this.setState({ percent: 0}), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    };
    dataFile.append("file", file);
    try {
      const res = await axios.post(
        `/file/${this.props.productId}`,
        dataFile,
        config
      );
      onSuccess("Ok");
      console.log("server res: ", res);
    } catch (err) {
      console.log("Eroor: ", err);
      onError({ err });
    }
  }

  render() {
    return (
      <Upload.Dragger
        accept="image/*"
        name="file"
        multiple={true}
        defaultFileList={this.state.file}
        onChange={this.onChange}
        customRequest={this.customRequest}
      >
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Upload.Dragger>
    );
  }
}
