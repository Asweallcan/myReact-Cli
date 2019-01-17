import * as React from "react";
import { withNamespaces, WithNamespaces } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { actionsMap as httpActions } from "../../store/actions/http";
import { IHttpResponse } from "../../store/model";
import { IStoreState } from "../../store/model/store";

interface IStateProps {
  getTest: IHttpResponse;
}
interface IProps {
  t: any;
}

const mapStateToProps = (state: IStoreState) => ({
  getTest: state.httpResponse.getTest,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

@withNamespaces()
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class TestComponent extends React.PureComponent {
  public readonly props: IProps & IStateProps & WithNamespaces;

  public readonly state: {};

  public async componentDidMount() {
    await httpActions.getTest({
      data: {},
      method: "POST",
      url: "/api/getTest",
    });
  }

  public render() {
    // i18next国际化实例
    const { t } = this.props;
    return <span>{t("test")}</span>;
  }
}
