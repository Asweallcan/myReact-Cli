import * as React from "react";
import { withNamespaces, WithNamespaces } from "react-i18next";

class TestComponent extends React.PureComponent<WithNamespaces> {
  public props: { t: any };
  public render() {
    // 组件这样使用i18next国际化
    const { t } = this.props;
    return <span>{t("test")}</span>;
  }
}

export default withNamespaces()(TestComponent);
