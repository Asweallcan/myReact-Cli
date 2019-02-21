import * as React from "react";
import { withNamespaces, WithNamespaces } from "react-i18next";
import { connect } from "react-redux";
import { actionsMap as httpActions } from "../../store/actions/http";
import { IHttpResponse } from "../../store/models";
import { IStoreState } from "../../store/models";
import { Button } from "antd";

interface IStateProps {
  getTest: IHttpResponse;
}

const mapStateToProps = (state: IStoreState) => ({
  getTest: state.httpResponse.getTest,
});

@connect(mapStateToProps)
class TestComponent extends React.Component<IStateProps & WithNamespaces> {
  public state = {};

  public async componentDidMount() {
    await httpActions.getTest({
      data: {},
      method: "post",
      url: "/api/getTest",
    });
  }

  public render() {
    // i18next国际化实例
    const { t } = this.props;
    return <Button>{t("test")}</Button>;
  }
}

export default withNamespaces()(TestComponent);
