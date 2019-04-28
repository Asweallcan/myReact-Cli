import * as React from "react";
import { Icon } from "antd";
import "./index.scss";

export default ({ isLoading, error }) => {
  if (error) {
    console.error(error);
  }
  return (
    <div className="loading">
      {isLoading ? <Icon className="loading-icon" type="loading" /> : null}
      {error ? <p className="loading-text">抱歉，加载页面出错</p> : null}
    </div>
  );
};
